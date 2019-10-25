<template>
	<div>
		<h1>Admin</h1>
		<nuxt-link to="/">Back to homepage</nuxt-link>
	</div>
</template>

<script>
	export default {
		middleware: ['auth']
	}
</script>

<style scoped>

</style>