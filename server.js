const express = require('express');
const app = express();
const path = require('path');
const port = 8080;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const {MongoClient} = require('mongodb');
const { ALL } = require('dns');
//conn bd (arrumar pra maquina externa)
const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url);
async function query(){
try {
    const conn = await client.connect();
   const db = await conn.db('chess');
   const coll = await db.collection('logInfo');
   const result = await coll.find().toArray();
   console.log(result);
   conn.close();
   return result;
} catch (err){(console.log(err))};
return;
}
async function login(obj, ojb){
    try {const conn = await client.connect();
        const db = await conn.db('chess');
        const coll = await db.collection('logInfo');
        const result = await coll.find({"user":'${obj}',"passw":'${ojb}'}).toArray();
        conn.close();
        if(result !== undefined){
            return 'true'
        }else{return 'false'}
    } catch (err){(console.log(err))};
    return;
}
//css include
app.use('/static', express.static('static'));
//routes
app.get('/', (req, res)=>{
    res.render('index.ejs',
        {log:'false'}
    );
})
//retirar
app.get('/query', async (req, res)=>{
    const result = await query();
    res.send(result);
})
app.post('/LOG', async(req, res)=>{
   // let obj = req.body.username;
    //let ojb = req.body.password;
    try {
        const {user} = req.body;
    const {passw} = req.body;
    const {authorization} = req.headers;
    const result = await login(user, passw);
    if(result === 'true'){
        console.log('true');
        return res.render('index.ejs',{log:'true'})
    }else{
        console.log("nan")
        return res.render('index.ejs',{log:'nan'})
    }
    } catch (err){(console.log(err))};
    return; 
})
app.get('/logsign/views/style.css', (req, res)=>
{
    res.set('content-type', 'text/css');
    res.sendFile(path.join(__dirname, '/views/style.css'))
})
//end routes

app.listen(port, ()=>{
    console.log(`api listening on port ${port}`)
})