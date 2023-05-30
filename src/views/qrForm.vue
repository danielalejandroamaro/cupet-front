<script>

import {_axios} from "@/plugins/axios";
import AppQueueItem from "@/components/appQueueItem.vue";

export default {
  name: "qrForm",
  components: {AppQueueItem},
  data: () => ({
    queue: [],
    chapa: '',
    name: '',
    codigo: '',
    telefono: '',
    products: [],
    product_id: null,
    isLoading: false,
    show_snackbar: false,
    error_message: ""
  }),
  beforeMount() {
    this.fetchData()
    console.log(this.$route.query)
    this.codigo = this.$route.query.code;
  },
  methods: {
    filter_by_product() {
      this.fetchData()
    },
    submitForm() {
      let _data = {
        "chapa": this.chapa,
        "name": this.name,
        "qr_code": this.codigo,
        "telefono": this.telefono,
        "product_id": this.product_id
      };
      this.isLoading = true;
      _axios.post(
        "/queue",
        _data
      ).then(
        ({data}) => {
          this.queue = data.items;
          this.fetchData();
        }
      ).catch((errorPromise) => {
        console.log("errorPromise", errorPromise)
        errorPromise.then(
          ({data}) => ({
            push_notification: data.detail.push_notification,
            items: data.detail.items
          })
        ).then(({push_notification}) => {
            this.show_snackbar = true;
            this.error_message = push_notification;
          }
        );
      }).finally(
        () => this.isLoading = false
      );
    },
    fetchData() {
      this.isLoading = true;
      console.log("fetchData");
      Promise.all([
          _axios.get("/products").then(
            ({data}) => {
              this.products = data.items;
            }
          ).catch(console.log)
        ]
      ).finally(() => this.isLoading = false);
    },
  }
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-form @submit.prevent="submitForm" :disabled="isLoading">
          <v-card elevation="2">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    outlined
                    label="codigo"
                    :disabled="true"
                    v-model="codigo"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field outlined label="chapa" v-model="chapa"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field outlined label="nombre" v-model="name"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    class="grow-1 mr-3"
                    v-model="product_id"
                    @change="filter_by_product"
                    @input="filter_by_product"
                    :items="products"
                    item-title="name"
                    item-value="id"
                    chips
                    multiple
                    label="Products"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field outlined label="telefono" v-model="telefono"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <v-card-actions class="f-flex flex-column align-end">
              <div class="d-flex flex-row">
                <v-btn type="submit" :disabled="isLoading">
                  <v-progress-circular v-if="isLoading" indeterminate>

                  </v-progress-circular>
                  <template v-else>
                    submit
                  </template>
                </v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </v-form>
        <v-snackbar
          v-model="show_snackbar"
        >
          <v-icon>mdi-alert</v-icon>
          {{ error_message }}
          <template v-slot:actions>
            <v-btn
              color="red"
              variant="text"
              @click="show_snackbar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-col>
      <v-col v-for="item in queue" cols="12" md="6">
        <app-queue-item :item="item"></app-queue-item>
      </v-col>
    </v-row>
  </v-container>

</template>

<style scoped>

</style>
