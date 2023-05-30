<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: "appQueueItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  }
})
</script>

<template>
  <v-card elevation="2">
    <v-card-title class="py-3 d-flex flex-row align-center">
      <span class="pr-3 subtitle-1">
        {{ $filters.dateFormat(item.created_at) }}
      </span>
      <v-chip
        color="primary"
        label
        class="mx-3"
        size="65"
      >
        <span class="white--text text-h4 px-3">{{ item.index }}</span>
      </v-chip>
      <v-chip
        prepend-icon="mdi-gas-station"
        label class="mx-3 text-subtitle-1 text-no-wrap" style="min-height: 1em">
        {{ item["product_id.name"] }}
      </v-chip>
    </v-card-title>
    <v-card-text class="d-flex flex-column">
      <v-container class="py-0">
        <v-row>
          <v-col>
            <v-row class="flex-nowrap">
              <v-col class="d-flex flex-column flex-grow-0" style="min-width: 7.5em">
                <b class="my-auto">
                  CHOFER:
                </b>
              </v-col>
              <v-col class="d-flex flex-row flex-grow-1">
                <v-sheet class="mr-auto pa-3" elevation="6" style="border: solid 1px black; border-radius: .3em">
              <span class="text-subtitle-1 text-no-wrap" style="min-height: 1em">
              {{ item["persone_id.name"] }}
              </span>
                </v-sheet>
              </v-col>
            </v-row>
          </v-col>
          <v-col>
            <v-row class="flex-nowrap">
              <v-col class="d-flex flex-column flex-grow-0" style="min-width: 7.5em">
                <b class="my-auto">
                  CHAPA:
                </b>
              </v-col>
              <v-col class="d-flex flex-row flex-grow-1">
                <v-sheet class="mr-auto pa-3" elevation="6" style="border: solid 1px black; border-radius: .3em">
              <span class="text-subtitle-1 text-no-wrap" style="min-height: 1em">
              {{ item["car_id.chapa"] }}
              </span>
                </v-sheet>
              </v-col>
            </v-row>
          </v-col>
          <!--          <v-col>-->
          <!--            <v-row class="flex-nowrap">-->
          <!--              <v-col class="d-flex flex-column flex-grow-0" style="min-width: 7.5em">-->
          <!--                <b class="my-auto">-->
          <!--                  PRODUCTO:-->
          <!--                </b>-->
          <!--              </v-col>-->
          <!--              <v-col class="d-flex flex-row flex-grow-1">-->
          <!--                <v-sheet class="mr-auto pa-3" elevation="6" style="border: solid 1px black; border-radius: .3em">-->
          <!--              <span class="text-subtitle-1 text-no-wrap" style="min-height: 1em">-->
          <!--              {{ item["product_id.name"] }}-->
          <!--              </span>-->
          <!--                </v-sheet>-->
          <!--              </v-col>-->
          <!--            </v-row>-->
          <!--          </v-col>-->
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
