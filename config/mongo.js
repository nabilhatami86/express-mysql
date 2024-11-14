const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/eduwork';
const client = new MongoClient(url);

(async()=>{
    try {
        await client.connect();
        console.log("mongodb berhasil");
    }catch(e){
        console.log(e);
    }
    
})();

const db = client.db('eduwork')
module.exports = db