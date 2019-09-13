<template>
  <div class="app" id="app">
    <Sidebar />

    <div class="content-container">
      <router-view class="content" />
    </div>
  </div>
</template>

<script>
import Sidebar from 'components/sidebar'

export default {
  components: { Sidebar },
}
</script>
