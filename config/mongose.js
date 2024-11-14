const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/eduwork', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

const db = mongoose.connection;

// Event listeners for the MongoDB connection
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => console.log("Database terhubung"));

db.on('disconnected', () => console.log("Database disconnected"));
db.on('reconnected', () => console.log("Database reconnected"));
