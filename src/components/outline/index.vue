<template>
  <nav class="outline">
    <p v-if="outline.length > 0">Table of contents</p>
    <a v-for="i in outline" :href="i.href" @click="onClick">
      <h1 v-if="i.tag === 'H1'">
        <FontAwesomeIcon class="" :icon="faCaretRight" />
        {{ i.text }}
      </h1>

      <h2 v-else-if="i.tag === 'H2'">
        <FontAwesomeIcon class="" :icon="faCaretRight" />
        {{ i.text }}
      </h2>

      <h3 v-else-if="i.tag === 'H3'">
        <FontAwesomeIcon class="" :icon="faCaretRight" />
        {{ i.text }}
      </h3>
    </a>
  </nav>
</template>

<script>
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapState } from 'vuex'

export default {
  components: { FontAwesomeIcon },

  computed: {
    ...mapState({
      outline: state => state.outline,
    }),

    faCaretRight: () => faCaretRight,
  },

  methods: {
    onClick() {
      this.$store.commit('setMenu', false)
      document.body.style.overflow = 'auto'
    },
  },
}
</script>
