<template>
  <div class="index">
    <div class="title">Lefitst Wiki</div>

    <div class="spacer" />

    <p class="description">
      <b>Short description about the project.</b> Lorem ipsum dolor sit amet,
      consectetur adipiscing elit. Curabitur nec tellus mauris. Praesent
      egestas, sapien id auctor fermentum, leo dui condimentum elit, eu volutpat
      est nibh a quam. Nam nec amet.
    </p>

    <div class="spacer" />

    <h1>Categories</h1>

    <div class="categories">
      <div v-for="key in Object.keys(tags)" :key="key">
        <h2>{{ key }}</h2>
        <a v-for="tag in tags[key]" :href="`/${locale}/tag/${tag}`" :key="tag">
          {{ tag }}
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
      tags: state =>
        state.tags.reduce((acc, tag) => {
          const letter = tag[0].toUpperCase()
          if (letter in acc) {
            acc[letter] = [...acc[letter], tag]
          } else {
            acc[letter] = [tag]
          }
          return acc
        }, {}),
    }),

    locale() {
      return this.$route.params.locale
    },
  },
}
</script>
