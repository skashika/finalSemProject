<template>
  <div>
    <v-row>
      <v-col
          cols="6"
          md="6"
          lg="6">
        <avatar
            :initial-width="videowidth">
        </avatar>
      </v-col>
      <v-col
          cols="6"
          md="6"
          lg="6"
          align="center"
          class="mt-5">
        <h1>
          Speech Toxicity
        </h1>
        <v-text-field
            outlined
            style="width: 90%"
            class="mt-10"
            placeholder="Type text here or click microphone icon to speak"
            append-icon="mdi-microphone"
            @click:append="getResponse()"
            v-model="input"
        >
        </v-text-field>
        <v-btn color="primary" @click="getPrediction()">
          Predict Toxicity
        </v-btn>
        <v-simple-table dense class="mt-10" style="width: 80%">
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left text-subtitle-1">
                Category
              </th>
              <th class="text-left text-subtitle-1">
                <span class="text--black"> Match </span>
              </th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Identity Attack</td>
              <td> {{ getIdentityAttackFlag }} </td>
            </tr>
            <tr>
              <td>Insult</td>
              <td> {{ getInsultFlag }} </td>
            </tr>
            <tr>
              <td>Sexual Explicit</td>
              <td> {{ getSexualExplicitFlag }} </td>
            </tr>
            <tr>
              <td>Threat</td>
              <td> {{ getThreatFlag }} </td>
            </tr>
            <tr>
              <td>Toxicity</td>
              <td> {{ getToxicityFlag }} </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>

      </v-col>
    </v-row>
  </div>


</template>


<script>

//import {startRecognition} from "@/components/speechRecognition";
import Avatar from "@/components/avatar";
import {mapState, mapGetters} from "vuex";
import {toxicityClassification} from "@/components/speechToxicity";


export default {
  name: 'Home',
  data(){
    return{
      input: ''
    }
  },
  components: {
    Avatar
    //
  },
  methods: {
    changeColor(){
      document.body.style.color = "purple";
      return false
    },
    getResponse() {
      //this.$store.commit('updateUserSpeech', '')
      //Start recognition here
      //startRecognition();
      //toxicityClassification(0.9, 'You suck');
    },
    getPrediction(){
      toxicityClassification('0.65', this.input)
    }
  },
  computed:{
    ...mapState(['userSpeech']),
    ...mapGetters(['getInsultFlag','getIdentityAttackFlag','getSexualExplicitFlag','getThreatFlag','getToxicityFlag']),
    videowidth(){
      return window.innerWidth/2 - 175
    }
  }
}
</script>

<style scoped>
#avatar-wrapper {
  z-index: 0;
}

#card-wrapper{
  background-color: rgba(30, 101, 39, 0.88);
  border-radius: 35px;
  color: white;
  text-align: center;
  border-style: solid;
  border-color: white;
  border-width: 2px;
  z-index: 999999;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  bottom: 0
}

#accessories{
  z-index: 0;
}
/deep/ .avatar{
  z-index: 0;
}

/deep/ #divVHSS-inner{
  z-index: 0 !important;
}
</style>
