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
              console.log(result)
          })

          .catch(error=>console.log(error))
        })
    
   app.get('/getall',(req,res)=>{
      quotesCollection.find().toArray()
      .then(result=>{
          console.log(result)
      })
          
        .catch(error=>console.log(error))
       })



}).catch(console.error)

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})
 const PORT = 5000
app.listen(PORT, (req,res) => {
    console.log(`Server is Running on PORT: ${PORT}`)
})