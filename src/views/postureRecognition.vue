<template>
    <v-row no-gutters>
      <v-col cols="6" md="6" lg="6" align-self="center" align="center">
        <video id="video" playsinline
               style="-webkit-transform: scaleX(-1);transform: scaleX(-1); background-color: black;"
                 :height-md="videoHeight" :height-lg="videoHeight" width="100%" class="mt-10">
        </video>
      </v-col>
      <v-col cols="6" md="6" lg="6" align-self="center" align="center">
        <v-simple-table dense class="mt-10" style="width: 80%">
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left text-subtitle-1">
                Body Part
              </th>
              <th class="text-left text-subtitle-1">
                x coordinate
              </th>
              <th class="text-left text-subtitle-1">
                y coordinate
              </th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Nose</td>
              <td>{{ ordinates[0].position.x }}</td>
              <td>{{ ordinates[0].position.y }}</td>
            </tr>
            <tr>
              <td>Left Eye</td>
              <td>{{ ordinates[1].position.x }}</td>
              <td>{{ ordinates[1].position.y }}</td>
            </tr>
            <tr>
              <td>Right Eye</td>
              <td>{{ ordinates[2].position.x }}</td>
              <td>{{ ordinates[2].position.y }}</td>
            </tr>
            <tr>
              <td>Left Ear</td>
              <td>{{ ordinates[3].position.x }}</td>
              <td>{{ ordinates[3].position.y }}</td>
            </tr>
            <tr>
              <td>Right Ear</td>
              <td>{{ ordinates[4].position.x }}</td>
              <td>{{ ordinates[4].position.y }}</td>
            </tr>
            <tr>
              <td>Left Shoulder</td>
              <td>{{ ordinates[5].position.x }}</td>
              <td>{{ ordinates[5].position.y }}</td>
            </tr>
            <tr>
              <td>Left Shoulder</td>
              <td>{{ ordinates[6].position.x }}</td>
              <td>{{ ordinates[6].position.y }}</td>
            </tr>
            <tr>
              <td>Left Elbow</td>
              <td>{{ ordinates[7].position.x }}</td>
              <td>{{ ordinates[7].position.y }}</td>
            </tr>
            <tr>
              <td>Right Elbow</td>
              <td>{{ ordinates[8].position.x }}</td>
              <td>{{ ordinates[8].position.y }}</td>
            </tr>
            <tr>
              <td>Left Hip</td>
              <td>{{ ordinates[11].position.x }}</td>
              <td>{{ ordinates[11].position.y }}</td>
            </tr>
            <tr>
              <td>Right Hip</td>
              <td>{{ ordinates[12].position.x }}</td>
              <td>{{ ordinates[12].position.y }}</td>
            </tr>
            <tr>
              <td>Left Knee</td>
              <td>{{ ordinates[13].position.x }}</td>
              <td>{{ ordinates[13].position.y }}</td>
            </tr>
            <tr>
              <td>Right Knee</td>
              <td>{{ ordinates[14].position.x }}</td>
              <td>{{ ordinates[14].position.y }}</td>
            </tr>
            <tr>
              <td>Left Ankle</td>
              <td>{{ ordinates[15].position.x }}</td>
              <td>{{ ordinates[15].position.y }}</td>
            </tr>
            <tr>
              <td>Right Ankle</td>
              <td>{{ ordinates[16].position.x }}</td>
              <td>{{ ordinates[16].position.y }}</td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
      <avatar :initial-width="0" style="display: none"></avatar>
    </v-row>
</template>

<script>
import Avatar from "@/components/avatar";
const posenet = require('@tensorflow-models/posenet');
export default {
  name: "postureRecognition",
  components: {Avatar},
  data() {
    return {
      video: {},
      ordinates: [],
      diffREyeEar: 0,
      diffLEyeEar: 0
    }
  },
  computed:{
    videowidth(){
      return window.innerWidth/2 - 100
    },
    videoHeight(){
      return window.innerHeight/2 + 150
    }
  },
  methods: {
    initiateCamera() {
      const that = this
      that.video = document.getElementById('video');


      navigator.mediaDevices.getUserMedia({
        'audio': false,
        'video': {width: this.videowidth, height: this.videoHeight,frameRate: {max: 20}}
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
                            console.log('Posenet model loaded')
                            this.estimateMultiplePosesOnImage(model)
                          }
                      )
                    }
                )
              }
          )
    },
    estimateMultiplePosesOnImage(model) {
      // estimate poses
      model.estimateMultiplePoses(this.video,{
        flipHorizontal: false,
        maxDetections: 2,
        scoreThreshold: 0.6,
        nmsRadius: 20
      }).then(prediction => {
        this.ordinates = prediction[0].keypoints
        console.log(this.ordinates)

        // Right Eye and Right Ear
        this.diffREyeEar= this.ordinates[2].position.x - this.ordinates[4].position.x
        if(this.diffREyeEar > 20){
          console.log('Looking Straight')
        }else{
          console.log('Looking Right')
        }

        // Left Eye and Left Ear
        this.diffLEyeEar = this.ordinates[1].position.x - this.ordinates[3].position.x
        if(this.diffLEyeEar < -20){
          console.log('Looking Straight')
        }else{
          console.log('Looking left')
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
