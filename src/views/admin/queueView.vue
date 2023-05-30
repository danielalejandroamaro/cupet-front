<script>
import {defineComponent, onBeforeMount, reactive, ref} from 'vue'
import {_axios} from "@/plugins/axios";
import AppQueueProcessCard from "@/components/appQueueProcessCard.vue";

export default defineComponent({
  name: "queueView",
  components: {AppQueueProcessCard},
  setup() {
    const items = ref([]);
    const products = ref([]);
    const newQueueDialog = ref(false);
    const newProcessQueue = reactive(
      {
        product_id: null,
        min_index: 0,
        max_index: 250,
      }
    )

    function fetchData() {
      newQueueDialog.value = false;
      _axios.get(
        "/admin/queue_process"
      ).then(
        ({data}) => items.value = data.items
      ).catch(
        console.log
      )
      _axios.get(
        "/products"
      ).then(
        ({data}) => products.value = data.items
      ).catch(
        console.log
      )
    }

    function createQueue() {
      _axios.post(
        '/admin/queue_process',
        newProcessQueue
      ).then(
        fetchData
      ).catch(
        console.log
      )
    }

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

    onBeforeMount(fetchData)
    return {
      items,
      products,
      createQueue,
      deleteQueue,
      newQueueDialog,
      newProcessQueue
    }
  }
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-dialog
          v-model="newQueueDialog"
          persistent
          width="1024"
        >
          <template v-slot:activator="{ props }">
            <v-card
              class="py-4"
              v-bind="props"
            >
              <div
                class="flex-grow-1 pr-3 text-center mx-auto">
                <v-icon size="50">
                  mdi-plus
                </v-icon>
              </div>
            </v-card>
          </template>
          <v-card
            prepend-icon="mdi-clipboard-list"
          >
            <template v-slot:title>
              Crea una cola
            </template>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      label="min index"
                      type="number"
                      v-model="newProcessQueue.min_index"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      label="max index"
                      type="number"
                      v-model="newProcessQueue.max_index"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-autocomplete
                      :items="products"
                      v-model="newProcessQueue.product_id"
                      item-title="name"
                      item-value="id"
                      label="Product*"
                      :rules="[(v)=>v||'campo requerido']"
                    ></v-autocomplete>
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
                @click="newQueueDialog = false"
              >
                Close
              </v-btn>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="createQueue"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col cols="12" v-for="item in items">
        <app-queue-process-card
          :item="item"
          @deleteQueue="deleteQueue(item.id)"
        >

        </app-queue-process-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
