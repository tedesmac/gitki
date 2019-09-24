<template>
  <div class="language" v-if="translations.length > 0">
    <FontAwesomeIcon class="language-icon" :icon="faLanguage" />
    <select v-model="selected">
      <option value="">{{ current }}</option>
      <option :key="t.language" :value="t.href" v-for="t in translations">
        {{ t.language }}
      </option>
    </select>
  </div>
</template>

<script>
import { faCaretDown, faLanguage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import LanguageCodes from 'client/utils/languageCodes'
import { mapState } from 'vuex'

export default {
  components: { FontAwesomeIcon },

  data() {
    return {
      current: LanguageCodes[this.$route.params.locale],
      selected: '',
    }
  },

  computed: {
    ...mapState({
      translations: state => {
        const translations = state.article.translations
        return Object.keys(translations).map(key => {
          let article = translations[key]
          const index = article.indexOf('.md')
          if (index > 0) {
            article = article.substring(0, index)
          }
          return {
            href: `/${key}/wiki/${article}`,
            language: LanguageCodes[key],
          }
        })
      },
    }),

    language() {
      return LanguageCodes[this.$route.params.locale]
    },

    faCaretDown: () => faCaretDown,

    faLanguage: () => faLanguage,
  },

  watch: {
    selected: val => {
      if (val !== '') {
        window.location = val
      }
    },
  },
}
</script>
