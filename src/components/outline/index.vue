<template>
  <nav class="outline">
    <a v-for="i in outline" :href="i.href" @click="onClick">
      <h1 v-if="i.tag === 'H1'">
        {{ i.text }}
      </h1>

      <h2 v-else-if="i.tag === 'H2'">
        {{ i.text }}
      </h2>

      <h3 v-else-if="i.tag === 'H3'">
        {{ i.text }}
      </h3>
    </a>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState({
    outline: state => state.outline,
  }),

  methods: {
    onClick() {
      this.$store.commit('setMenu', false)
      document.body.style.overflow = 'auto'
    },
  },
}
</script>
