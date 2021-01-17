<template>
  <div id="app">

    <header class="header">
      <div class="header__left">
        <ErasmusLeft v-if="showLogo" />
        <TechLeft v-if="showTech" />
        <MainLeft v-if="showMain" />
      </div>

      <div class="header__right">
        <ToggleTheme />
      </div>
    </header>

    <main class="main">
      <slot/>
    </main>

    <footer class="footer">
      <span class="footer__copyright">Copyright © {{ new Date().getFullYear() }}. </span>
    </footer>

  </div>
</template>

<script>
import ErasmusLeft from '~/components/ErasmusLeft.vue';
import TechLeft from '~/components/TechLeft.vue';
import MainLeft from '~/components/MainLeft.vue';
import ToggleTheme from '~/components/ToggleTheme.vue';

export default {
  props: {
    showLogo: { default: true },
    showMain: { default: false },
    showTech: { default: false },
  },
  components: {
    ErasmusLeft,
    TechLeft,
    MainLeft,
    ToggleTheme,
  },
};
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: var(--header-height);
  padding: 0 calc(var(--space) / 2);
  top:0;
  z-index: 10;

  &__left,
  &__right {
    display: flex;
    align-items: center;
  }

  @media screen and (min-width: 1300px) {
    //Make header sticky for large screens
    position: sticky;
    width: 100%;
  }
}

.main {
  margin: 0 auto;
  padding: 1.5vw 15px 0;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: calc(var(--space) / 2);
  text-align: center;
  font-size: .8em;

  > span {
    margin: 0 .35em;
  }

  a {
    color: currentColor;
  }
}
</style>
