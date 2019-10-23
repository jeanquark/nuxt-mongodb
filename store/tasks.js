// export const strict = false
import axios from 'axios'

export const state = () => ({
	tasks: []
})

export const mutations = {
	setTasks (state, payload) {
		state.tasks = payload
	},
	setTask (state, payload) {
		console.log('setTask mutation called: ', payload)
		state.tasks[0] = payload
	},
	ADD_TASK (state, payload) {
		console.log('ADD_TASK mutation called: ', payload)
		state.tasks.unshift(payload)
	},
	TOGGLE_TASK (state, payload) {
		console.log('TOGGLE_TASK mutation called: ', payload)
		const task = state.tasks.find(task => task._id === payload)
		console.log('task: ', task)
		task.completed = !task.completed
	},
	REMOVE_TASK (state, payload) {
		console.log('REMOVE_TASK mutation called: ', payload)
		const index = state.tasks.findIndex(task => task._id === payload)
		state.tasks.splice(index, 1)
	}
}

export const actions = {
	async fetchTasks ({ commit }, payload) {
		try {
			// const snapshot = await firestore.collection('countries').get();
			const { data } = await axios.get('/api/tasks')
			console.log('data: ', data)
			commit('setTasks', data)

			// const countriesArray = []
			// snapshot.forEach(country => {
			// 	countriesArray.push(country.data())
			// })
			// commit('setCountries', countriesArray)
		} catch(error) {
			throw error
		}
	},
	async createTask ({ commit}, payload) {
		try {
			console.log('createTask action called: ', payload)
			const { data } = await axios.post('/api/task', payload)
			console.log('data: ', data)
			commit('ADD_TASK', data)

		} catch(error) {
			console.log('error: ', error)
			throw error
		}
	},
	async toggleTask ({ commit }, payload) {
		try {
			// const { id } = payload
			console.log('toggleTask action called: ', payload)
			await axios.put('/api/task', { id: payload })
			commit('TOGGLE_TASK', payload)
		} catch (error) {
			console.log('error: ', error)
			throw error
		}
	},
	async updateTask ({ commit }, payload) {
		try {
			console.log('updateTask action called: ', payload)
			console.log('payload: ', payload)
			const { data } = await axios.put('/api/task', payload)
			// console.log('data: ', data)
			// commit('setTask', data)
		} catch (error) {
			throw error
		}
	},
	async deleteTask ({ commit }, payload) {
		try {
			console.log('deleteTask action callded: ', payload)
			const { id } = payload
			console.log('id: ', id)
			const { data } = await axios.delete('/api/task', { params: { id } })
			console.log('data: ', data)
			commit('REMOVE_TASK', id)
		} catch (error) {
			throw error
		}
	}
}

export const getters = {
	loadedTasks (state) {
		return state.tasks
	}
}