<template>
    <div class="container">
        <div>
            <h1 class="title">RESTful Todo list with Nuxt.js & MongoDB</h1>
            
            <div class="text-center">
                <img src="/img/nuxt.png" width="100" />
                <img src="/img/mongodb.png" width="100" />
            </div>

            <h4>Nice move Jean-Marc, but how about authentication? &#128534; <span style="color: grey;">Check out this example for integration with Passport.js.</span></h4>
            <h4>Cool, but yuck this hurts my eyes! &#128556; <span style="color: grey;">See how adding Tailwind CSS can dramatically improve rendering.</span></h4>
            <h4>Yeah... interesting, but you know, I'm more of a graphql type of guy! &#128563; <span style="color: grey;">Have a look at this Apollo example.</span></h4>
            <h4>So you want me to deal with mongoDB internal intricacies? No thanks! &#128552; <span style="color: grey;">Go serverless with MongoDB Stitch.</span></h4>
            <h4>If it ain't Google, I'm not going! &#128695; <span style="color: grey;">Firebase can do the job, too.</span></h4>

            <p>https://sabe.io/tutorials/getting-started-with-vuex</p>
            <div>
                <nuxt-link to="/about">About</nuxt-link>
                <!-- <button @click="getUsers()">Get Users</button> -->
                <!-- <button @click="getUser(1)">Get User</button> -->
                <!-- <button @click="getAllPosts()">Get all posts</button> -->
                <!-- <button @click="getArticle('5da5f4770e2b4326446a3bf5')">Get one particular article</button> -->
                <button @click="getTasks()">Get all tasks</button>
            </div>
            
            <br /><br />

            <h3>Instructions:</h3>
            Click to toggle "completed" status<br />
            Double click to delete

            <br /><br />
            
            <form @submit.prevent="createTask">
                <input type="textarea" name="content" placeholder="Enter a new task" v-model="form.content">
            </form>
            <ul>
                <li v-for="(task, index) in tasks" :key="index" class="task" :class="{completed: task.completed}" @click="toggleTask(task._id)" @dblclick="deleteTask(task._id)">{{ task.content }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                form: {
                    title: '',
                    content: ''
                }
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
            async getTasks() {
                try {
                    await this.$store.dispatch('tasks/fetchTasks')
                } catch (error) {
                    console.error(error)
                    alert('Sorry, an error occured while trying to retrieve tasks.')
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
            }
        }
    }
</script>

<style scoped>
    .container {
        margin: auto;
        width: 80%;
    }
    .text-center {
        text-align: center;
    }
    .title {
        text-align: center;
        margin: 10px 0;
    }
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