<script>
import {defineComponent, onBeforeMount, ref} from 'vue'
import {_axios} from "@/plugins/axios";

export default defineComponent({
  name: "productsView",
  setup() {
    const items = ref([]);
    const newProductDialog = ref(false);
    const newProductName = ref("");

    function fetchData() {
      _axios.get(
        "/products"
      ).then(({data}) => {
        newProductDialog.value = false;
        items.value = data.items;
      });
    }

    function createProduct() {
      _axios.post(
        "/admin/products",
        {
          name: newProductName.value
        }
      ).then(fetchData).catch(
        console.log
      );
    }

    function deleteProduct(product_id) {
      _axios.delete(
        "/admin/products",
        {
          params: {
            product_id
          }
        }
      ).then(fetchData).catch(
        console.log
      );
    }

    onBeforeMount(
      fetchData
    );
    return {
      items,
      newProductName,
      newProductDialog,
      createProduct,
      deleteProduct
    }

  }
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-dialog
          v-model="newProductDialog"
          :persistent="true"
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
          <v-card>
            <v-card-title class="pt-6">
              <span class="text-h5">Add new Product</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      label="Legal first name*"
                      v-model="newProductName"
                      required
                    ></v-text-field>
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
                @click="newProductDialog = false"
              >
                Close
              </v-btn>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="createProduct"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col cols="12" v-for="item in items">
        <v-card>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div class="d-flex flex-column justify-space-between">
              <v-card-subtitle class="text-h6 text-uppercase pt-6">
                {{ item.name }}
              </v-card-subtitle>
              <v-card-actions>
                <v-btn
                  variant="flat"
                  color="error"
                  @click="deleteProduct(item.id)">
                  delete
                </v-btn>
              </v-card-actions>
            </div>

            <v-avatar
              size="125"
              tile
            >
              <v-icon
                size="80"
              >
                mdi-gas-station
              </v-icon>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
