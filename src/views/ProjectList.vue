<script setup>

import { ref, watch, reactive, computed } from "vue";
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import axios from 'axios';
import post from '../components/post';
import request from "../components/request";
import Query from "../components/queryList";

// vueライブラリー定義
const router = useRouter()
const currentRoute = router.currentRoute.value.fullPath

// 変数定義
const id = sessionStorage.getItem('id')
const username = sessionStorage.getItem('username')
const token = sessionStorage.getItem('token')
const dialog = ref(false)

const queryPrames = router.currentRoute.value.query

// クラスインスタンス化
let query = new Query("username", "token", "user_id", "model_name", "id").queryList(username, token, id, queryPrames["model_name"], queryPrames["id"])

// API定義
const requestAPI = "http://127.0.0.1:8000/api/project/project_list/" + query


let resData
let evaluationindexPush
let getDetails
let detailsFrom
let returnScreen
let create

if (sessionStorage.getItem('token') !== null) {
    resData = await request(requestAPI, sessionStorage)

    // 評価指標画面に遷移
    evaluationindexPush = (val) => {
        console.log(val)
    }

    getDetails = (val) => {
        detailsFrom = val
    }

    returnScreen = () => {
        console.log('/objectmain/' + `?user_id=${id}`)
        router.push('/objectmain/' + `?user_id=${id}`)
    }

    create = () => {
        console.log("crate botton")
    }
    

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
 <v-table
    fixed-header
    density="comfortable"
    height="300px"
 >
  <thead>
    <tr>
        <th class="text-left">
            Project
        </th>
        <th class="text-left">
            ModelName
        </th>
        <th class="text-left">
            detail
        </th>
    </tr>
  </thead>
   <tbody>
    <tr
      v-for="(item, index) in resData"
      :key="index"
    >
      <v-btn
        color="green"
        @click="evaluationindexPush(item)"
      >
      {{ item.project_name }}
      </v-btn>
        <td>{{ item.object_detection_model_name }}</td>
          <!-- 詳細ボタン処理 -->
            <v-row justify="center">
              <v-dialog
                v-model="dialog"
                width="450"
              >
                <template v-slot:activator="{ props }">
                  <v-btn
                    color="primary"
                    v-bind="props"
                    @click="getDetails(item)"
                  >
                    詳細
                  </v-btn>
                </template>
                  <v-card>
                    <v-card-title>
                        <span class="text-h5">登録情報</span>
                    </v-card-title>
                       <v-list
                       v-for="(v, k) in detailsFrom"
                       :key="k">
                        ■ {{ k }} : {{ v }}
                       </v-list>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="green"
                                variant="text"
                                @click="dialog = false"
                            >
                            閉じる
                        </v-btn>
                     </v-card-actions>
                  </v-card>
               </v-dialog>
            </v-row>
         </tr>
      </tbody>
   </v-table>
    <v-btn
      color="success"
      @click="returnScreen">
        前の画面に戻る
    </v-btn>
    <v-btn
      color="primary"
      @click="create">
        新規追加及び更新
    </v-btn>
</template>


<style lang="scss" scoped>

.v-table__wrapper {
    overflow: hidden;
}
</style>