<template>
  <div id="app">
    <div class="center">
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  props: {},
  data() {
    return {
      publicPath: process.env.BASE_URL,
      upwork: require('@/assets/upwork.svg'),
      github: require('@/assets/github.svg'),
      linkedin: require('@/assets/linkedin.svg'),
      stackoverflow: require('@/assets/stackoverflow.svg'),
      gmail: require('@/assets/gmail.svg'),
      cv: require('@/assets/cv.svg'),
    };
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.h1 {
  font-size: 3rem;
}
.h2 {
  font-style: italic;
  font-weight: lighter;
}
</style>
