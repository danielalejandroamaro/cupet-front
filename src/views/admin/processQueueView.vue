<script>
import {defineComponent, onBeforeMount, ref} from 'vue'
import {useRoute} from 'vue-router'
import {_axios} from "@/plugins/axios";
import {DEFAULT_SEARCH_DEBOUNCE} from "@/const";
import AppQueueProcessCard from "@/components/appQueueProcessCard.vue";
import AppQueueItem from "@/components/appQueueItem.vue";

export default defineComponent({
  name: "processQueueView",
  components: {AppQueueItem, AppQueueProcessCard},
  setup() {
    const processQueue_id = ref(null);
    const processQueue_obj = ref(null);
    const search_text = ref("");
    const items = ref([]);
    const debounce = ref(false);
    const dialog = ref(false);
    let sleepInterval = null;

    function onSearch() {
      resetInterval();
      debounce.value = true;
      sleepInterval = setTimeout(() => {
        fetchData();
        sleepInterval = null;
      }, DEFAULT_SEARCH_DEBOUNCE)
    }

    function resetInterval() {
      debounce.value = false;
      clearTimeout(sleepInterval);
      sleepInterval = null;
    }

    function loadProcessQueueItem() {
      _axios.get("/admin/queue_process/",
        {
          params: {
            queue_process_id: processQueue_id.value
          }
        }
      ).then(
        ({data}) => {
          processQueue_obj.value = data
        }
      )
    }

    function fetchData() {
      _axios.get("queue",
        {
          params: {
            chapa: search_text.value,
            product_id: processQueue_obj.value.product_id,
            index__lte: processQueue_obj.value.max_index,
            index__gte: processQueue_obj.value.min_index,
          }
        }).then(
        ({data}) => {
          items.value = data.items
        }
      ).finally(() => {
        resetInterval()
      })
    }

    const route = useRoute()

    function loadParams() {
      processQueue_id.value = route.params.id;
      loadProcessQueueItem()
    }

    onBeforeMount(
      loadParams
    )
    return {
      items,
      dialog,
      onSearch,
      debounce,
      search_text,
      processQueue_id,
      processQueue_obj
    }
  },
  created() {
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        console.log(toParams);
        this.processQueue_id = toParams.id;
        // react to route changes...
      }
    )
  }
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <AppQueueProcessCard
          v-if="processQueue_obj"
          :item="processQueue_obj"
          :hideHeader="true"
          :hideDelete="true"
        >
        </AppQueueProcessCard>
      </v-col>
      <v-col cols="12">
        <v-text-field
          label="Buscar"
          v-model="search_text"
          @input="onSearch"
        >
          <template
            v-slot:append-inner
          >
            <v-progress-circular
              size="20"
              v-if="debounce"
              indeterminate
            ></v-progress-circular>
          </template>
        </v-text-field>
      </v-col>
      <v-col cols="12"
             v-for="item in items"
      >
        <v-dialog
          v-model="dialog"
          transition="dialog-bottom-transition"
          width="auto"
        >
          <template v-slot:activator="{ props }">
            <app-queue-item
              :item="item"
              v-bind="props"
            >
            </app-queue-item>
          </template>
          <template v-slot:default="{ isActive }">
            <v-card
              append-icon="$close"
              class="mx-auto"
              elevation="16"
              max-width="500"
              title="Send a receipt"
            >
              <template v-slot:append>
                <v-btn icon="$close" variant="text" @click="dialog = false"></v-btn>
              </template>

              <v-divider></v-divider>

              <div class="py-12 text-center">
                <v-icon
                  class="mb-6"
                  color="success"
                  icon="mdi-check-circle-outline"
                  size="128"
                ></v-icon>

                <div class="text-h4 font-weight-bold">This receipt was sent</div>
              </div>

              <v-divider></v-divider>

              <div class="pa-4 text-end">
                <v-btn
                  class="text-none"
                  color="medium-emphasis"
                  min-width="92"
                  rounded
                  variant="outlined"
                  @click="dialog = false"
                >
                  Close
                </v-btn>
              </div>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
