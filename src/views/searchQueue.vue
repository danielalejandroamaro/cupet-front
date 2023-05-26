<script>
import {defineComponent, ref} from 'vue'
import {DEFAULT_SEARCH_DEBOUNCE} from "@/const";
import {_axios} from "@/plugins/axios";
import AppQueueProcessCard from "@/components/appQueueProcessCard.vue";

export default defineComponent({
  name: "searchQueue",
  components: {AppQueueProcessCard},
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
        <app-queue-process-card
          item="item"
        >
        </app-queue-process-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
