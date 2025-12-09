const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 3000;

const uri = "mongodb+srv://simpleuser:LyR1SFn7d2zTgXTU@cluster0.5jen92b.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        console.log("Connected to MongoDB successfully");

        // const database = client.db("userdb");
        // const usersCollection = database.collection("users");
        const usersCollection = client.db("userdb").collection("users");

        app.get('/users', async (req, res) =>{
            const cursor = usersCollection.find({});
            const users = await cursor.toArray();
            res.send(users);
        })

        app.get('/users/:id', async (req, res) =>{
            const id = req.params.id;
            const query = {_id: new ObjectId(id)}
            const user = await usersCollection.findOne(query);
            res.send(user);
        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log('New user added:', user);

            const result = await usersCollection.insertOne(user);
            res.send(result);
        })

        app.delete('/users/:id', async (req, res) =>{
            console.log(req.params.id)
            const id = req.params.id;
            // const query = { _id: new MongoClient.ObjectId(id) };
            // const result = await usersCollection.deleteOne(query);
            // res.send(result);
            const query = {_id: new ObjectId(id)}
            const result = await usersCollection.deleteOne(query);
            res.send(result);
        })





        await client.db("admin").command({ ping: 1 });

    }
    finally {

    }

}

run().catch(console.dir);


// simpleuser
// LyR1SFn7d2zTgXTU

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello Bangladesh! Welcome to Express.js server.');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

