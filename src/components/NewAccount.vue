<script>
import rules from "./rules"
import post from "./post"
import infoAccount from "./infoAccount.vue"

const updateCreateAPI = "http://127.0.0.1:8000/api/create_account"

export default {
  components: {
    infoAccount,
  },
  props: {
      btnTitle: {
          type: String,
          default: ''
      },
      title: {
          type: String,
          default: ''
      },
      dialogFlag: {
        type: Boolean,
        required: false
      },
      activeFlag: {
        type: Boolean,
        default: true
      },
      newFlag: {
        type: Boolean,
        default: true
      }
    },
  data: () => ({
    validFlag: false,
    dialog: false,
    rules,
    username_id: '',
    editedIndex: -1,
    inputForm: {
      id: 'undefined',
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      email: ''
    }
  }),

  watch: {
    'inputForm': {
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
    dialogFlag() {
      this.dialog = this.dialogFlag
    }
  },
  mounted() {
        this.dialog = this.dialogFlag
  },
  methods: {
    clear () {
      this.$refs.form.reset()
      this.validFlag = false
    },
    async save () {
      this.dialog = false
      let requestData = {
        data: []
      }
        requestData = {
          data: [this.inputForm]
        }

      await post(updateCreateAPI, requestData, this.$router, this.$route.currentRoute, 'createAccount')

      this.$router.go(this.$route.currentRoute)
    },
    close () {
      this.dialog = false
    }
  },
}
</script>


<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      width="1024"
    >
      <template v-slot:activator="{ props }">
        <div v-if="activeFlag">
          <v-btn
          color="primary"
          v-bind="props"
          >
          {{ btnTitle }}
          </v-btn>
        </div>
        <div v-else>
          </div> 
      </template>
        <v-card>
        <v-card-title>
          <span class="text-h5">{{ title }}</span>
        </v-card-title>
        <v-form ref="form">
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="inputForm.first_name"
                  :rules="rules.required"
                  label="first name*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="inputForm.last_name"
                  :rules="rules.required"
                  label="last name*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="inputForm.username"
                  :counter="70"
                  :rules="rules.username"
                  label="username*"
                  maxlength="70"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="inputForm.email"
                  :rules="rules.email"
                  label="email*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="inputForm.password"
                  :counter="20"
                  :rules="rules.password"
                  label="password*"
                  type="password"
                  maxlength="20"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="close"
          >
            閉じる
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
    </v-dialog>
  </v-row>
</template>