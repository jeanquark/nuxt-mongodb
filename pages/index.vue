<template>
    <div class="container">
        <div>
            <h1>RESTful Blog with Nuxt.js & MongoDB</h1>
            <img src="/img/nuxt.png" width="100" />
            <img src="/img/mongodb.png" width="100" />
            <div class="links">
                <nuxt-link to="/about">About</nuxt-link>
                <button @click="getUsers()">Get Users</button>
                <button @click="getUser(1)">Get User</button>
                <button @click="getAllPosts()">Get all posts</button>
                <button @click="getArticle('5da5f4770e2b4326446a3bf5')">Get one particular article</button>
            </div>
            <div>
                <!-- <p>Articles: {{ articles }}</p><br /><br /> -->
                <!-- <p>Article: {{ article }}</p><br /><br /> -->
                <p>Posts: {{ posts }}</p><br /><br />
            </div>
            
            <table>
                <tr>
                    <th>N°</th>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Content</th>
                    <th>Actions</th>
                </tr>
                <tr v-for="(post, index) in posts" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ post._id }}</td>
                    <!-- <td><nuxt-link :to="`/posts/${post.slug}`"><input type="text" value="post.title"></nuxt-link></td> -->
                    <td><input type="text" v-model="posts[index].title"></td>
                    <td><input type="text" v-model="posts[index].content"></td>
                    <td>
                        <button @click.prevent="updatePost(post._id, index)">&#9998;</button>
                        <button @click.prevent="deletePost(post._id)">&#9587;</button>
                    </td>
                </tr>
            </table>
            
            <br /><br />
            <form>
                <h3>Create a new post</h3>
                <label for="title">Title</label>
                <input type="text" name="title" v-model="form.title">
                <label for="content">Content</label>
                <input type="textarea" name="content" v-model="form.content">
                <input type="submit" value="Create" @click.prevent="createPost">
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data () {
            return {
                articles: [],
                article: {},
                posts: [],
                post: {},
                form: {
                    title: '',
                    content: ''
                }
            }
        },
        async created () {
            // this.getAllPosts()
        },
        computed: {
            
        },
        methods: {
            // async getUsers() {
            //     let { data } = await axios.get('/api/users')
            //     console.log('users: ', data)
            // },
            // async getUser(id) {
            //     let { data } = await axios.get(`/api/users/${id}`)
            //     console.log('user: ', data)
            // },
            async getAllPosts() {
                try {
                    const posts = await axios.get('/api/posts')
                    console.log('posts: ', posts)
                    this.posts = posts.data
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
            async createPost () {
                try {
                    await axios.post('/api/post', { payload: this.form })
                    this.getAllPosts()
                    alert('Post was created successfully!')
                } catch (error) {
                    alert('Sorry, an error occured.')
                }
            },
            async updatePost(id, index) {
                try {
                    console.log('id: ', id)
                    console.log('index: ', index)
                    await axios.put('/api/post', { id, newPost: this.posts[index] })
                    alert('Post was updated successfully!')
                } catch(error) {
                    alert('Sorry, an error occured.')
                }
            },
            async deletePost(id) {
                try {
                    console.log('id: ', id)
                    await axios.delete('/api/post', { params: { id }})
                    // await axios.delete(`/api/post/${id}`)
                    this.getAllPosts()
                    alert('Post was deleted successfully!')
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