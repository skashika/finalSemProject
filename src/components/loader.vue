<template>
  <v-row
      class="fill-height"
      no-gutters align="center">
    <v-col
        align="center">
      <v-progress-circular
          :size="70"
          :width="7"
          color="primary"
          indeterminate>
      </v-progress-circular>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "loader"
}
</script>

<style scoped>

</style>
