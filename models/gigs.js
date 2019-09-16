const mongoose = require('mongoose');

const gigSchema = new mongoose.Schema({
    venue: String,
    address: String,
    contact: String,
    pay: String
});

const Gigs = mongoose.model('Gig', gigSchema);

module.exports = Gigs;
