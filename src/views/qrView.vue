<script>

import {defineComponent, reactive, toRefs} from "vue";

export default defineComponent({
  name: 'QrCaptureExample',
  setup() {
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
      state.data = data
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
    <div class="d-flex flex-row align-self-end py-2">
      <v-btn :to="{name:'login'}" flat color="primary">
        login
      </v-btn>
    </div>
    <qr-stream :camera="camera" @decode="onDecode" class="mb">
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
  </v-container>
</template>

<style scoped>

</style>
