<template>
  <div class="app" id="app">
    <Header />

    <router-view />

    <Footer />
  </div>
</template>

<script>
import Footer from 'components/footer'
import Header from 'components/header'

export default {
  components: { Footer, Header },
}
</script>
