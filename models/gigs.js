const mongoose = require('mongoose');

const gigSchema = new mongoose.Schema({
    venue: String,
    date: String,
    contact: String,
    pay: Number,
    gigLength: Number,
    travelDistance: Number,
    travelTime: Number,
    costOfGas: Number,
    milesPerGallon: Number,
    totalTime: Number,
    gasExpense: Number,
    payPerHour: Number,
    netPay: Number,
    extraneousExpenses: Number
});

const Gigs = mongoose.model('Gig', gigSchema);

module.exports = Gigs;
