<script>
import {defineComponent,} from 'vue'
import {_axios} from "@/plugins/axios";

export default defineComponent({
  name: "appQueueProcessCard",
  setup() {
    function deleteQueue(queue_process_id) {
      _axios.delete(
        '/admin/queue_process', {
          params: {
            queue_process_id
          }
        }
      ).then(
        fetchData
      ).catch(
        console.log
      )
    }

    return {
      deleteQueue
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    hideHeader: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    hideDelete: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  }
})
</script>

<template>
  <v-card :to="{name:'processQueueView',params:{id:item.id}}">
    <v-card-title v-if="!hideHeader">
      {{ $filters.dateFromNowUtc(item.created_at) }}
    </v-card-title>
    <v-card-subtitle
      class="d-flex flex-row justify-space-between"
    >
      <v-container>
        <v-row class="py-3">
          <v-col class="py-1 d-flex flex-row my-auto justify-space-between">
            <span class="my-auto"> min: </span>
            <v-chip> {{ item.min_index }}</v-chip>
          </v-col>
          <v-col class="py-1 d-flex flex-row my-auto justify-space-between">
            <span class="my-auto"> max: </span>
            <v-chip> {{ item.max_index }}</v-chip>
          </v-col>
          <v-col class="py-1 d-flex flex-row my-auto justify-space-between">
            <span class="my-auto"> producto: </span>
            <v-chip> {{ item['product_id.name'] }}</v-chip>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions v-if="!hideDelete">
        <v-btn
          variant="flat"
          color="error"
          @click="$emit('deleteQueue')">
          delete
        </v-btn>
      </v-card-actions>
    </v-card-subtitle>
  </v-card>

</template>

<style scoped>

</style>
