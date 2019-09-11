<template>
  <nav class="header">
    <a class="header-left" href="/">
      <div class="logo" />
      leftist wiki
    </a>

    <SearchBar />

    <div></div>
  </nav>
</template>

<script>
import SearchBar from 'components/search-bar'

export default {
  components: { SearchBar },
}
</script>
