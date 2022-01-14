<template>
  <Layout :showLogo="false" :showMovie="true">
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
import PostMeta from '~/components/PostMeta.vue';
import PostTags from '~/components/PostTags.vue';
import Author from '~/components/Author.vue';

export default {
  components: {
    Author,
    PostMeta,
    PostTags,
  },
  metaInfo() {
    return {
      title: this.$page.post.title,
      meta: [
        {
          name: 'description',
          content: this.$page.post.description,
        },
      ],
    };
  },
  mounted() {
    const images = document.getElementsByTagName('img');
    for (let i = 0; i < images.length; i++) {
      const p = images[i].closest('p');
      if (p !== null) { p.classList.add('text-center'); }
    }
  },
};
</script>

<page-query>
query MoviePost ($id: ID!) {
  post: moviePost (id: $id) {
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
.post-title {
  padding: calc(var(--space) / 2) 0 calc(var(--space) / 2);
  text-align: center;
}

</style>
