<template>
  <Layout :showLogo="false" :showTech="true">
    <div class="post-title">
      <div class="post__header">
        <g-image alt="Cover image" v-if="$page.post.cover_image" :src="$page.post.cover_image"/>
        <p v-if="$page.post.photographer">Photo by
          <em v-html="$page.post.photographer"></em>
          on <em v-html="$page.post.image_link"></em>
        </p>
        <p v-else>
          from <em v-html="$page.post.image_link"></em>
        </p>
      </div>

    <h1 class="post-title__text">
      {{ $page.post.title }}
    </h1>
    <PostMeta :post="$page.post"/>
    </div>

    <div class="post content-box">
      <div class="post__content tech__content" v-html="$page.post.content"/>
      <div class="post__footer">
        <PostTags :post="$page.post"/>
      </div>
    </div>

    <div class="post-comments">
      <!-- Add comment widgets here -->
    </div>

    <Author class="post-author" :showIcons="false" />
  </Layout>
</template>

<script>
import PostMeta from '~/components/PostMeta'
import PostTags from '~/components/PostTags'
import Author from '~/components/Author.vue'

export default {
  components: {
    Author,
    PostMeta,
    PostTags
  },
  metaInfo() {
    return {
      title: this.$page.post.title,
      meta: [
        {
          name: 'description',
          content: this.$page.post.description
        }
      ]
    }
  },
  mounted () {
    let images = document.getElementsByTagName("img");
    for (var i = 0; i < images.length; i++) {
      let p = images[i].closest("p");
      if (p !== null){ p.classList.add("text-center"); }
    }
  }
}
</script>

<page-query>
query Post ($id: ID!) {
  post: post (id: $id) {
    title
    path
    date (format: "D. MMMM YYYY")
    timeToRead
    tags {
      id
      title
      path
    }
    description
    content
    cover_image (blur: 5, quality: 80)
    photographer
    image_link
  }
}
</page-query>

<style lang="scss">

.tech {

  &__content {
    img {
      width: auto !important;
      margin: 0 auto !important;
      display: block !important;
    }
  }
}
</style>
