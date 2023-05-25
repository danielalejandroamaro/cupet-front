<script>

import {defineComponent, reactive, toRefs} from "vue";

export default defineComponent({
  name: 'QrCaptureExample',
  setup() {
    const state = reactive({
      data: null
    })

    function onDecode(data) {
      state.data = data
    }

    return {
      ...toRefs(state),
      onDecode
    }
  }
});
</script>

<template>
  <v-container>
    <qr-stream camera="front" @decode="onDecode" class="mb"></qr-stream>
    <div class="result">
      Result: {{ data }}
    </div>
  </v-container>
</template>

<style scoped>

</style>
