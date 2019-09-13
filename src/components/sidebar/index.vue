<template>
  <div class="sidebar">
    <div>
      <div class="sidebar-header">
        <a href="/">
          <div class="logo" />
          Leftist Wiki
        </a>
      </div>

      <div class="spacer" />

      <SearchBar />

      <Outline />

      <div class="spacer" v-if="outline.length > 0" />

      <nav class="sidebar-tags" v-if="articleTags.length > 0">
        <FontAwesomeIcon :icon="faTags" />
        <a href="#" v-for="tag in articleTags">{{ tag }}</a>
      </nav>
    </div>

    <div>
      <div class="spacer" />
      <nav class="sidebar-links">
        <a href="#">Docs</a>
        <a href="#">Contribute</a>
        <a href="#">Source Code</a>
        <a href="#">Issues</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { faTags } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Outline from 'components/outline'
import SearchBar from 'components/search-bar'
import { mapState } from 'vuex'

export default {
  components: { FontAwesomeIcon, Outline, SearchBar },

  computed: {
    ...mapState({
      articleTags: state => {
        const article = state.article
        if (
          Object.keys(article).length === 0 &&
          article.constructor === Object
        ) {
          return []
        }
        return state.article.tags.sort()
      },

      outline: state => state.outline,
    }),

    faTags: () => faTags,
  },
}
</script>
