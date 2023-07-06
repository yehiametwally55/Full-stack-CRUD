const express = require('express')
const app = express()
const port = 3000
const mysql = require("mysql2")
const cors = require("cors");
//create connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'crud'
  });
app.use(express.json());
app.use(cors());
app.post('/', (req,res , next) =>{
    const {name,price , description} = req.body;
    const query = `insert into products (name, price, description) values('${name}' ,' ${price}',' ${description}')`
    connection.execute(query , (err, result) =>{
        if(err){
            res.json({msg:"query error" , error:err})
        }
        console.log(result);
        result.affectedRows ? res.json({msg:"success"}): res.json({msg:"failed"})
    })
} )

app.put("/" , (req,res) =>{
    const {id , name, price , description} = req.body;
    const query = `update products set name='${name}', price='${price}', description='${description}' WHERE id = ${id}`;
    connection.execute(query , (err, result) =>{
        if(err){
            res.json({msg:"query error" , error:err})
        }
        console.log(result);
        result.affectedRows ? res.json({msg:"success"}): res.json({msg:"failed"})
    })
})
app.delete("/" , (req,res) =>{
    const {id} = req.body;
    const query = `delete from products where id = '${id}' `;
    connection.execute(query , (err, result) =>{
        if(err){
            res.json({msg:"query error" , error:err})
        }
        console.log(result);
        result.affectedRows ? res.json({msg:"success"}): res.json({msg:"failed"})
    })
})

app.get('/', (req, res) =>{
    const query = `select * from products `;
    connection.execute(query , (err, result) =>{
        if(err){
            res.json({msg:"query error" , error:err})
        }
        console.log(result);
        if(result.length){
            return res.json({msg:"success", products: result})
        }
        res.json({msg:"proucts not found"})
    })
})




app.listen(port, () => console.log(`Example app listening on port ${port}!`))