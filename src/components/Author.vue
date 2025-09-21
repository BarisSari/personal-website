<template>
  <div class="author">
    <router-link to="/">
      <img
        src="/src/assets/profile.jpeg"
        alt="me"
        height="200"
        width="200"
        class="profile"
      >
    </router-link>

    <h1>Barış Sarı</h1>
    <div v-if="showIcons">
      <h2>
        Senior Backend Engineer at 
        <a
          href="https://feather-insurance.com"
          target="_blank"
          rel="noopener noreferrer"
          class="feather-link"
        >Feather</a>
        <br>I speak Python, TS/JS, ML/DL, SQL, Docker.
      </h2>
      <div class="author__icons">
        <div class="container">
          <div class="row social-icons-row">
            <div
              v-for="icon in topIcons"
              :key="icon.key"
              class="col-2"
            >
              <a
                :href="icon.href"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  width="56.7"
                  height="56.7"
                  :src="icon.src"
                  :alt="icon.alt"
                >
              </a>
            </div>
          </div>
        </div>
      </div>
      <hr class="blog-separator">
      <div class="author__blogs">
        <div class="container">
          <h3>Blogs</h3>
          <div class="row">
            <div
              v-for="blog in bottomData"
              :key="blog.key"
              class="col-12 col-sm-6"
            >
              <h5>{{ blog.header }}</h5>
              <div class="author__icons">
                <router-link
                  :to="blog.to"
                  class="blog"
                >
                  <img
                    width="56.7"
                    height="56.7"
                    :src="blog.src"
                    :alt="blog.alt"
                  >
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h2 v-html="siteDescription" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface IconData {
  key: number
  href: string
  src: string
  alt: string
}

interface BlogData {
  key: number
  header: string
  to: string
  src: string
  alt: string
}

defineProps<{
  showIcons?: boolean
}>()

const siteDescription = 'Personal website of a Software Developer, who loves travelling and movies a lot!'

const bottomData: BlogData[] = [
  {
    key: 1,
    header: 'Travels',
    to: '/travels-blog/',
    src: '/src/assets/icons/travelling.svg',
    alt: 'travels-blog'
  },
  {
    key: 2,
    header: 'Technology',
    to: '/tech-blog/',
    src: '/src/assets/icons/tech.svg',
    alt: 'tech-blog'
  }
]

const topIcons: IconData[] = [
  {
    key: 1,
    href: '/static/BarisSari-CV.pdf',
    src: '/src/assets/icons/cv.svg',
    alt: 'cv'
  },
  {
    key: 3,
    href: 'mailto:bayrambariss@gmail.com',
    src: '/src/assets/icons/gmail.svg',
    alt: 'gmail'
  },
  {
    key: 4,
    href: 'https://barissari.medium.com/',
    src: '/src/assets/icons/medium.svg',
    alt: 'medium'
  },
  {
    key: 5,
    href: 'https://github.com/barissari',
    src: '/src/assets/icons/github.svg',
    alt: 'github'
  },
  {
    key: 6,
    href: 'https://www.linkedin.com/in/bayram-baris-sari/',
    src: '/src/assets/icons/linkedin.svg',
    alt: 'linkedin'
  },
  {
    key: 7,
    href: 'https://stackoverflow.com/users/9686506/baris',
    src: '/src/assets/icons/stackoverflow.svg',
    alt: 'stackoverflow'
  }
]
</script>

<style lang="scss" scoped>
.author {
  margin: 0 auto;
  max-width: 800px;
  text-align: center;
  padding: 0;

  &__icons img {
    width: 56.7px;
    height: 56.7px;
    transition: transform 0.2s ease;
    
    &:hover {
      transform: scale(1.1);
    }
  }

  & h1 {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--title-color);
    letter-spacing: -0.02em;
    margin-top: 1rem;
  }

  & h2 {
    font-size: 1.5rem;
    font-style: italic;
    font-weight: 300;
    margin: 2rem 0 2rem;
    color: var(--body-color);
  }

  & h3 {
    margin: 1.75rem 0 1rem;
  }

  & a {
    margin-right: 10px;
  }

  .feather-link {
    color: var(--body-color);
    text-decoration: underline;
    font-weight: bold;
    transition: opacity 0.2s ease;
    
    &:hover {
      opacity: 0.7;
    }
  }
}

.author .profile {
  border-radius: 50%;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
}

// Utility classes
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -0.5rem;
}

.social-icons-row {
  justify-content: center;
  align-items: center;
}

.col-0 { flex: 0 0 0%; max-width: 0%; }
.col-2 { flex: 0 0 16.666667%; max-width: 16.666667%; }
.col-12 { flex: 0 0 100%; max-width: 100%; }

@media (min-width: 576px) {
  .col-sm-6 { flex: 0 0 50%; max-width: 50%; }
}

.col-0, .col-2, .col-12, .col-sm-6 {
  padding: 0 0.5rem;
}

.grey { background-color: var(--bg-code); }
.lighten-5 { background-color: var(--bg-code); }

.blog-separator {
  margin: 2rem 0;
  border: none;
  border-top: 2px solid var(--border-color);
  width: 100%;
}

// Make things smaller for mobile
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