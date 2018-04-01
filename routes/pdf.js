var express = require('express');
var router = express.Router();
var db = require("../models");
var multer = require('multer');
var path = require('path');
// var upload = multer({ dest: 'public/uploads/' });
var date_now = Date.now();
var storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: function(req, file, cb){
    cb(null,date_now +'-'+file.originalname +path.extname(file.originalname));
  }
});

router.get('/', function(req, res){
    db.Pdf.find()
    .then(function(pdf){
        res.json(pdf);
    })
    .catch(function(err){
        res.send(err);
    })
});

var upload = multer({
  storage: storage,
  limits:{fileSize: 26214400},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('pdfFile');

function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /pdf/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: PDF Only!');
  }
}

router.post('/', upload,function(req, res, next){
    db.Pdf.create(  
                    { "name" : req.file.originalname,
                      "IP" : req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                      "file_path" : '/public/uploads/'+ date_now +'-'+ req.file.originalname,
                      "size" : req.file.size})
                    .then(function(newPdf){
                        res.json(newPdf);
                    })
                    .catch(function(err){
                        res.send(err);
                })

});

router.delete('/:pdfId', function(req,res){
  db.Pdf.remove({_id: req.params.pdfId})
  .then(function(){
    res.json({message: 'Deleted!'});
  })
  .catch(function(err){
    res.send(err)
  })
});

module.exports = router;