<template>
  <div class="content">
    <div class="article" v-html="markdown" />
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
  },
}
</script>
