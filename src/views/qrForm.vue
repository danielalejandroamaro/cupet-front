<script>

import {_axios} from "@/plugins/axios";

export default {
  name: "qrForm",
  data: () => ({
    active_tab: "/list",
    queue: [],
    chapa: '',
    name: '',
    codigo: '',
    telefono: '',
    products: [],
    product_id: null
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
      _axios.post(
        "/queue",
        _data
      ).then(this.fetchData);
    },
    fetchData() {
      console.log("fetchData");
      _axios.get("/products").then(
        ({data}) => {
          this.products = data.items;
        }
      ).catch(console.log)

      _axios.get(
        `/queue`, {
          params: {product_id: this.product_id}
        }
      ).then(
        ({data}) => this.queue = data.items
      ).catch(console.log)
      ;
    },
  }
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-form @submit.prevent="submitForm">
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
                <v-btn type="submit">
                  submit
                </v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
      <!--      <v-col v-for="item in queue" cols="6" md="3">-->
      <!--        <v-card elevation="2">-->
      <!--          <v-card-title class="py-3">-->
      <!--            <v-avatar-->
      <!--              color="primary"-->
      <!--              size="42"-->
      <!--            >-->
      <!--              <span class="white&#45;&#45;text text-h5">{{ item.index }}</span>-->
      <!--            </v-avatar>-->
      <!--            <span class="ml-3 pr-3 subtitle-1">-->
      <!--                  {{ item["persone_id.name"] }}-->
      <!--                  <b>-->
      <!--                  ({{ item.cupet }})-->
      <!--                  </b>-->
      <!--                </span>-->
      <!--          </v-card-title>-->
      <!--          <v-card-text>-->
      <!--                <span>-->
      <!--                {{ item.created_at|dateFormat }}-->
      <!--              </span>-->
      <!--            <span>{{ item["car_id.chapa"] }}</span>-->
      <!--            &lt;!&ndash;                <pre>{{item}}</pre>&ndash;&gt;-->
      <!--          </v-card-text>-->
      <!--          <v-card-actions>-->
      <!--            <v-btn>-->
      <!--              accept-->
      <!--            </v-btn>-->
      <!--          </v-card-actions>-->
      <!--        </v-card>-->
      <!--      </v-col>-->
    </v-row>
  </v-container>

</template>

<style scoped>

</style>
