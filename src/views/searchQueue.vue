<script>
import {defineComponent, ref} from 'vue'
import {DEFAULT_SEARCH_DEBOUNCE} from "@/const";
import {_axios} from "@/plugins/axios";

export default defineComponent({
  name: "searchQueue",
  setup() {
    const search_text = ref("");
    const items = ref([]);
    const debounce = ref(false);
    let sleepInterval = null;

    function fetchData() {
      _axios.get("find",
        {
          params: {
            chapa: search_text.value
          }
        }).then(
        ({data}) => {
          items.value = data.items
        }
      ).finally(() => {
        resetInterval()
      })
    }

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

    return {
      search_text,
      items,
      onSearch,
      debounce
    }
  }
})
</script>

<template>
  <v-container>
    <v-row>
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
    </v-row>
    <v-row>
      <v-col
        cols="12"
        :key="item.id"
        v-for="item in items"
      >
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
                <v-sheet :elevation="6" class="pa-4">
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
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
