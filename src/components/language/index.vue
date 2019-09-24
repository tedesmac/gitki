<template>
  <div class="language">
    <p>
      <FontAwesomeIcon class="language-icon" :icon="faLanguage" />
      {{ language }}
    </p>
    <FontAwesomeIcon :icon="faCaretDown" />
  </div>
</template>

<script>
import { faCaretDown, faLanguage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import LanguageCodes from 'client/utils/languageCodes'

export default {
  components: { FontAwesomeIcon },

  computed: {
    language() {
      return LanguageCodes[this.$route.params.locale]
    },

    faCaretDown: () => faCaretDown,

    faLanguage: () => faLanguage,
  },
}
</script>
