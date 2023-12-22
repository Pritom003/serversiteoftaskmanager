const express = require('express');
const cors = require('cors');
require('dotenv').config()

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
// app.use(cors())

      
app.use(cors());





// const uri = "mongodb+srv://<username>:<password>@cluster0.ucoarqa.mongodb.net/?retryWrites=true&w=majority";
const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ucoarqa.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const dbConnect = async () => {
  try {
      // client.connect()
      console.log('DB Connected Successfully✅')
  } catch (error) {
      console.log(error.name, error.message)
  }
}
dbConnect()




const AllTaskcollection=client.db('TaskmanmgementDB').collection('alltasks')







app.post('/alltask',async(req,res)=>{
  const newtask=req.body
  const result=await AllTaskcollection.insertOne(newtask)
  res.send(result)
})




app.get('/alltask',async (req,res)=>{

  const cursor =AllTaskcollection.find()
  const result= await cursor.toArray()
  res.send(result);
  
  
  })






  app.delete('/alltask/:_id', async (req, res) => {
    const _id = req.params._id;
    console.log('id from deleterev', _id);
    const query = { _id: new ObjectId(_id) };
    const result = await AllTaskcollection.deleteOne(query);
    res.send(result);
  });
  






app.get('/', (req, res) =>{
  res.send('taskmanager is is workign')
})
app.listen(port, () =>{
  console.log(`task magager server is running on port: ${port}`);
})