<template>
  <span class="logo__text">
    <g-link to="/">&larr; Return to Homepage</g-link>
  </span>
</template>

<style lang="scss" scoped>
.logo {
	text-decoration: none;
  color: var(--body-color)!important;
  font-size: .9em;

	&__image {
		vertical-align: middle;
		border-radius: 99px;
		height: 40px;
		width: 40px;
		margin-right: .5em;
	}
}
a {
  color: inherit;
  text-decoration: inherit;
}
</style>
