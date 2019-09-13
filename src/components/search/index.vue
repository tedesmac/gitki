<template>
  <div>
    <div class="search-result" v-for="(result, index) in results">
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
</template>

<script>
import { removeHtmlTags, renderMarkdown } from 'client/utils'

export default {
  computed: {
    results() {
      return this.$store.state.searchResults
    },
  },

  methods: {
    resultContent(content) {
      return removeHtmlTags(renderMarkdown(content.substring(0, 300)))
    },
  },
}
</script>
