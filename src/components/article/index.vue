<template>
  <div class="content">
    <div class="article">
      <h1 class="title">{{ title }}</h1>
      <div class="spacer" />
      <div v-html="markdown" />
    </div>
  </div>
</template>

<script>
import { getMetaData, renderMarkdown } from 'client/utils'

export default {
  computed: {
    markdown() {
      const data = getMetaData(this.$store.state.markdown)
      return renderMarkdown(data.markdown)
    },

    title() {
      return this.$store.state.title
    },
  },
}
</script>
