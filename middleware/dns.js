export default ({ store,req }) => {
    
    //console.log('content',content.req.headers.host)
    const headers = (req && req.headers) ? Object.assign({}, req.headers) : {}
    //const xForwardedFor = headers['X-Forwarded-For']
    console.log('headers.host',headers.host)
    store.commit('SET_DNS_HOST', headers.host)
    // ...
}