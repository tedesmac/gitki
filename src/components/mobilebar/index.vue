<template>
  <div class="mobilebar">
    <FontAwesomeIcon class="menuicon" :icon="menuIcon" @click="onClick" />

    <a class="branding" href="/">
      <div class="logo" />
      Lefitst Wiki
    </a>
  </div>
</template>

<script>
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapState } from 'vuex'

export default {
  components: { FontAwesomeIcon },

  computed: mapState({
    menuIcon: state => {
      return state.menu ? faTimes : faBars
    },
  }),

  methods: {
    onClick() {
      this.$store.commit('toggleMenu')

      const bodyOverflow = document.body.style.overflow

      if (bodyOverflow === 'auto') {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    },
  },
}
</script>
