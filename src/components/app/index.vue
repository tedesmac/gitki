<template>
  <div class="app" id="app">
    <Mobilebar />

    <Sidebar />

    <div class="content-container">
      <router-view class="content" />
    </div>
  </div>
</template>

<script>
import Mobilebar from 'components/mobilebar'
import Sidebar from 'components/sidebar'

export default {
  components: { Mobilebar, Sidebar },
}
</script>
