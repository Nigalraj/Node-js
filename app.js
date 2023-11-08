const express = require('express')
const mysql = require('mysql2')
const app = express();
app.use(express.json())

const con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'9361',
    database:'newdb'
})

con.connect((err)=>{
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log('connected !!');
    }
})

app.get('/post',(req,res)=>{
    con.query('select * from mytable',(err,result)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
    })
})

app.put('/update/:id',(req,res)=>{
    const id = req.params.id;
    const name = req.body.name;
    const mark = req.body.mark;
    con.query('UPDATE mytable SET name=?,mark=? WHERE id=?',[name,mark,id],(err,result)=>{
        console.log(result);
        if(err){
            console.log(err);
        }
        else{
            if(result.affectedRows==0){
                console.log("not update");
            }
            else{
                res.send("Updated");
            }
        }
    })
})

app.get('/fetchdata/:id',(req,res)=>{
    const id= req.params.id;
    console.log(id);
    con.query('select * from mytable where id=?',id,(err,result)=>{
        if(err){
            console.log("error");
            res.send(err)
        }
        else{
            res.send(result)
        }
    })
})

app.post('/post',(req,res)=>{
    const name = req.body.name;
    const id = req.body.id;
    const mark = req.body.mark;

    con.query('insert into mytable value(?,?,?)',[id,name,mark],(err,result)=>{
        if(err){
            console.log(err);
        }
        else
        {
            res.send("Posted")
        }
    })
})

app.listen(3000,(err,result)=>{
    if(err){
        console.log("Error");
    }
    else{
        console.log("server connect with 3000");
    }
})