<template>
	<div>
		<h2>Post</h2>

		<b>Title</b>: {{ post.title }}<br />
		<b>Content</b>: {{ post.content }}<br />
		<b>Slug</b>: {{ post.slug }}<br />

		<nuxt-link to="/">Back to homepage</nuxt-link>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		async created () {
			try {
				const postSlug = this.$route.params.slug
				console.log('postSlug: ', postSlug)
				// const data = await axios.get('/articles/dfjkdfg_dfgkldf')
				const { data } = await axios.get(`/api/posts/${postSlug}`)
				console.log('data: ', data)
				this.post = data
			} catch (error) {
				console.log('error: ', error)
			}
		},
		data () {
			return {
				post: {}
			}
		}
	}
</script>

<style scoped>

</style>