<template>
  <Layout :show-logo="false">
    <!-- Author intro -->
    <Author :show-title="true" />
  </Layout>
</template>

<script>
import Author from '~/components/Author.vue'

export default {
  components: {
    Author,
  },
  metaInfo: {
    title: 'Baris Sari - Software Developer'
  }
}
</script>
