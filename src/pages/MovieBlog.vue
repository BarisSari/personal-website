<template>
  <Layout :show-logo="false" :showMain="true">
    <h1 class="tag-title text-center space-bottom">
      Welcome to Movies Blog!
    </h1>
    <!-- List posts -->
    <div class="posts">
      <PostCard v-for="edge in $page.posts.edges" :key="edge.node.id" :post="edge.node"/>
    </div>
    <!-- Author intro -->
    <Author :showIcons="false" />

  </Layout>
</template>

<page-query>
query {
  posts: allMoviePost(filter: { published: { eq: true }}) {
    edges {
      node {
        id
        title
        date (format: "D. MMMM YYYY")
        timeToRead
        description
        cover_image (width: 770, height: 380, blur: 10, quality: 90)
        path
        tags {
          id
          title
          path
        }
      }
    }
  }
}
</page-query>

<script>
import Author from '~/components/Author.vue';
import PostCard from '~/components/PostCard.vue';

export default {
  components: {
    Author,
    PostCard,
  },
  metaInfo: {
    title: 'Baris Sari - Movie Blog',
  },
};
</script>
