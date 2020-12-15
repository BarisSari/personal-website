<template>
    <div class="author">
       <g-link to="/"><img
            src="@/assets/profile.png"
            alt="John"
            height="250"
            class="profile"
        ></g-link>

      <h1>Barış Sarı</h1>
      <h2>Freelance Backend Developer/Data Scientist at Upwork.<br>I speak Python, ML/DL, SQL, Docker, JS.</h2>
      <a :href="`${publicPath}BarisSari-CV.pdf`" target="_blank"><img :src="cv" alt="cv" height="56.7" width="56.7"/></a>
      <a href="https://www.upwork.com/o/profiles/users/_~019ab5632c941ec465/"><img :src="upwork" alt="upwork" height="56.7" width="56.7"/></a>
      <a href="mailto:bayrambariss@gmail.com"><img :src="gmail" alt="gmail" height="56.7" width="56.7"/></a>
      <a href="https://stackoverflow.com/users/9686506/baris"><img :src="stackoverflow" alt="stackoverflow" height="56.7" width="56.7"/></a>
      <a href="https://github.com/barissari"><img :src="github" alt="github"/></a>
      <a href="https://www.linkedin.com/in/bayram-baris-sari/"><img :src="linkedin" alt="linkedin" height="56.7" width="56.7"/></a>
      <hr>
      <div class="author__blogs">
        <h3>Blogs</h3>
        <h5>Erasmus Trips</h5>
  <!--      <p>Erasmus / Tech / Movies & Books</p>-->
        <g-link to="/erasmus-blog/" class="blog"><img :src="travelling" alt="erasmus-blog"  height="56.7" width="56.7"/></g-link>
<!--        <h5>Tech (Coming soon!)</h5>-->
  <!--      <g-link to="/blog/" class="blog"><img :src="tech" alt="tech-blog"  height="56.7" width="56.7"/></g-link>-->
<!--        <h5>Movies & Series (Coming soon!)</h5>-->
  <!--      <g-link to="/movies-blog/" class="blog"><img :src="movies" alt="movies-blog"  height="56.7" width="56.7"/></g-link>-->
      </div>
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

  //&__blogs {
    //display: flex;
    //max-width: 800px;
    //margin: 0 auto;
    //text-align: left;
  //}
}
.author .profile {
  border-radius: 50%;
}
.author a {
  margin-right: 10px;
}
.author h1 {
  font-size: 2.5rem;
}

.author h2 {
  font-size: 1.5rem;
  font-style: italic;
  font-weight: lighter;
}

</style>