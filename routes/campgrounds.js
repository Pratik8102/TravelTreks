 const express=require('express');
const router= express.Router();
const campgrounds=require('../controllers/campgrounds');
const catchAsync=require('../utilis/catchAsync.js');
const{isLoggedIn,isAuthor,validateCampground}=require('../middleware');

const multer=require('multer');
const{storage}= require('../cloudinary')
const upload = multer({storage});
// const upload=multer({storage});
const Campground = require('../models/campground');


router.route('/')
        .get(catchAsync(campgrounds.index))
        .post(isLoggedIn,upload.array('image'),validateCampground, catchAsync(campgrounds.createCampground))
        // .post(upload.array('image'),(req,res)=>{
        //   console.log(req.body,req.files);
        //      res.send("IT WORKED");
        // })
        // .post(upload.array('image'),(req, res) => {
        //          console.log(req.body, req.files); 
        //          res.send("It wokred" )
        // });
        
router.get('/new',isLoggedIn,campgrounds.renderNewForm)

router.route('/:id')
        .get(catchAsync(campgrounds.showCampground))
        .put(isLoggedIn,isAuthor,upload.array('image'),validateCampground, catchAsync(campgrounds.updateCampground))
        .delete(isLoggedIn,isAuthor,catchAsync(campgrounds.deleteCampground))

  
  
router.get('/:id/edit',isLoggedIn,isAuthor,catchAsync(campgrounds.renderEditForm));



  

module.exports=router;