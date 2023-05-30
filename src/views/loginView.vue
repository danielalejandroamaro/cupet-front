<script>
import {set_auth_headers} from "/src/plugins/axios/tools.js";
import {_axios} from "/src/plugins/axios/index.js";

export default {
  name: "loginView",
  data: () => ({
    username: "",
    password: "",
    show1: false,
    isLoading: false
  }),
  methods: {
    submitForm() {
      const formData = new FormData();
      formData.append('username', this.username);
      formData.append('password', this.password);
      this.isLoading = true;
      _axios.post(
        "/token",
        formData
      ).then(
        ({data}) => data
      ).then(
        ({access_token, token_type, ...rest}) => {
          set_auth_headers(token_type, access_token);
          _axios.get("/me").then(
            () => {
              this.$router.push({name: "qrListView"})
            }
          );
        }
      ).catch(console.log).finally(() => this.isLoading = false);
    }
  }
}
</script>

<template>
  <v-app style="position: absolute;top: 0;left: 0;right: 0;bottom: 0">
    <v-main class="d-flex flex-row overflow-auto fill-height">
      <div
        class="fill-height flex-grow-1 d-flex flex-column justify-space-around align-center"
        :style="{position: 'relative'}"
      >
        <v-form
          :disabled="isLoading"
          @submit.prevent="submitForm"
          :style="{
            minWidth:$vuetify.display.xs?'80%':'430px'
          }"
        >
          <v-card elevation="2"
                  :class="$vuetify.display.mobile? 'pa-2':'pa-4'"
                  prepend-icon="mdi-home"
          >
            <template v-slot:title>
              Login
            </template>
            <v-container fluid class="pa-1">
              <v-row class="flex-grow-1 overflow-auto ma-0 pa-1">
                <v-col cols="12"
                       class="d-flex flex-row pa-0"
                >
                  <v-text-field label="username" v-model="username"></v-text-field>
                </v-col>
                <v-col cols="12"
                       class="d-flex flex-row pa-0"
                >
                  <v-text-field
                    label="password"
                    v-model="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show1=!show1"
                    :type="show1 ? 'text' : 'password'"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <v-card-actions class="pt-0">
              <v-btn type="submit" :disabled="isLoading">
                <v-progress-circular indeterminate v-if="isLoading">

                </v-progress-circular>
                <template v-else>
                  submit
                </template>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </div>
    </v-main>
  </v-app>
</template>

<style scoped>

</style>
