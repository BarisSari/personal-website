<template>
  <div class="author">
    <g-link to="/">
      <g-image
          src="@/assets/profile.jpeg"
          alt="me"
          height="200"
          width="200"
          class="profile"
          quality="100"
      />
    </g-link>

    <h1>Barış Sarı</h1>
    <div v-if="showIcons">
      <h2>Freelance Backend Developer/Data Scientist at Upwork.<br>I speak Python, ML/DL, SQL, Docker, JS.</h2>
      <div class="author__icons">
        <b-container class="grey lighten-5">
          <b-row>
            <b-col cols="0" lg="1"></b-col>
            <b-col
                v-for="n in topIcons"
                :key="n.key"
                cols="3"
                lg="auto"
            >
              <a :href="n.href" target="_blank">
                <g-image width="56.7" height="56.7" :src="n.src" :alt="n.alt"/>
              </a>
            </b-col>
            <b-col cols="0" lg="1"></b-col>
          </b-row>
        </b-container>
      </div>
      <hr>
      <div class="author__blogs">
        <b-container class="grey lighten-5">
          <h3>Blogs</h3>
          <b-row>
            <b-col
                v-for="n in bottomData"
                :key="n.key"
                cols="12"
                sm="4"
            >
              <h5>{{ n.header }}</h5>
              <div class="author__icons">
                <g-link :to="n.to" class="blog">
                  <g-image width="56.7" height="56.7" :src="n.src" :alt="n.alt"/>
                </g-link>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
    <div v-else><h2 v-html="$static.metadata.siteDescription"/></div>
  </div>
</template>

<static-query>
query {
  metadata {
    siteDescription
  }
}
</static-query>

<script>
export default {
  name: 'Main',
  props: {
    showIcons: { default: true },
  },
  data () {
    return {
      bottomData: [
        {
          key: 1,
          header: 'Erasmus Trips',
          to: '/erasmus-blog/',
          src: require('@/assets/icons/travelling.svg'),
          alt: 'eramus-blog',
        },
        {
          key: 2,
          header: 'Technology',
          to: '/tech-blog/',
          src: require('@/assets/icons/tech.svg'),
          alt: 'tech-blog',
        },
        {
          key: 3,
          header: 'Movies (Not ready)',
          to: '',
          src: require('@/assets/icons/movies.svg'),
          alt: 'movies-blog',
        },
      ],
      topIcons: [
        {
          key: 1,
          href: '/BarisSari-CV.pdf',
          src: require('@/assets/icons/cv.svg'),
          alt: 'cv',
        },
        {
          key: 2,
          href: 'https://www.upwork.com/o/profiles/users/_~019ab5632c941ec465/',
          src: require('@/assets/icons/upwork.svg'),
          alt: 'upwork',
        },
        {
          key: 3,
          href: 'mailto:bayrambariss@gmail.com',
          src: require('@/assets/icons/gmail.svg'),
          alt: 'gmail',
        },
        {
          key: 4,
          href: 'https://barissari.medium.com/',
          src: require('@/assets/icons/medium.svg'),
          alt: 'medium',
        },
        {
          key: 5,
          href: 'https://github.com/barissari',
          src: require('@/assets/icons/github.svg'),
          alt: 'github',
        },
        {
          key: 6,
          href: 'https://www.linkedin.com/in/bayram-baris-sari/',
          src: require('@/assets/icons/linkedin.svg'),
          alt: 'linkedin',
        },
        {
          key: 7,
          href: 'https://stackoverflow.com/users/9686506/baris',
          src: require('@/assets/icons/stackoverflow.svg'),
          alt: 'stackoverflow',
        },
      ]
    }
  },
  methods: {},
}
</script>

<style lang="scss">
.author {
  margin: 0 auto;
  max-width: 800px;
  text-align: center;
  padding: 0;

  &__icons img {
    width: 56.7px;
    height: 56.7px;
  }

  & h1 {
    font-size: 2.5rem;
  }

  & h2 {
    font-size: 1.5rem;
    font-style: italic;
    font-weight: 300;
  }

  & h3 {
    margin: 1.75rem 0 1rem;
  }

  & a {
    margin-right: 10px;
  }

}

.author .profile {
  border-radius: 50%;
}

// Make  things smaller for mobile
@media screen and (max-width: 650px) {
  .author {
    & h1 {
      font-size: 2rem;
    }

    & h2 {
      font-size: 1.25rem;
    }

    & .profile {
      height: 150px;
      width: 150px;
    }
  }
}
</style>