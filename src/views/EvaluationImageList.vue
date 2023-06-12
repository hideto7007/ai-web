<script setup>

import { ref, watch, reactive, computed } from "vue";
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import axios from 'axios';
import post from '../components/post';
import request from "../components/request";
import Query from "../components/queryList";
import rules from "../components/rules";


let items = ['best_model.pth', 'max_model.pth']


</script>


<template>
  <v-row class="select-small-width">
    <v-select
      label="Select"
      :items="items"
    ></v-select>
  </v-row>

  <v-row class="file-small-width">
    <v-file-input
      :rules="rules.imageFile"
      accept="image/png, image/jpeg, image/bmp"
      placeholder="Pick an avatar"
      prepend-icon="mdi-camera"
      label="Avatar"
   ></v-file-input>
  </v-row>

</template>


<style lang="scss" scoped>

.select-small-width {
    max-width: 400px;
    padding: 50px 0px 0 50px;
  }

  .file-small-width {
    max-width: 500px;
    padding: 10px 0px 0 50px;
  }


</style>