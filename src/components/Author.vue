<template>
    <div class="author">
       <g-link to="/"><img
            src="@/assets/profile.png"
            alt="John"
            height="250"
        ></g-link>

      <h1>Barış Sarı</h1>
      <h2>Freelance Backend Developer/Data Scientist at Upwork.<br>I speak Python, ML/DL, SQL, Docker, JS.</h2>
      <a :href="`${publicPath}BarisSari-CV.pdf`" target="_blank"><img :src="cv" alt="cv" height="56.7"
                                                                      width="56.7"/></a>
      <a href="https://github.com/barissari"><img :src="github" alt="github"/></a>
      <a href="https://www.linkedin.com/in/bayram-baris-sari/"><img :src="linkedin" alt="linkedin"/></a>
      <a href="https://www.upwork.com/o/profiles/users/_~019ab5632c941ec465/"><img :src="upwork" alt="upwork"
                                                                                   height="56.7" width="56.7"/></a>
      <a href="https://stackoverflow.com/users/9686506/baris"><img :src="stackoverflow" alt="stackoverflow"/></a>
      <a href="mailto:bayrambariss@gmail.com"><img :src="gmail" alt="gmail"/></a>
      <h2>Blogs</h2>
      <p>Erasmus Trips</p>
<!--      <p>Erasmus / Tech / Movies & Books</p>-->
      <g-link to="/erasmus-blog/" class="blog"><img :src="travelling" alt="erasmus-blog"  height="56.7" width="56.7"/></g-link>
<!--      <g-link to="/blog/" class="blog"><img :src="tech" alt="tech-blog"  height="56.7" width="56.7"/></g-link>-->
<!--      <g-link to="/movies-blog/" class="blog"><img :src="movies" alt="movies-blog"  height="56.7" width="56.7"/></g-link>-->
    </div>
</template>

<script>
export default {
  name: 'Main',
  props: {},
  data() {
    return {
      publicPath: "",
      upwork: require('@/assets/icons/upwork.svg'),
      github: require('@/assets/icons/github.svg'),
      linkedin: require('@/assets/icons/linkedin.svg'),
      stackoverflow: require('@/assets/icons/stackoverflow.svg'),
      gmail: require('@/assets/icons/gmail.svg'),
      cv: require('@/assets/icons/cv.svg'),
      travelling: require('@/assets/icons/travelling.svg'),
      tech: require('@/assets/icons/tech.svg'),
      movies: require('@/assets/icons/movies.svg'),
    };
  },
  methods: {},
}
</script>

<style lang="scss">
.author {
	margin: 0 auto;
	max-width: 800px;
	text-align: center;
	padding: calc(var(--space) / 2) 0;
}
.author img {
  border-radius: 50%;
}
.author h1 {
  font-size: 2.5rem;
}

.author h2 {
  font-size: 1.5rem;
  font-style: italic;
  font-weight: lighter;
}
.blog {
  margin-right: 10px;
}
</style>