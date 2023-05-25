<script>
import {set_auth_headers} from "/src/plugins/axios/tools.js";
import {_axios} from "/src/plugins/axios/index.js";

export default {
  name: "loginView",
  data: () => ({
    username: "",
    password: "",
  }),
  methods: {
    // load_auth_headers() {
    //     const token = localStorage.getItem(StorageKey.TOKEN);
    //     const tokenType = localStorage.getItem(StorageKey.TOKEN_TYPE);
    //     if (!token || !tokenType) {
    //         this.clean_auth_headers()
    //         return {};
    //     }
    //     return {
    //         "Authorization": `${tokenType} ${token}`
    //     }
    // },
    //
    // set_auth_headers(tokenType, token) {
    //     localStorage.setItem(StorageKey.TOKEN, token);
    //     localStorage.setItem(StorageKey.TOKEN_TYPE, tokenType);
    // },
    // clean_auth_headers() {
    //     localStorage.removeItem(StorageKey.TOKEN_EXPIRATION);
    //     localStorage.removeItem(StorageKey.TOKEN);
    // },
    submitForm() {
      const formData = new FormData();
      formData.append('username', this.username);
      formData.append('password', this.password);
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
      ).catch(console.log);
    }
  }
}
</script>

<template>
  <v-app style="position: absolute;top: 0;left: 0;right: 0;bottom: 0">
    <v-main class="d-flex flex-row overflow-auto" style="height: 100%">
      <div class="fill-height flex-grow-1 d-flex flex-column justify-space-around align-center">
        <v-form @submit.prevent="submitForm"
                style="min-width: 450px"
        >
          <v-card elevation="2" class="pa-6">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="username" v-model="username"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field type="password" label="password" v-model="password"></v-text-field>
                </v-col>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn type="submit">
                    submit
                  </v-btn>
                </v-card-actions>
              </v-row>
            </v-container>
          </v-card>
        </v-form>
      </div>
    </v-main>
  </v-app>
</template>

<style scoped>

</style>
