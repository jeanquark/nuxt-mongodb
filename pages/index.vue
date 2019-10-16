<template>
    <div class="container">
        <div>
            <logo />
            <h1 class="title">
                nuxt-mongodb
            </h1>
            <h2 class="subtitle">
                My wonderful Nuxt.js project
            </h2>
            <div class="links">
                <nuxt-link to="/about">About</nuxt-link>
                <button @click="getUsers()">Get Users</button>
                <button @click="getUser(1)">Get User</button>
                <button @click="getAllArticles()">Get all articles</button>
                <button @click="getArticle('5da5f4770e2b4326446a3bf5')">Get one particular article</button>
            </div>
            <div>
                Articles: {{ articles }}<br /><br />
                Article: {{ article }}<br /><br />
            </div>
            
            <table>
                <tr>
                    <th>N°</th>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Content</th>
                    <th>Actions</th>
                </tr>
                <tr v-for="(article, index) in articles" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ article._id }}</td>
                    <td><nuxt-link :to="`/articles/${article.slug}`">{{ article.title }}</nuxt-link></td>
                    <td>{{ article.content }}</td>
                    <td>
                        <button @click="updateArticle(article._id)">&#9998;</button>
                        <button @click="deleteArticle(article._id)">&#9587;</button>
                    </td>
                </tr>
            </table>

            <form>
                <h3>Create new article</h3>
                <label for="title">Title</label>
                <input type="text" name="title" v-model="form.title">
                <label for="content">Content</label>
                <input type="textarea" name="content" v-model="form.content">
                <input type="submit" value="Create" @click.prevent="createArticle">
            </form>
        </div>
    </div>
</template>

<script>
    import Logo from '~/components/Logo.vue'
    import axios from 'axios'
    export default {
        components: {
            Logo
        },
        data () {
            return {
                articles: [],
                article: {},
                form: {
                    title: '',
                    content: ''
                }
            }
        },
        async created () {

        },
        computed: {
            
        },
        methods: {
            async getUsers() {
                let { data } = await axios.get('/api/users')
                console.log('users: ', data)
            },
            async getUser(id) {
                let { data } = await axios.get(`/api/users/${id}`)
                console.log('user: ', data)
            },
            async getAllArticles() {
                try {
                    const articles = await axios.get('/api/articles')
                    console.log('articles: ', articles)
                    this.articles = articles.data
                } catch (error) {
                    console.log('error: ', error)
                }
            },
            // async getArticle(slug) {
            //     const article = await axios.get(`/api/articles/${id}`)
            //     console.log('article: ', article)
            // },
            // async createArticle(data) {
            //     const article = await axios.post('/api/article/create', { article: data })
            //     console.log('article: ', article)
            // },
            async createArticle () {
                try {
                    await axios.post('/api/article', { payload: this.form })
                    alert('Article was created successfully!')
                } catch (error) {
                    alert('Sorry, an error occured.')
                }
            },
            async updateArticle(id, payload) {
                try {
                    await axios.put('/api/article', { id, payload: this.form })
                    alert('Article was updated successfully!')
                } catch(error) {
                    alert('Sorry, an error occured.')
                }
            },
            async deleteArticle(id) {
                try {
                    await axios.delete('/api/article', { id })
                    alert('Article was deleted successfully!')
                } catch(error) {
                    alert('Sorry, an error occured.')
                }
            }
        }
    }
</script>

<style scoped>
    table, th, td {
        border: 1px solid black;
    }
</style>