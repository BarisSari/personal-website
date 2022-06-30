<template>
  <Layout>
    <div class="post-title">
      <div class="post__header">
        <g-image alt="Cover image" v-if="$page.post.cover_image" :src="$page.post.cover_image"/>
        <p v-if="$page.post.photographer !== undefined">Photo by
          <em v-html="$page.post.photographer"></em>
          on <em v-html="$page.post.image_link"></em>
        </p>
        <p v-else>
          from <em v-html="$page.post.image_link"></em>
        </p>
      </div>

<!--    <div class="post-title">-->
      <h1 class="post-title__text">
        {{ $page.post.title }}
      </h1>
      <PostMeta :post="$page.post"/>
    </div>

    <div class="post content-box">
      <div class="post__content" v-html="$page.post.content"/>
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
};
</script>

<page-query>
query TravelPost ($id: ID!) {
  post: travelPost (id: $id) {
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

.post {

  &__header {
    width: calc(100% + var(--padding) * 2);
    margin-left: calc(var(--padding) * -1);
    margin-top: calc(var(--space) * -1);
    margin-bottom: calc(var(--space) / 2);
    overflow: hidden;
    border-radius: var(--radius) var(--radius) 0 0;

    img {
      width: 100%;
    }

    &:empty {
      display: none;
    }
  }

  &__content {
    h2:first-child {
      margin-top: 0;
    }

    p:first-of-type {
      font-size: 1.2em;
      color: var(--title-color);
    }

    img {
      width: calc(100% + var(--space) * 2);
      margin-left: calc(var(--space) * -1);
      display: block;
      max-width: none;
    }
  }
}

.post-comments {
  padding: calc(var(--space) / 2);

  &:empty {
    display: none;
  }
}

.post-author {
  margin-top: calc(var(--space) / 2);
}
</style>
