<template>
  <div class="app">
    <Header />

    <div class="content">
      <h1>Lefitst Wiki</h1>
    </div>

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
