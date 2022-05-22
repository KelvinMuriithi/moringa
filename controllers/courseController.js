const Course = require('../models/course');

const index = (req, res) =>{
    Course.find().sort({createdAt:-1})
        .then((result)=>{
            res.render('course/index', {title:'Available courses',courses:result})

        })
        .catch((err)=>{
            console.log(err)
        })
}

const show = (req,res) => {
    const id = req.params.id;
    console.log(id);
    Course.findById(id)
       .then((result)=>{
           res.render('course/details',{course:result, title:'Course details'})
       })
       .catch((err)=>{
           console.log(err)
       })
}

const create_course = (req,res) => {
    res.render('course/create', {title: 'Create' });
}

const store = (req, res) => {
    const course = new Course(req.body);
    course.save()
       .then((result)=>{
          res.redirect('/courses')
       })
       .catch((err)=>{
           console.log(err)
       })
}

const destroy = (req,res) => {
    const id = req.params.id;
    Course.findByIdAndDelete(id)
       .then((result)=>{
           res.json({redirect:'/courses'});
       })
       .catch((err)=>{
           console.log(err)
       })
}

module.exports = {
    index,  show, create_course,store,destroy
}