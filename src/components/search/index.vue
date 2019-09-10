<template>
  <div class="app">
    <Header />

    <div class="content">
      <div class="no-sidebar">
        <div class="search-result" v-for="result in results">
          <a :href="result.uri">
            <h2>{{ result.title }}</h2>
          </a>

          <p>
            {{ resultContent(result.markdown) }}
            <a :href="result.uri">...</a>
          </p>

          <div class="spacer" />
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Footer from 'components/footer'
import Header from 'components/header'
import { removeHtmlTags, renderMarkdown } from 'client/utils'

export default {
  components: { Footer, Header },

  computed: {
    results() {
      return this.$store.state.results
    },
  },

  methods: {
    resultContent(content) {
      return removeHtmlTags(renderMarkdown(content.substring(0, 300)))
    },
  },
}
</script>
