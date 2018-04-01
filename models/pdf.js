var mongoose = require('mongoose');

var pdfSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name cannot be blank!'
    },
    opt_status: {
        type: Boolean,
        default: false
    },
    created_date:{
        type: Date,
        default: Date.now
    },
    file_path: {
        type: String,
        // default: '/public/uploads/'
    },
    size: {
        type:Number,
        // default : 123456
    },
    IP:{
        type: String
    }
    
});

var Pdf = mongoose.model('Pdf', pdfSchema);

module.exports = Pdf;

 