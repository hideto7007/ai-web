<script setup>
import AppFooter from './components/pages/AppFooter.vue'
import AppBar from './components/pages/AppBar.vue'
</script>


<template>
  <v-app>
    <v-main>
      <AppBar />
        <router-view/>
      <AppFooter />
    </v-main>
  </v-app>
</template>

