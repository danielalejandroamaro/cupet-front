<template>
  <router-view/>
</template>

<script >
import {clean_auth_headers, load_auth_headers} from "@/plugins/axios/tools";
import {_axios} from "@/plugins/axios";

export default {
  beforeMount() {
    if (!window.location.href.includes('/admin'))
      return
    if (window.location.href.includes('/logout')) {
      clean_auth_headers();
      this.$router.push({name: 'qrReaderView'})
      return;
    }

    let auth_headers = load_auth_headers();
    if (auth_headers) {
      _axios.get("me").then(
        () => {
          if (window.location.href.includes('/login')) {
            this.$router.push({name: 'qrListView'})
          }
        }
      ).catch((...err) => {
        clean_auth_headers();
        this.$router.push({name: 'qrReaderView'})
      })
    } else {
      this.$router.push({name: 'qrReaderView'})
    }
  }
}
</script>

<style>
body {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0
}
</style>
