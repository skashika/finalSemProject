<template>
  <v-app-bar app color="primary">

    <v-toolbar-title class="white--text">
      Posture Detection and Speech Toxicity Detection
    </v-toolbar-title>

    <v-spacer></v-spacer>
    <v-btn class="ma-2" @click="$router.push('/postureRecognition')">
      Posture Detection
    </v-btn>
    <v-btn class="ma-2" @click="$router.push('/')">
      Speech Toxicity
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
name: "toolbar"
}
</script>

<style scoped>

</style>
