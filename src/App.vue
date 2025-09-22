<template>
  <div
    id="app"
    :data-theme="theme"
  >
    <header class="header">
      <div class="header__left">
        <router-link
          v-if="isInTechPost"
          to="/tech-blog"
          class="return-btn"
        >
          ← Back to Tech Blog
        </router-link>
        <router-link
          v-else-if="isInTravelPost"
          to="/travels-blog"
          class="return-btn"
        >
          ← Back to Travels Blog
        </router-link>
        <router-link
          v-else-if="!showMain"
          to="/"
          class="return-btn"
        >
          ← Back to Homepage
        </router-link>
        <NavigationLeft
          v-if="showLogo"
          type="travels"
        />
        <NavigationLeft
          v-if="showTech"
          type="tech"
        />
        <MainLeft v-if="showMain" />
      </div>

      <div class="header__right">
        <ToggleTheme
          :is-dark="isDark"
          @toggle-theme="toggleTheme"
        />
      </div>
    </header>

    <main class="main">
      <router-view />
    </main>

    <footer class="footer">
      <span class="footer__copyright">Copyright © {{ new Date().getFullYear() }}. </span>
    </footer>
    
    <ErrorNotification />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import NavigationLeft from './components/NavigationLeft.vue'
import MainLeft from './components/MainLeft.vue'
import ToggleTheme from './components/ToggleTheme.vue'
import ErrorNotification from './components/ErrorNotification.vue'
import { ErrorHandler } from './utils/errorHandler'

const route = useRoute()
const theme = ref(localStorage.getItem('theme') || 'light')
const isDark = ref(theme.value === 'dark')

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  isDark.value = theme.value === 'dark'
  localStorage.setItem('theme', theme.value)
  
  // Apply theme to body and html
  document.body.setAttribute('data-theme', theme.value)
  document.documentElement.setAttribute('data-theme', theme.value)
  
  // Force update background colors
  const bgColor = theme.value === 'dark' ? '#0D2538' : '#F3F7F9'
  document.documentElement.style.backgroundColor = bgColor
  document.body.style.backgroundColor = bgColor
  
  // Update CSS variables
  document.documentElement.style.setProperty('--bg-color', bgColor)
}

onMounted(() => {
  try {
    document.body.setAttribute('data-theme', theme.value)
    document.documentElement.setAttribute('data-theme', theme.value)
    
    // Force update background colors on mount
    const bgColor = theme.value === 'dark' ? '#0D2538' : '#F3F7F9'
    document.documentElement.style.backgroundColor = bgColor
    document.body.style.backgroundColor = bgColor
    document.documentElement.style.setProperty('--bg-color', bgColor)
  } catch (error) {
    ErrorHandler.handleAppInitializationError(error)
  }
})

const showLogo = computed(() => route.path.includes('/travels'))
const showTech = computed(() => route.path.includes('/tech'))
const showMain = computed(() => route.path === '/')
const isInTechPost = computed(() => route.path.includes('/blog/tech/'))
const isInTravelPost = computed(() => route.path.includes('/blog/travels/'))
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

// CSS Variables
:root {
  --base-font-size: 20px;
  --caption-font-size: 17px;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
  --bg-color: #F3F7F9;
  --bg-content-color: #fff;
  --bg-code: #fffbf3;
  --body-color: #444;
  --title-color: #323232;
  --link-color: #444;
  --border-color: rgba(0, 0, 0, .1);
  --space: 3.5rem;
  --content-width: 860px;
  --header-height: 80px;
  --radius: 5px;
  --padding: 15px;
}

body[data-theme="dark"] {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
  --bg-color: #0D2538;
  --bg-content-color: #0f2d44;
  --bg-code: rgba(0, 0, 0, .3);
  --border-color: rgba(255, 255, 255, .1);
  --body-color: #ced8de;
  --title-color: #fff;
  --link-color: #ced8de;
}

@media screen and (max-width: 650px) {
  :root {
    --base-font-size: 17px;
    --caption-font-size: 14px;
  }
  body {
    --space: 1.5rem;
    --header-height: 60px;
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Global link styling - override Bootstrap */
a, a:link, a:visited, a:hover, a:active, a:focus {
  color: var(--link-color) !important;
  text-decoration: none !important;
  transition: opacity 0.2s ease;
}

a:hover {
  opacity: 0.7 !important;
  text-decoration: none !important;
  color: var(--link-color) !important;
}

html {
  font-size: var(--base-font-size);
  scroll-behavior: smooth;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: var(--body-color);
  background-color: var(--bg-color);
  transition: background-color 0.3s ease, color 0.3s ease;
}

html {
  background-color: var(--bg-color);
  transition: background-color 0.3s ease;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: var(--header-height);
  padding: 0 calc(var(--space) / 2);
  top: 0;
  z-index: 10;
  transition: background-color 0.3s ease;

  &__left,
  &__right {
    display: flex;
    align-items: center;
  }

  @media screen and (min-width: 1300px) {
    position: sticky;
    width: 100%;
  }
}

.return-btn {
  display: inline-block;
  padding: 0.5rem 0;
  background-color: transparent;
  color: var(--body-color);
  text-decoration: none;
  transition: color 0.2s ease;
  margin-right: 1rem;
  
  &:hover {
    opacity: 0.7;
    text-decoration: none;
  }
}

.main {
  flex: 1;
  margin: 0 auto;
  padding: 1.5vw 15px 2rem;
  max-width: var(--content-width);
  width: 100%;
  min-height: calc(100vh - var(--header-height) - 100px);
}

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: calc(var(--space) / 2);
  text-align: center;
  font-size: 0.8em;
  margin-top: auto;
  background-color: var(--bg-color);
  border-top: 1px solid var(--border-color);
  position: relative;
  z-index: 1;

  > span {
    margin: 0 0.35em;
  }

  &__copyright {
    color: var(--body-color);
    opacity: 0.8;
  }

  a {
    color: var(--link-color);
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

// Typography
h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 0.5rem;
  color: var(--title-color);
}

h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.75rem; }
h4 { font-size: 1.5rem; }
h5 { font-size: 1.25rem; }
h6 { font-size: 1rem; }

p {
  margin-bottom: 1rem;
  color: var(--body-color);
}


// Code styling
code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9em;
  background-color: var(--bg-code);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  color: var(--body-color);
}

pre {
  background-color: var(--bg-code);
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1rem 0;

  code {
    background: none;
    padding: 0;
  }
}

// Blockquotes
blockquote {
  border-left: 4px solid var(--link-color);
  padding-left: 1rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: var(--body-color);
}

// Images
img {
  max-width: 100%;
  height: auto;
}

// Lists
ul, ol {
  margin-bottom: 1rem;
  padding-left: 2rem;
}

li {
  margin-bottom: 0.25rem;
  color: var(--body-color);
}

// Tables
table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

th {
  font-weight: 600;
  background-color: var(--bg-code);
  color: var(--title-color);
}

td {
  color: var(--body-color);
}

// Responsive design
@media (max-width: 768px) {
  html {
    font-size: var(--caption-font-size);
  }

  h1 { font-size: 2rem; }
  h2 { font-size: 1.75rem; }
  h3 { font-size: 1.5rem; }
  h4 { font-size: 1.25rem; }
  h5 { font-size: 1.125rem; }
  h6 { font-size: 1rem; }
}
</style>