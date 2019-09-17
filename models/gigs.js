const mongoose = require('mongoose');

const gigSchema = new mongoose.Schema({
    venue: String,
    address: String,
    contact: String,
    contactInfo: String,
    pay: String,
    gigType: String
});

const Gigs = mongoose.model('Gig', gigSchema);

module.exports = Gigs;
