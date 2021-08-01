const { MongoClient } = require('mongodb');
let express = require('express');


// MONGODB CLOUD LINK
// USE THIS LINK IF DOCKER MONGODB CONTAINER DOES NOT WORK.
const uri = "mongodb://mongo:27017/docker-app"
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let port = process.env.PORT || 3000;
let app = express();

app.use(express.json());
app.use(express.urlencoded( { extended:false} ));


let options = {
    dotfile: 'ignore',
    extensions: ['htm','html'],
    index: 'viewall.html'
}

app.use('/', express.static('./public', options));


app.listen(port, function(){
    console.log(`listening to port ${port}`);
})


app.post('/createRect', function(req,res,next){
    // insert
    client.connect(err => {
        // perform actions on the collection object
        console.log("Connected successfully to MongoDB");
        let database = client.db('Rectdb');
        let collection = database.collection('Rectangle');
        collection.insertOne(req.body,  function(err,result){
            if(err){
                console.log(err);
            }
            client.close()

            }
        )
    })
    res.send();
})

app.post('/deleteRect', function(req,res,next){
    // insert
    client.connect(err => {
        // perform actions on the collection object
        console.log("Connected successfully to MongoDB");
        let database = client.db('Rectdb');
        let collection = database.collection('Rectangle');
        collection.deleteOne(req.body,  function(err,result){
                if(err){
                    console.log(err);
                }
                client.close()

            }
        )
    })
    res.send();
})

//reference https://docs.mongodb.com/drivers/node/v3.6/usage-examples/findOne/

async function findAll() {
    let docs = []
    try {
        await client.connect();
        let database = client.db('Rectdb');
        let collection = database.collection('Rectangle');
        // query for movies that have a runtime less than 15 minutes
        const query = {};
        const options = {
            // sort returned documents in ascending order by title (A->Z)
            sort: { _id: 1 }};
        const cursor = collection.find(query, options);
        // print a message if no documents were found
        if ((await cursor.count()) === 0) {
            console.log("No documents found!");
        }else{
            console.log("All documents found.")
        }
        // replace console.dir with your callback to access individual elements
        await cursor.forEach((doc)=>docs.push(doc));
    } finally {
        await client.close();
        return docs;
    }
}

app.post('/viewAll',function(req,res){
    findAll().then( function(r){
        res.json(r);
    });
})

async function findOne(data) {
    let docs = []
    try {
        await client.connect();
        let database = client.db('Rectdb');
        let collection = database.collection('Rectangle');
        // query for movies that have a runtime less than 15 minutes
        const query = {_id: data.id};
        const options = {
            // sort returned documents in ascending order by title (A->Z)
            sort: { _id: 1 }};
        const cursor = collection.find(query, options);
        // print a message if no documents were found
        if ((await cursor.count()) === 0) {
            console.log("No documents found!");
        }else{
            console.log("1 document found")
        }
        // replace console.dir with your callback to access individual elements
        await cursor.forEach((doc)=>docs.push(doc));
    } finally {
        await client.close();
        return docs;
    }
}

app.post('/viewOne',function(req,res){
    findOne(req.body).then( function(r){
        res.json(r);
    });
})

async function updateOne(data) {
    let status = {
        success: false
    }
    try {
        await client.connect();
        let database = client.db('Rectdb');
        let collection = database.collection('Rectangle');
        // query for movies that have a runtime less than 15 minutes
        const filter= {_id: data._id};
        const updateDoc = {
            $set: {
                width: data.width,
                height: data.height,
                colour: data.colour,
                name: data.name,
            },
        };
        // this option instructs prevents the method to create a document if no documents match the filter

        const options = { upsert: false };

        const result = await collection.updateOne(filter, updateDoc, options);

        if(result.matchedCount !== 0){
            status = {
                success: true
            }
        }
        if (result.matchedCount === 0){
            console.log('No documents updated because there is no document with the inputted Unique id');
        }else{
            console.log('Update 1 Document');
        }
    } finally {
        await client.close();
        return status;
    }
}

app.post('/updateRect',function(req,res){

    updateOne(req.body).then( function(r){
        res.json(r);
    });
})