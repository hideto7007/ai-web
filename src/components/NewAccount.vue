<script>
import rules from "./rules"

export default {
  data: () => ({
    validFlag: false,
    dialog: false,
    rules,
    inputForm: {
      account: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      age: '',
    }
  }),

  watch: {
    'inputForm': {
      async handler(newVal, oldVal) {
        if (typeof this.$refs.form !== 'undefined') {
          const { valid } = await this.$refs.form.validate()
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
    }
  },

  methods: {
    clear () {
      this.$refs.form.reset()
      this.validFlag = false
    },
    save () {
      this.dialog = false
      console.log("save")
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
        <v-btn
          color="primary"
          v-bind="props"
        >
        ※新規アカウント作成はこちら
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">新規アカウント作成</span>
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
                  v-model="inputForm.firstName"
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
                  v-model="inputForm.lastName"
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
                  v-model="inputForm.account"
                  :counter="70"
                  :rules="rules.account"
                  label="account*"
                  maxlength="70"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="inputForm.email"
                  :rules="rules.email"
                  label="Email*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="inputForm.password"
                  :counter="20"
                  :rules="rules.password"
                  label="Password*"
                  type="password"
                  maxlength="20"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  v-model="inputForm.age"
                  :rules="rules.required"
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age*"
                  required
                ></v-select>
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
            Close
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="save"
            :disabled="!validFlag"
          >
            Save
          </v-btn>
          <v-btn @click="clear">
            clear
          </v-btn>
        </v-card-actions>
      </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>