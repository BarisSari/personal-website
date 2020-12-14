<template>
  <Layout>
    <h1 class="tag-title text-center space-bottom">
      # {{ $page.erasmusTag.title }}
    </h1>

    <div class="posts">
      <PostCard v-for="edge in $page.erasmusTag.belongsTo.edges" :key="edge.node.id" :post="edge.node"/>
    </div>
  </Layout>
</template>

<page-query>
query ErasmusTag ($id: ID!) {
  erasmusTag (id: $id) {
    title
    belongsTo {
      edges {
        node {
          ...on ErasmusPost {
            title
            path
            date (format: "D. MMMM YYYY")
            timeToRead
            description
            content
          }
        }
      }
    }
  }
}
</page-query>

<script>
import Author from '~/components/Author.vue'
import PostCard from '~/components/PostCard.vue'

export default {
  components: {
    Author,
    PostCard
  },
  metaInfo: {
    title: 'Hello, world!'
  }
}
</script>

<style lang="scss">

</style>

