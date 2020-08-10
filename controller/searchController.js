const Searchs = require('../models/searchs')

exports.createSearch = async (req, res) => {
    try {
        //create new search
        const search = new Searchs(req.body);
        search.save();
        res.json(search);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}