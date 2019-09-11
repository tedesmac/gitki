<template>
  <div class="content">
    <div class="article">
      <h1 class="title">{{ title }}</h1>
      <div class="spacer" />
      <div id="article" v-html="markdown" />
    </div>

    <div>
      <Outline />
    </div>
  </div>
</template>

<script>
import { getMetaData, renderMarkdown } from 'client/utils'
import Outline from 'components/outline'
import Slugify from 'slugify'

export default {
  components: { Outline },

  computed: {
    markdown() {
      const data = getMetaData(this.$store.state.article.markdown)
      return renderMarkdown(data.markdown)
    },

    title() {
      return this.$store.state.article.title
    },
  },

  mounted() {
    const article = document.getElementById('article')
    const headers = ['H1', 'H2', 'H3']
    if (article) {
      let outline = []
      for (
        let child = article.firstChild;
        child != null;
        child = child.nextSibling
      ) {
        if (headers.indexOf(child.tagName) > -1) {
          const slug = Slugify(child.innerText.toLowerCase())
          const obj = {
            tag: child.tagName,
            children: [],
            href: `#${slug}`,
            text: child.innerText,
          }
          child.id = slug
          outline = [...outline, obj]
        }
      }
      this.$store.commit('setOutline', outline)
    }
  },
}
</script>
