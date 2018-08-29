import express from 'express'
import mongodb from 'mongodb'
// Create express router
const router = express.Router()
//const MongoClient = mongodb.MongoClient
//const url = 'mongodb://localhost:27017'
//const dbName = 'base'
// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
const findDocuments = function(db, table,callback) {
    // Get the documents collection
    const collection = db.collection(table);
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        callback(docs);
    });
}
var app = express()
//app.use('/api', proxy({target: 'http://127.0.0.1:3000', changeOrigin: true}));
router.use((req, res, next) => {

    Object.setPrototypeOf(req, app.request)
    Object.setPrototypeOf(res, app.response)
    req.res = res
    res.req = req
    next()
})
let accessControlAllow = (res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);
}

//GIS item
router.get('/gisItem', (req, res) => {
    accessControlAllow(res)
    console.log('gisItem api call start') 
    var base ={
        name:'基礎理論',
        lists:[{name:'瓦片地圖'},{name:'座標轉換'},{name:'DOM結構'},{name:'觸發事件'}]
    } 
    var fun = {
        name:'地圖功能',
        lists:[{name:'拖曳'},{name:'縮放'},{name:'定位'}]
    }
    var app ={
        name:'應用功能',
        lists:[{name:'貼點'},{name:'貼線'}]
    }
    res.json({list:[
                {name:'GIS',
                    lists:
                    [
                        base,fun,app
                    ]}
            ]})
    console.log('gisItem api call end')
  
})
//layout
// Add POST - /api/layout
router.post('/layout', (req, res) => {
    accessControlAllow(res)
    console.log('menuList api call start')                 
    res.json({
        list:[  {name:'layoutA'}

    ]})
    console.log('menuList api call end') 
    //return;
    /*if (req.body.username === 'demo' && req.body.password === 'demo') {
        req.session.authUser = { username: 'demo' }
        return res.json({ username: 'demo' })
    }
    res.status(401).json({ message: 'Bad credentials' })   */
})
//menuList
// Add POST - /api/menuList
router.post('/menuList', (req, res) => {
    accessControlAllow(res)
    console.log('menuList api call start')
    res.json({})
    console.log('menuList api call end')
  
})
//menuList
// Add POST - /api/homeData
router.post('/homeData', (req, res) => {
    accessControlAllow(res)
    console.log('homeData api call start')                 
    res.json({list:[]})
    console.log('homeData api call end') 
})
//AboutData
// Add POST - /api/AboutData
router.post('/aboutData', (req, res) => {
    console.log('AboutData api call start')       
    accessControlAllow(res)
    let base = {name:'base',list:[ ]} 
    let item = {name:'item',list:[ ]}
    let mode = {name:'mode',list:[ ]}          
    res.json({})
    console.log('AboutData api call end') 
   
})
 //prodect
// Add POST - /api/prodect
router.post('/prodectData', (req, res) => {
    accessControlAllow(res)
    console.log('prodectData api call start') 
    res.json({list:[]})
    console.log('prodectData api call end') 
})

router.post('/serviceData', (req, res) => {
    accessControlAllow(res)
    console.log('serviceData api call start') 
    res.json({list:[]})
    console.log('serviceData api call end') 
})
// Export the server middleware
export default {
    path: '/api',
    handler: router
}
