export default function ({ store, error }) {
	// if (!store.state.authUser) {
	if (!store.getters['auth/loadedAuthUser']) {

		error({
			message: 'You are not authorized',
			statusCode: 403
		})
	}
}