<template>
  <v-app>
    <toolbar></toolbar>
    <v-responsive :aspect-ratio="16/9">
      <v-main>
        <router-view></router-view>
      </v-main>
    </v-responsive>
  </v-app>
</template>

<script>

import toolbar from "@/components/toolbar";

export default {
  name: 'App',

  components: {
    toolbar
  },

  data: () => ({
    //
  }),
};
</script>

<style>
html, body {
  margin: 0;
  height: 100%;
  overflow: hidden
}

body::-webkit-scrollbar {
  display: none;
}
</style>
