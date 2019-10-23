<template>
    <div class="container">
        <div>
            <h1>RESTful Todo list with Nuxt.js & MongoDB</h1>
            
            <img src="/img/nuxt.png" width="100" />
            <img src="/img/mongodb.png" width="100" />

            <h4>Nice move Jean-Marc, but how about authentication? &#128534; <span style="color: grey;">Check out this example for integration with Passport.js.</span></h4>
            <h4>Cool, but yuck this hurts my eyes! &#128556; <span style="color: grey;">See how adding Tailwind CSS can dramatically improve rendering.</span></h4>
            <h4>Yeah... interesting, but you know, I'm more of a graphql type of guy! &#128563; <span style="color: grey;">Have a look at this Apollo example.</span></h4>
            <h4>So you want me to deal with mongoDB internal intricacies? No thanks! &#128552; <span style="color: grey;">Go serverless with MongoDB Stitch.</span></h4>
            <h4>If it ain't Google, I'm not going! &#128695; <span style="color: grey;">Firebase can do the job, too.</span></h4>

            <p>https://sabe.io/tutorials/getting-started-with-vuex</p>
            <div class="links">
                <nuxt-link to="/about">About</nuxt-link>
                <!-- <button @click="getUsers()">Get Users</button> -->
                <!-- <button @click="getUser(1)">Get User</button> -->
                <!-- <button @click="getAllPosts()">Get all posts</button> -->
                <!-- <button @click="getArticle('5da5f4770e2b4326446a3bf5')">Get one particular article</button> -->
                <button @click="getAllTasks()">Get all tasks</button>
            </div>
            <div>
                <!-- <p>Articles: {{ articles }}</p><br /><br /> -->
                <!-- <p>Article: {{ article }}</p><br /><br /> -->
                <p>Posts: {{ posts }}</p><br /><br />
                <p>Tasks: {{ tasks }}</p><br /><br />
            </div>
            
            <!--<table>
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
                    <td><nuxt-link :to="`/posts/${post.slug}`"><input type="text" value="post.title"></nuxt-link></td>
                    <td><input type="text" v-model="posts[index].title"></td>
                    <td><input type="text" v-model="posts[index].content"></td>
                    <td>
                        <button @click.prevent="updatePost(post._id, index)">&#9998;</button>
                        <button @click.prevent="deletePost(post._id)">&#9587;</button>
                    </td>
                </tr>
            </table>-->
            
            <br /><br />
            <!-- <form>
                <h3>Create a new post</h3>
                <label for="title">Title</label>
                <input type="text" name="title" v-model="form.title">
                <label for="content">Content</label>
                <input type="textarea" name="content" v-model="form.content">
                <input type="submit" value="Create" @click.prevent="createPost">
            </form> -->
            
            <!-- <table>
                <tr>
                    <th>N°</th>
                    <th>ID</th>
                    <th>Content</th>
                    <th>Completed</th>
                    <th>Actions</th>
                </tr>
                <tr v-for="(task, index) in tasks" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ task._id }}</td>
                    <td><input type="text" v-model="tasks[index].content"></td>
                    <td><input type="checkbox" name="completed" v-model="tasks[index].completed" @click.stop="updateTask(task._id, index)"></td>
                    <td>
                        <button @click="updateTask(task._id, index)" v-if="!task.completed">Mark as complete &#10004;</button>
                        <button @click="updateTask(task._id, index)" v-else>Mark as incomplete &#9744;</button>
                        <button @click.prevent="updateTask(task._id, index)">&#9998;</button>
                        <button @click="deleteTask(task._id, index)">&#9587;</button>
                    </td>
                </tr>
            </table> -->

            <h3>Instructions:</h3>
            Click to toggle complete state<br />
            Double click to delete

            <br /><br />
            
            <form @submit.prevent="createTask">
                <input type="textarea" name="content" placeholder="Enter a new task" v-model="form.content">
            </form>
            <ul>
                <li v-for="(task, index) in tasks" :key="index" class="task" :class="{completed: task.completed}" @click="toggleTask(task._id)" @dblclick="deleteTask(task._id)">{{ task.content }}</li>
            </ul>
            <br /><br />
            <!-- <form>
                <h3>Create a new task</h3>
                <label for="content">Content</label>
                <input type="textarea" name="content" v-model="form.content">
                <input type="submit" value="Create" @click.prevent="createTask">
            </form> -->
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
                },
            }
        },
        async created () {
            // this.getAllPosts()
            // this.$store.dispatch('tasks/fetchTasks')
        },
        computed: {
            tasks () {
                return this.$store.getters['tasks/loadedTasks']
            }
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
            async getAllTasks() {
                try {
                    await this.$store.dispatch('tasks/fetchTasks')
                } catch (error) {
                    console.error(error)
                    alert('Sorry, an error occured while trying to retrieve tasks.')
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
            async createTask () {
                try {
                    await this.$store.dispatch('tasks/createTask', { payload: this.form })
                    // alert('Task was created successfully!')
                } catch (error) {
                    console.error('error: ', error)
                    alert('Sorry, an error occured while trying to create a new task.')
                }
            },
            async toggleTask(id) {
                try {
                    console.log('id: ', id)
                    // console.log('index: ', index)
                    // await axios.put('/api/task', { id, newTask: this.tasks[index] })
                    await this.$store.dispatch('tasks/toggleTask', id)
                    // alert('Task was updated successfully!')
                } catch(error) {
                    console.error(error)
                    alert('Sorry, an error occured.')
                }
            },
            async updateTask(id, index) {
                try {
                    console.log('id: ', id)
                    console.log('index: ', index)
                    await this.$store.dispatch('tasks/updateTask', { id, newTask: this.tasks[index] })
                    alert('Task was updated successfully!')
                } catch(error) {
                    console.error(error)
                    alert('Sorry, an error occured while trying to update a task.')
                }
            },
            async deleteTask(id) {
                try {
                    console.log('id: ', id)
                    // await axios.delete('/api/task', { params: { id }})
                    await this.$store.dispatch('tasks/deleteTask', { id })
                    // alert('Task was deleted successfully!')
                } catch(error) {
                    console.error(error)
                    alert('Sorry, an error occured while trying to delete a task.')
                }
            },
            // async updatePost(id, index) {
            //     try {
            //         console.log('id: ', id)
            //         console.log('index: ', index)
            //         await axios.put('/api/post', { id, newPost: this.posts[index] })
            //         alert('Post was updated successfully!')
            //     } catch(error) {
            //         alert('Sorry, an error occured.')
            //     }
            // },
            // async deletePost(id) {
            //     try {
            //         console.log('id: ', id)
            //         await axios.delete('/api/post', { params: { id }})
            //         // await axios.delete(`/api/post/${id}`)
            //         this.getAllPosts()
            //         alert('Post was deleted successfully!')
            //     } catch(error) {
            //         alert('Sorry, an error occured.')
            //     }
            // }
        }
    }
</script>

<style scoped>
    table, th, td {
        border: 1px solid black;
    }
    .task:hover {
        cursor: pointer;
    }
    .completed {
        text-decoration: line-through;
    }
</style>