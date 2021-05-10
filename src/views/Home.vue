<template>
  <div>
    <v-row>
      <v-col
          cols="12"
          md="12"
          lg="12"
          align="center"
          class="mt-5">
        <h1>
          Speech Toxicity
        </h1>
        <v-text-field
            outlined
            style="width: 80%"
            class="mt-10"
            placeholder="Type text here"
            v-model="input"
        >
        </v-text-field>
        <v-btn color="primary" @click="getPrediction()" class="mt-5 mb-5">
          Predict Toxicity
        </v-btn>
        <v-simple-table class="mt-10" height="500px" style="width: 80%; border: 2px" v-if="loaderFlag">
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left text-h4">
                Category
              </th>
              <th class="text-left text-h4">
                <span class="text--black"> Match </span>
              </th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td class="text-subtitle-1">Identity Attack</td>
              <td v-if="!getIdentityAttackFlag" class="text-uppercase text-subtitle-1"> <span style="color: green">{{ getIdentityAttackFlag }}</span>  </td>
              <td v-else class="text-uppercase text-subtitle-1"> <span style="color: darkred">{{ getIdentityAttackFlag }}</span>  </td>
            </tr>
            <tr>
              <td class="text-subtitle-1">  Insult </td>
              <td class="text-uppercase text-subtitle-1" v-if="!getInsultFlag"> <span style="color: green"> {{ getInsultFlag }} </span> </td>
              <td class="text-uppercase text-subtitle-1" v-else> <span style="color: darkred"> {{ getInsultFlag }} </span> </td>
            </tr>
            <tr>
              <td class="text-subtitle-1"> Sexual Explicit </td>
              <td class="text-uppercase text-subtitle-1" v-if="!getSexualExplicitFlag"> <span style="color: green"> {{ getSexualExplicitFlag }} </span> </td>
              <td class="text-uppercase text-subtitle-1" v-else> <span style="color: darkred"> {{ getSexualExplicitFlag }} </span> </td>
            </tr>
            <tr>
              <td class="text-subtitle-1"> Threat </td>
              <td class="text-uppercase text-subtitle-1" v-if="!getThreatFlag"> <span style="color: green"> {{ getThreatFlag }} </span>
              <td class="text-uppercase text-subtitle-1" v-else> <span style="color: darkred"> {{ getThreatFlag }} </span></td>
            </tr>
            <tr>
              <td class="text-subtitle-1">  Toxicity </td>
              <td class="text-uppercase text-subtitle-1" v-if = "!getToxicityFlag"> <span style="color: green"> {{ getToxicityFlag }} </span></td>
              <td class="text-uppercase text-subtitle-1" v-else> <span style="color: darkred"> {{ getToxicityFlag }} </span></td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
        <loader v-else></loader>
      </v-col>
    </v-row>
  </div>


</template>


<script>

//import {startRecognition} from "@/components/speechRecognition";
import {mapState, mapGetters} from "vuex";
import {toxicityClassification} from "@/components/speechToxicity";
import loader from "@/components/loader";

export default {
  name: 'Home',
  data(){
    return{
      input: ''
    }
  },
  components: {
    loader
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
      this.$store.commit('updateLoaderFlag', false)
      toxicityClassification('0.75', this.input)
    }
  },
  computed:{
    ...mapState(['userSpeech', 'loaderFlag']),
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
