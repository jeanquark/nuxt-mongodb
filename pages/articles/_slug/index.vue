<template>
	<div>
		<h2>Article</h2>

		<b>Title</b>: {{ article.title }}<br />
		<b>Content</b>: {{ article.content }}<br />
		<b>Slug</b>: {{ article.slug }}<br />

		<nuxt-link to="/">Back to homepage</nuxt-link>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		async created () {
			try {
				const articleSlug = this.$route.params.slug
				console.log('articleSlug: ', articleSlug)
				// const data = await axios.get('/articles/dfjkdfg_dfgkldf')
				const { data } = await axios.get(`/api/articles/${articleSlug}`)
				console.log('data: ', data)
				this.article = data
			} catch (error) {
				console.log('error: ', error)
			}
		},
		data () {
			return {
				article: {}
			}
		}
	}
</script>

<style scoped>

</style>