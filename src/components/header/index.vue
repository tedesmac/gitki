<template>
  <nav class="header">
    <div class="header-left">
      <a class="header-left" href="/">
        <div class="logo" />
        leftist wiki
      </a>
    </div>

    <div class="header-right">
      <FontAwesomeIcon class="burger" :icon="menuIcon" @click="onMenu" />
      <SearchBar class="search" />
    </div>

    <div class="mobile-menu" v-if="menu">
      <div>
        <SearchBar />
      </div>
      <Outline />
    </div>
  </nav>
</template>

<script>
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Outline from 'components/outline'
import SearchBar from 'components/search-bar'

export default {
  components: { FontAwesomeIcon, Outline, SearchBar },

  data() {
    return {
      menu: false,
    }
  },

  computed: {
    menuIcon() {
      if (this.menu) {
        return faTimes
      }
      return faBars
    },
  },

  methods: {
    onMenu() {
      this.menu = !this.menu
      if (this.menu) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    },
  },
}
</script>
