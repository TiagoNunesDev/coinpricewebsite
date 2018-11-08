const express = require('express');
const mysql = require('mysql');

const db = mysql.createConnection({
    host : 'localhost',
    user:  'root',
    password: '177he2qg',
    database: 'nodemysql'
});

db.connect((err) => {
    if(err) throw err;
    console.log('My sql connected')
})



const app = express();

app.get('/getData',(req, res)=>{
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql,(err,results) => {
       if(err) throw err;
       console.log(results);
       res.json(results);
    });
});


app.get('/getVotes' , (req,res) =>{
    let sql = 'SELECT * FROM votes Order by votes desc LIMIT 5';
    db.query(sql,(err,results) => {
        if(err) throw  err;
        res.json(results);
    });
});


// app.get('/api/customers', (req,res) => {
//     const customers = [
//         {id:1, firstName:'John', lastName: 'Doe'},
//         {id:2, firstName:'John', lastName: 'Doe'},
//         {id:3, firstName:'John', lastName: 'Doe'}
//     ];
//     res.json(customers);
// });

const port = 5000;

app.listen(port, () => console.log('Server started on port ${port}'));