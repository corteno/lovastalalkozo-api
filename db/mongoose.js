var mongoose = require('mongoose');

mongoose.Promise = require('promise');
mongoose.connect('mongodb://lovastalalkozo:lovasijasz2017@ds131061.mlab.com:31061/lovastalalkozo', {
    useMongoClient: true
});

module.exports = {mongoose};