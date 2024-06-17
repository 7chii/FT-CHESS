const express = require('express');
const app = express();
const path = require('path');
const sql = require('mysql');
const port = 8080;
//conn bd (arrumar pra maquina externa)

/*const bd = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "chess"
});

//aumentar limite de json recebido/mandado(para passar base64)
app.use(express.json({ limit: '50mb' }));
*/

//css include
app.use('/static', express.static('static'));
//routes
app.get('/', (req, res)=>{
    res.render('index.ejs');
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