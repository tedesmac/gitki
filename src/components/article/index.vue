<template>
  <div class="content">
    <div class="article">
      <h1 class="title">{{ title }}</h1>
      <div class="spacer" />
      <div id="article" v-html="markdown" />
    </div>

    <div>
      <div class="sidebar"></div>
    </div>
  </div>
</template>

<script>
import { getMetaData, renderMarkdown } from 'client/utils'

export default {
  computed: {
    markdown() {
      const data = getMetaData(this.$store.state.article.markdown)
      return renderMarkdown(data.markdown)
    },

    title() {
      return this.$store.state.article.title
    },
  },

  methods: {},

  mounted() {},
}
</script>
