<script>

import {_axios, baseUri} from "@/plugins/axios";

export default {
  name: "qrListView",

  data: () => ({
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
      let nombreArchivo = "qr-list";
      var link = document.createElement('a');
      link.href = url;
      link.download = nombreArchivo;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
    <v-row >
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
        <v-card @click="descargarImagen(item)">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="text-h5">
                {{ $filters.dateFormat(item.created_at) }}
              </v-card-title>
              <v-card-subtitle>
                <p>
                  {{ item.count }}
                </p>
              </v-card-subtitle>
              <v-card-actions>
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
              class="ma-3"
              size="125"
              tile
            >
              <v-img :src="item.src"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
