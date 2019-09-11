<template>
  <div class="search-bar">
    <input
      placeholder="search"
      type="search"
      v-model="query"
      @keyup.enter="search"
    />
    <FontAwesomeIcon class="icon" :icon="faSearch" @click="search" />
  </div>
</template>

<script>
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  components: { FontAwesomeIcon },

  data() {
    return {
      locale: '',
      query: '',
    }
  },

  computed: {
    faSearch: () => faSearch,
  },

  methods: {
    search() {
      const query = encodeURI(this.query)
      if (query.length > 0) {
        window.location = `/${this.locale}/search?q=${query}`
      }
    },
  },

  mounted() {
    const path = window.location.pathname.substring(1)
    const index = path.indexOf('/')
    this.locale = path.substring(0, index)
  },
}
</script>
