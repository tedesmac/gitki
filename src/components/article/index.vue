<template>
  <div class="app">
    <Header />

    <div class="content">
      <div class="article" v-html="markdown" />
    </div>

    <Footer />
  </div>
</template>

<script>
import Footer from 'components/footer'
import Header from 'components/header'
import { getMetaData, renderMarkdown } from 'client/utils'

export default {
  components: { Footer, Header },

  computed: {
    markdown() {
      const data = getMetaData(this.$store.state.markdown)
      return renderMarkdown(data.markdown)
    },
  },
}
</script>
