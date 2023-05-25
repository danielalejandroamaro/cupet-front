<script>

import {defineComponent, reactive, toRefs} from "vue";
import {useRouter} from "vue-router";

export default defineComponent({
  name: 'QrCaptureExample',
  setup() {
    const router = useRouter()
    const state = reactive({
      data: null,
      camera: 'font'
    })

    function flipCamera() {
      if (state.camera != 'rear') {
        state.camera = 'rear';
      } else {
        state.camera = 'front';
      }
    }

    function onDecode(data) {
      console.log(data);
      state.data = data
      router.push(
        {
          name: 'qrForm',
          query: {code: data}
        }
      )
    }

    return {
      ...toRefs(state),
      onDecode,
      flipCamera
    }
  }
});
</script>

<template>
  <v-container class="fill-height d-flex flex-column">
    <v-row class="flex-grow-1">
      <v-col cols="12">
        <qr-stream
          class="flex-grow-1 fill-height"
          :camera="camera"
          @decode="onDecode"
        >
          <div class="d-flex flex-column fill-height">
            <div class="flex-grow-1"></div>
            <div class="flex-shrink-0 d-flex flex-row justify-center pb-6">
              <v-btn @click="flipCamera" icon>
                <v-icon>
                  mdi-camera-flip
                </v-icon>
              </v-btn>
              <button></button>
            </div>
          </div>
        </qr-stream>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
