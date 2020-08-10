const mongoose = require('mongoose');
const { json } = require('body-parser');
require('dotenv').config({path: 'variables.env'});

const searchsSchema = mongoose.Schema({
    busqueda: {
        type: String
    },
    create: {
        type: Date,
        default: Date.now()
    }
});

const SearchModel = mongoose.model('Search', searchsSchema);


const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('DB conectada');
    } catch (error) {
        console.log(error);
        process.exit(1); 
    }
}

function saveSearchTerm(term) {
    conectarDB();
    var m = SearchModel({"busqueda": term});
    m.save((e) => { console.log(e) })
}

function getSearchTerms(callback) {
    conectarDB();
    var query = SearchModel.find(function (err, result) {
        if (err) return 
        callback(result)
      });
}



module.exports = {saveSearchTerm, getSearchTerms};