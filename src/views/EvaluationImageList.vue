<script setup>

import { ref, watch, reactive, computed, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import axios from 'axios';
import post from '../components/post';
import request from "../components/request";
import Query from "../components/queryList";
import rules from "../components/rules";



// 変数定義
let items = ['best_model.pth', 'max_model.pth']
const imageURL = ref(null)
const imageFileData = ref(null)
const imageList  = ref([])


let analysis
let handleFileInputChange
let getImageListFromLocalStorage

if (sessionStorage.getItem('token') !== null) {

    // 画像の取得
    getImageListFromLocalStorage = () => {
        const imageListString = localStorage.getItem('imageList')
        if (imageListString) {
            imageList.value = JSON.parse(imageListString)
        }
    }

    analysis = () => {
        console.log(imageFileData.value)
        const imageListString = JSON.stringify(imageFileData.value)
        console.log(imageListString)
        localStorage.setItem('imageList', imageListString)
        console.log(localStorage.getItem('imageList'))
    }

    handleFileInputChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            imageFileData.value = file
        }
    }
    
    
    onMounted(() => {
        // ページ読み込み時にlocalStorageから画像データを復元
        getImageListFromLocalStorage()
    })
} else {
    await Swal.fire({
      icon: 'warning',
      title: 'Error',
      text: 'セッションが切れてます。再ログインして下さい。',
      showConfirmButton:false,
      showCloseButton:false,
      timer:3000
      })
      router.push('/auth')
  }


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
      @change="handleFileInputChange"
   ></v-file-input>

   <v-btn
      class="ma-2"
      color="primary"
      @click="analysis"
    >
    評価スタート
    <v-icon
      end
      icon="mdi-checkbox-marked-circle"
    ></v-icon>
  </v-btn>

  </v-row>

  <img :src="imageURL" v-if="imageURL" alt="Uploaded Image" class="uploaded-image">

</template>


<style lang="scss" scoped>
.select-small-width {
    max-width: 500px;
    padding: 50px 0px 0 50px;
  }

  .file-small-width {
    max-width: 665px;
    padding: 10px 0px 0 50px;
  }

.uploaded-image {
  width: 250px;
  height: 200px;
}


</style>