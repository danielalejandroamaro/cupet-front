<script>
import {defineComponent} from 'vue'

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
  <v-card>
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title class="text-h5">
          {{ $filters.dateFormat(item.created_at) }}
        </v-card-title>
        <v-card-subtitle>
          <v-chip color="warn">
            {{ item["product_id.name"] }}
          </v-chip>
        </v-card-subtitle>
        <v-card-text class="text-h5 d-flex flex-column">
          <v-sheet :elevation="6" class="pa-4 text-center">
            {{ item['car_id.chapa'] }}
          </v-sheet>
        </v-card-text>
      </div>
      <v-avatar
        color="primary"
        class="ma-3"
        size="100"
      >
        <h3 class="text-h3 text-shades-white">
          {{ item.index }}
        </h3>
      </v-avatar>
    </div>
  </v-card>
</template>

<style scoped>

</style>
