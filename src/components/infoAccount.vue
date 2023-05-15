<script>
import rules from "./rules"
import post from "./post"
import axios from 'axios'
import Swal from 'sweetalert2'

const updateCreateAPI = "http://127.0.0.1:8000/api/create_account"
const requestAPI = "http://127.0.0.1:8000/api/user_list"

export default {
  props: {
      title: {
          type: String,
          default: ''
      },
      // dialog: {
      //   type: Boolean,
      //   default: false
      // }
    },
  data: () => ({
    validFlag: false,
    dialog: false,
    rules,
    user_id: '',
    editedIndex: -1,
    veiwflag: false,
    query: '',
    form_data: {
      data: []
    }
  }),

  watch: {
    'form_data': {
      async handler(newVal, oldVal) {
        if (typeof this.$refs.form !== 'undefined') {
          const { valid } = await this.$refs.form.validate()
          const { firstName } = newVal
          if (valid) {
              this.validFlag = true
              if (valid && firstName !== "") {
                this.validFlag = true
              } else {
                this.validFlag = false
              }
            } else {
              this.validFlag = false
          }
        }
      },
    deep: true,
    immediate: true
    },
  // 'dialog': {
  //   handler(newVal, oldVal) {
  //     console.log(newVal, oldVal)
  //   }
  // }
  },
  async created() {
    if (sessionStorage.getItem('id')) {
      this.veiwflag = true
        await this.getAccountRequestList (sessionStorage.getItem('id'))
    } else {
      Swal.fire({
        icon: 'success',
        title: 'アカウント情報',
        text: 'ログインしてないのでアカウント情報はありません。',
        showConfirmButton:false,
        showCloseButton:false,
      })
    }

  },
  methods: {
    async getAccountRequestList (id){
        let queryList = []
        queryList.push('id=' + id)

        this.query = '?' + queryList.join('&')
        return axios
          .get(requestAPI + this.query)
          .then((res) => {
            if (res.data.result_code === 0) {
              // 入力値取得
              this.form_data.data = res.data.detail.result
              } else {
                Swal.fire({
                  icon: 'warning',
                  title: 'Error',
                  text: ErrorMessage,
                  showConfirmButton:false,
                  showCloseButton:false,
                })
                this.$router.push('/auth') 
              }
            }).catch((err) => {
              Swal.fire({
                icon: 'warning',
                title: 'Error',
                text: err,
                showConfirmButton:false,
                showCloseButton:false,
              })
          }).finally()
      },
    clear () {
      this.$refs.form.reset()
      this.validFlag = false
    },
    async save () {
      this.dialog = false
      let requestData = this.form_data

      await post(updateCreateAPI, requestData, this.$router, this.$route.currentRoute, 'createAccount')

      this.$router.go(this.$route.currentRoute)
    },
    close () {
      this.dialog = false
      this.$emit('closed', this.dialog)
    }
  },
}
</script>


<template>
  <v-row justify="center">
      <v-card v-if="veiwflag">
        <v-card-title>
          <span class="text-h5">{{ title }}</span>
        </v-card-title>
        <v-form ref="form">
        <v-card-text
          v-for="(item, index) in this.form_data.data" 
          :key="index"
          :property="item.key"
          :label="item.col">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="item.first_name"
                  :rules="rules.required"
                  label="first name*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="item.last_name"
                  :rules="rules.required"
                  label="last name*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="item.username"
                  :counter="70"
                  :rules="rules.username"
                  label="username*"
                  maxlength="70"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="item.email"
                  :rules="rules.email"
                  label="email*"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green-darken-1"
            variant="text"
            @click="close"
          >
          キャンセル
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="save"
            :disabled="!validFlag"
          >
            保存
          </v-btn>
          <v-btn @click="clear">
            クリア
          </v-btn>
        </v-card-actions>
      </v-form>
      </v-card>
  </v-row>
</template>