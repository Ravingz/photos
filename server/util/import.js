const multer = require('multer')
// const upload = multer({ dest: 'uploads/'});

const storage = multer.diskStorage({
  destination: function(req, res, callback) {
    callback(null, './uploads/');
  }
  filename: function (req, res, callback) {
    callback(null, Date.now() + this.filename.originalname);
  }
});

const fileFilter = (req, res, callback) => {
  if (fileFilter.mimetype === 'image/jpg' || fileFilter.mimetype === 'image/png') {
    callback(null, true);
  } else {
    // rejects file storing
    callback(null, false);
  }
}

const upload = multer({
  sotrage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
})
/* 
    stores image in uploads folder
    using multer and creates a reference to the 
    file, 
    guidance provided by: 
    https://codeburst.io/image-uploading-using-react-and-node-to-get-the-images-up-c46ec11a7129
*/

ImageRouter.route('/uploadmulter')
  .post(upload.single('imageData'), (req, res, next) => {
    console.log(req.body);
    const newImage = new Image({
      imageName: req.body.imageName,
      imageData: req.file.path
    });

    newImage.save()
      .then((result) => {
        console.log(result);
        res.status(200).json({
          success: true,
          document: result
        });
      })
      .catch((err) => next(err));
  })

// static photo upload folder
app.use('/uploads', express.static('uploads'));
