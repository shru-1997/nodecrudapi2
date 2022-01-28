const express = require('express')

const bodyParser = require('body-parser')

const MongoClient = require('mongodb').MongoClient

const app = express()

app.use(bodyParser.urlencoded({extended:true}))

const connectionString ="mongodb+srv://shruthireddy:shruthi1709@cluster0.6lloq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

MongoClient.connect(connectionString,{useUnifiedTopology:true})
 .then(client =>{
     console.log('connected to database server')

     const db =client.db('star-war-quotes')

     const quotesCollection =db.collection('quotes')

     app.post('/quotes',(req,res)=>{
          quotesCollection.insertOne(req.body)
          .then(result=>{
              res.send(result)
          })

          .catch(error=>res.send(error))
        })
    
     app.get('/getall',(req,res)=>{
        quotesCollection.find().toArray()
        .then(result=>{
            res.send(result)
        })
          
         .catch(error=>res.send(error))
        })



}).catch(error=>console.error(error))

 const PORT = 3000
 app.listen(PORT, (req,res) => {
    console.log(`Server is Running on PORT: ${PORT}`)
})