const mongoose = require("mongoose");

module.exports = function(){
    return mongoose.createConnection("10.35.167.88","meitu");
};