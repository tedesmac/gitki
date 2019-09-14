<template>
  <div class="tag">
    <h1>Articles in {{ tag }}</h1>

    <div class="spacer" />

    <div :key="key" v-for="key in Object.keys(articles)">
      <h2>{{ key }}</h2>
      <div class="articles">
        <a
          :href="article.uri"
          :key="article.uri"
          v-for="article in articles[key]"
        >
          {{ article.title }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      articles: state =>
        state.searchResults.reduce((acc, article) => {
          const title = article.title.toUpperCase()
          const letter = title[0]
          if (letter in acc) {
            acc[letter] = [...acc[letter], article]
          } else {
            acc[letter] = [article]
          }
          return acc
        }, {}),
    }),

    tag() {
      return this.$route.params.tag
    },
  },
}
</script>
