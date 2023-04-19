
<script setup>

const logout = () => {
  console.log("ログアウト")
}

const home = () => {
  console.log("ホーム")
}

</script>

<template>
  <v-app-bar color="primary">
    <!-- <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template> -->

    <v-app-bar-title>
      obuject detection App
    </v-app-bar-title>

    <template v-slot:append>
      <v-btn @click="logout">
        ログアウト
      </v-btn>

      <v-btn @click="home">
        <v-icon>
          mdi-home
        </v-icon>
      </v-btn>
    </template>
  </v-app-bar>
</template>