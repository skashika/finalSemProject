<template>
  <v-row no-gutters>
    <v-col cols="6" md="6" lg="6" align-self="center" align="center">
      <video id="video" playsinline
             style="-webkit-transform: scaleX(-1);transform: scaleX(-1); background-color: black;"
             :height-md="videoHeight" :height-lg="videoHeight" width="100%" class="mt-10">
      </video>
    </v-col>
    <v-col cols="6" md="6" lg="6" align-self="center" align="center">
      <v-simple-table class="mt-10" style="width: 80%" height="300px">
        <template v-slot:default>
<!--          <thead>-->
<!--          <tr>-->
<!--            <th class="text-left text-subtitle-1">-->
<!--            </th>-->
<!--            <th class="text-left text-subtitle-1">-->
<!--              Direction-->
<!--            </th>-->
<!--          </tr>-->
<!--          </thead>-->
          <tbody>
          <tr>
            <td class="text-h4"> Face</td>
            <td class="text-h3 font-weight-bold"> {{ face }}</td>
          </tr>
          <tr>
            <td class="text-h4"> Upper Body </td>
            <td class="text-h3 font-weight-bold"> {{ upperBody }}</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
  </v-row>
</template>

<script>
const posenet = require('@tensorflow-models/posenet');
export default {
  name: "postureRecognition",
  components: {
    //
  },
  data() {
    return {
      video: {},
      ordinates: [],
      diffREyeEar: 0,
      diffLEyeEar: 0,
      modelCopy: undefined,
      face: '',
      upperBody: ''
    }
  },
  computed: {
    videowidth() {
      return window.innerWidth / 2 - 100
    },
    videoHeight() {
      return window.innerHeight / 2 + 150
    }
  },
  methods: {
    initiateCamera() {
      const that = this
      that.video = document.getElementById('video');


      navigator.mediaDevices.getUserMedia({
        'audio': false,
        'video': {width: this.videowidth, height: this.videoHeight, frameRate: {max: 20}}
      })
          .then(
              stream => {
                that.video.srcObject = stream;
                that.video.play().then(
                    () => {
                      this.video.width = this.video.videoWidth;
                      this.video.height = this.video.videoHeight;
                      posenet.load().then(
                          model => {
                            this.modelCopy = model
                            console.log('Posenet model loaded')
                            const that = this
                            setInterval(function () {
                              that.estimateMultiplePosesOnImage(model)
                            }, 1000)
                            //this.estimateMultiplePosesOnImage(model)
                          }
                      )
                    }
                )
              }
          )
    },
    estimateMultiplePosesOnImage(model) {
      // estimate poses
      model.estimateMultiplePoses(this.video, {
        flipHorizontal: false,
        maxDetections: 2,
        scoreThreshold: 0.6,
        nmsRadius: 20
      }).then(prediction => {
        this.ordinates = prediction[0].keypoints
        console.log(this.ordinates)

        // Right Eye and Right Ear
        this.diffREyeEar = this.ordinates[2].position.x - this.ordinates[4].position.x
        this.diffLEyeEar = this.ordinates[1].position.x - this.ordinates[3].position.x
        if (this.diffREyeEar > 20) {
          if (this.diffLEyeEar > -20) {
            this.face = 'Looking Left'
          } else {
            this.face = 'Looking Straight'
          }

        } else {
          this.face = 'Looking Right'
        }
        console.log('difference between shoulder', this.ordinates[5].position.x - this.ordinates[6].position.x)
        if (this.ordinates[5].position.x - this.ordinates[6].position.x < 300) {
          console.log('Score Left Shoulder', this.ordinates[5].score)
          console.log('Score Right Shoulder', this.ordinates[6].score)
          if (this.ordinates[5].score > this.ordinates[6].score) {
            this.upperBody = 'Facing Right'
          } else {
            this.upperBody = 'Facing Left'
          }
        } else {
          this.upperBody = 'Facing Straight'
        }
      })
    }
  },
  mounted() {
    this.initiateCamera()
  }
}
</script>

<style>

</style>
