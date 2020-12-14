<script src="../../../personal-website/vue.config.js"></script>
<template>
  <div id="app">
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
<!--      <img svg-inline svg-sprite alt="Vue logo" :src="cv" class="vue-logo" width="56.7" height="56.7" stroke="white" fill="currentColor" />-->
      <a href="https://github.com/barissari"><img :src="github" alt="github"/></a>
      <a href="https://www.linkedin.com/in/bayram-baris-sari/"><img :src="linkedin" alt="linkedin"/></a>
      <a href="https://www.upwork.com/o/profiles/users/_~019ab5632c941ec465/"><img :src="upwork" alt="upwork"
                                                                                   height="56.7" width="56.7"/></a>
      <a href="https://stackoverflow.com/users/9686506/baris"><img :src="stackoverflow" alt="stackoverflow"/></a>
      <a href="mailto:bayrambariss@gmail.com"><img :src="gmail" alt="gmail"/></a>
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
    };
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.author {
	margin: 0 auto;
	max-width: 800px;
	text-align: center;
	padding: calc(var(--space) / 2) 0;
}
img {
  border-radius: 50%;
}
h1 {
  font-size: 2.5rem;
}

h2 {
  font-size: 1.5rem;
  font-style: italic;
  font-weight: lighter;
}

</style>