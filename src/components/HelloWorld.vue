<template>
  <div class="hello">
<!--    <h1>{{ msg }}</h1>-->
    <div class="center"><span class="agent-1">Barış Sarı - Python Developer</span>
      <hr class="agent-2"/>
      <span class="agent-3"> <a href="https://github.com/barissari" target="_blank">GitHub</a> | <a
          href="https://www.linkedin.com/in/bayram-baris-sari/" target="_blank">LinkedIn</a> | <a
          href="../vue/src/assets/BarisSari-CV.pdf" target="_blank">CV</a> | <a
          href="https://www.upwork.com/o/profiles/users/_~019ab5632c941ec465/">Upwork </a></span></div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.center {
  position: relative;
  top: 45%;
  text-align: center;
}

a {
  text-decoration: none;
  color: #5a5a5a;
}

a:hover {
  color: #f16334;
  cursor: pointer;
}

hr {
  width: 28vw;
}

@media only screen and (max-width: 900px) {
  body {
    font-size: 5vw;
  }

  hr {
    width: 90vw;
  }
}

@keyframes fade-in-right {
  from {
    opacity: 0;
    transform: translateX(-15px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes grow-left {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

.agent-1, .agent-3 {
  opacity: 0;
  animation: fade-in-right ease 0.4s forwards;
}

.agent-2 {
  transform: scaleX(0);
  transform-origin: left;
  animation: grow-left cubic-bezier(0.785, 0.135, 0.15, 0.86) 0.5s forwards;
  animation-delay: 0.1s;
}

.agent-3 {
  animation-delay: 0.4s;
}
</style>
