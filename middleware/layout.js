export default async function ({ store, error }) {
    /*if (!store.state.authUser) {
        error({
        message: 'You are not connected',
        statusCode: 403
        })
    }*/
    //store.commit('SET_LAYOUT','followTek')
    await store.dispatch('LAYOUT')
}
