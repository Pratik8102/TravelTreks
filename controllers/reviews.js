const Campground = require('../models/campground');
const Review=require('../models/review');



module.exports.createReview=async(req,res)=>{
    console.log(req.body);
    const campground=await Campground.findById(req.params.id);
    const review= new Review(req.body.review);
    review.author=req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    console.log("hello");
    req.flash('success','Created new review!');
    res.redirect(`/campgrounds/${campground._id}`);
    console.log("hello2");
}

module.exports.deleteReview=async(req,res)=>{
    const {id,reviewId}=req.params;
    await Campground.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Succesfully deleted! review');
    res.redirect(`/campgrounds/${id}`);
}

// module.exports.deleteReview;