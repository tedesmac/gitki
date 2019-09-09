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
import Marked from 'marked'
import SanitizeHtml from 'sanitize-html'

export default {
  components: { Footer, Header },

  computed: {
    markdown() {
      const dirty = Marked(this.$store.state.markdown)
      return SanitizeHtml(dirty, {
        allowedTags: [
          'a',
          'b',
          'br',
          'blockquote',
          'caption',
          'code',
          'div',
          'em',
          'h1',
          'h2',
          'h3',
          'hr',
          'i',
          'img',
          'li',
          'nl',
          'ol',
          'p',
          'pre',
          'strong',
          'strike',
          'table',
          'tbody',
          'td',
          'thead',
          'tr',
          'ul',
        ],
        allowedAttributes: {
          a: ['href'],
          img: ['src'],
        },
        allowedSchemes: ['http', 'https'],
        allowedSchemesAppliedToAttributes: ['href'],
      })
    },
  },
}
</script>
