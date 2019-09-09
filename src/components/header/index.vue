<template>
  <nav class="header">
    <div>
      <a href="/">
        <span class="logo" />
        leftist wiki
      </a>
    </div>

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
