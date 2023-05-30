<script>

import download_file, {_axios, baseUri} from "@/plugins/axios";
import moment from "moment";

export default {
  name: "qrListView",

  data: () => ({
    loading: false,
    items: [
      //     {
      //         color: '#952175',
      //         src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
      //         title: 'Halcyon Days',
      //         artist: 'Ellie Goulding',
      //     },
    ],
  }),
  beforeMount() {
    this.fetchData();
  },
  methods: {
    download_file(qr_id) {
      this.loading = true

      const queryParams = new URLSearchParams({qr_id: qr_id});
      download_file(
        `/admin/download_queue?${queryParams}`,
        `cola_${qr_id}_${moment().toLocaleString()}.xlsx`
      ).finally(() =>
        this.loading = false
      );
    },
    crateNewQr() {
      _axios.post(
        "/admin/qr"
      ).then(({data}) => {
        this.load_data();
        return data;
      })
    },
    descargarImagen(item) {
      let url = item.src;
      let nombreArchivo = "qr-list.jpg";
      download_file(url, nombreArchivo)
    },
    load_data() {
      _axios.get(
        "/admin/qr"
      ).then(
        ({data}) => data
      ).then(
        ({items}) => items.map(item => ({
          src: `${baseUri}/get_qr?code=${item.code}`,
          ...item
        }))
      ).then(items => this.items = items).catch(console.log)
    }, fetchData() {
      _axios.get(
        "/me"
      ).then(({data}) => this.load_data()).catch(err =>
        this.$router.push({name: "login"})
      );
    },
  }
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="py-4" @click="crateNewQr">
          <div
            class="flex-grow-1 pr-3 text-center mx-auto">
            <v-icon size="50">
              mdi-plus
            </v-icon>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" v-for="item in items">
        <v-card :disabled="loading" @click="descargarImagen(item)">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="text-h5">
                {{ $filters.dateFormat(item.created_at) }}
              </v-card-title>
              <v-card-text class="d-flex flex-column ">
                <v-container class="fill-height flex-grow-1 px-0">
                  <v-row>
                    <v-col>
                      <h2 class="text-no-wrap">En esta QR:</h2>
                    </v-col>
                    <v-col>
                      <h2>
                        {{ item.queue?.length }}
                      </h2>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  @click.stop="download_file(item.id)"
                  size="large" color="primary" prepend-icon="mdi-download">
                  descargar encolados
                </v-btn>
                <!--                    <v-btn-->
                <!--                        v-if="item.artist === 'Ellie Goulding'"-->
                <!--                        class="ml-2 mt-3"-->
                <!--                        fab-->
                <!--                        icon-->
                <!--                        height="40px"-->
                <!--                        right-->
                <!--                        width="40px"-->
                <!--                    >-->
                <!--                      <v-icon>mdi-play</v-icon>-->
                <!--                    </v-btn>-->

                <!--                    <v-btn-->
                <!--                        class="ml-2 mt-5"-->
                <!--                        outlined-->
                <!--                        rounded-->
                <!--                        small-->
                <!--                    >-->
                <!--                      START RADIO-->
                <!--                    </v-btn>-->
              </v-card-actions>
            </div>
            <v-avatar
              class="ma-3 pa-0"
              size="150"
              rounded="0"
              :image="item.src"
              style="border:black dashed 1px"
            >
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
