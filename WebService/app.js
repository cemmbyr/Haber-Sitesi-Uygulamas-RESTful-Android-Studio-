const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

const bodyParser = require('body-parser')

app.use(express.static('./public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.post('/haber_olustur',function(req,res){
    console.log("req body  ->" + JSON.stringify(req.body));
    var haberResmi = req.body.haberresim
    var haberBaslik = req.body.haberbaslik
    var haberİcerigi = req.body.habericerigi
    var haberTuru = req.body.haberturu
    var haberYayin =new Date()
    const queryString = "INSERT INTO haber.haberler (haberResmi,haberBaslik,haberİcerik,haberTuru,haberYayinlanma) VALUES(?,?,?,?,?)"
    console.log("before db");
    getConnection().query(queryString, [haberResmi, haberBaslik, haberİcerigi, haberTuru, haberYayin,haberResimLinki],(err,results,fields)=>{
        if(err){
            console.log("fb error " + err);
            res.sendStatus(500)
            return
        }
        console.log("db success");
        var result= {
            "result":"SUCCESS"
        }
        res.send(result);
    })
})


app.post('/getNews',function(req,res){
    console.log("req body  ->" + JSON.stringify(req.body));
    var type = req.body.type
    console.log(type);
    var queryString ;
    if(type=='Genel'){
        queryString= "SELECT * from haberler"
    }
    else{
        queryString = "SELECT * from haberler where haberTuru="+mysql.escape(type)
    }
    console.log("before db");
    getConnection().query(queryString,(err,results,fields)=>{
        if(err){
            console.log("db error " + err);
            res.sendStatus(500)
            return
        }
        console.log("db success");
        var result= {
            "news":results
        }
        res.send(result);
    })
})



app.post('/increaseCountLike',function(req,res){
    console.log("req body  ->" + JSON.stringify(req.body));   
    var id = req.body.newsId
    var queryString = "UPDATE haberler set countLike=countLike+1 where haberID="+req.body.id
    console.log("queryString  ->" + queryString);
   
    console.log("before db");
    getConnection().query(queryString,(err,results,fields)=>{
        if(err){
            console.log("db error " + err);
            res.sendStatus(500)
            return
        }
        console.log("db success");
        var result= {
            "result":"SUCCESS"
        }
        res.send(result);
    })
})
app.post('/increaseCountDislike',function(req,res){
    console.log("req body  ->" + JSON.stringify(req.body));
    var id = req.body.newsId
    var queryString = "UPDATE haberler set countDisLike=countDisLike+1 where haberID="+req.body.id
    console.log("queryString  ->" + queryString);
   
    console.log("before db");
    getConnection().query(queryString,(err,results,fields)=>{
        if(err){
            console.log("db error " + err);
            res.sendStatus(500)
            return
        }
        console.log("db success");
        var result= {
            "result":"SUCCESS"
        }
        res.send(result);
    })
})

app.post('/increaseCountView',function(req,res){
    console.log("req body  ->" + JSON.stringify(req.body));
    var id = req.body.newsId
    var queryString = "UPDATE haberler set countWiew=countWiew+1 where haberID="+req.body.id
    console.log("queryString  ->" + queryString);
   
    console.log("before db");
    getConnection().query(queryString,(err,results,fields)=>{
        if(err){
            console.log("db error " + err);
            res.sendStatus(500)
            return
        }
        console.log("db success");
        var result= {
            "result":"SUCCESS"
        }
        res.send(result);
    })
})


function getConnection(){
    return mysql.createConnection({
        host:'localhost',
        user:'root',
        database:'haber'
    })
}

app.use(morgan('short'))

app.get("/",(req,res)=>{
    const connection = getConnection();
    const queryString="SELECT * FROM haberler"
    connection.query(queryString,(err,rows,fields)=>{
        if(err){
            res.sendStatus(500)
            return
        }
        res.json(rows);
    })

})

app.listen(3003,()=>{
    console.log("Server 3003")
})

