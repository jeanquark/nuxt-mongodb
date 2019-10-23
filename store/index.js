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

    }
}

export const getters = {
    loading (state) {
        return state.loading
    }
}
