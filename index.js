const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');
const { render } = require('ejs');
const courseRoutes = require('./routes/courseroutes');
//const { findById } = require('./models/course');
const PORT = process.env.PORT || 5000

const app = express();

//connect to database (mongo)
const dbUri ='mongodb+srv://Kelvin:PV0wePEstadg1Wrr@nodelearning.1zq04.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbUri,  {useNewUrlParser: true, useUnifiedTopology: true})
          .then((result)=>app.listen(PORT, () => console.log(`Listening on ${ PORT }`)))
          .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');


//middleware and static files

app.use(express.static('public'))

app.use(express.urlencoded({extended:true}))

app.use(morgan('dev'))

/* app.get('/add_course',(req,res) => {
    const course = new Course({
        title:'Java',
        description:'Python is a good course',
        body:'This is python code',
    });
    course.save()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err);
    });
});

app.get('/all_courses', (req,res)=>{
    Course.find()
      .then((result)=>{
          res.send(result)
      })
      .catch((err)=>{
          console.log(err);
      })

})

app.get('/single_course',(req,res)=>{
    Course.findById('62877da2975b4c0776312c72')
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err);
        })
}) */

app.get('/', (req, res) => {
    res.redirect('/courses');
});

app.use('/courses', courseRoutes);


app.get('/about', (req, res) => {

    res.render('about', {title: 'About' });
});

//redirect


// 404 page
app.use((req, res)=>{
    res.status(404).render('404',{title: '404' });

});