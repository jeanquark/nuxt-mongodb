export const strict = false

export const state = () => ({
    loading: false,
})

export const mutations = {
    setLoading (state, payload) {
        state.loading = payload
    }
}

export const actions = {
    async nuxtServerInit ({ commit, dispatch }, { req }) {
        console.log('Call to nuxtServerInit: ', req.user)
    	if (req.user) {
            console.log('commit SET_USER')
    		commit('auth/SET_USER', req.user)
    	}
    }
}

export const getters = {
    loading (state) {
        return state.loading
    }
}
