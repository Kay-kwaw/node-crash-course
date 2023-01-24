const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
// const { result } = require('lodash');
const Blog = require('./models/blog');
const { render } = require('ejs');

// Setting Express Application
//Express is a minimal and flexible Node.js
// web application framework that provides a robust set of features for web and mobile applications.

//Engine Views or view engine is responsible for create html from your views 
// Views is a mixed up html with a programming language
const app = express();

//Connect to mongobd
//Using mongoose to connect to mongodb
const dbURI = "mongodb+srv://kwaw%5Fkumi:Miezah%40%31@nodetril.n2duswe.mongodb.net/?retryWrites=true&w=majority";

// this is an ansync task
mongoose.connect(dbURI, {useNewUrlParser: true,  }) //useUnifiedTopology: true,
   .then((result) => app.listen(3000))
   .catch((err) => console.log(err));
//Register view engine
// EJS EMBEDDED JAVASCRIPT 
//EJS stands for Embedded JavaScript is a Templating Language. EJS is very simple, light and fast. It allow us to create HTML Markup with Plain JavaScript.
//EJS templates are processed through the Ejs view engine on the server
app.set('view engine', 'ejs');

//Listening to requests?// ALL these are get handlers so what this code does is if we fire a function it goes through the request handler and fires back 404 if not found
//  app.listen(3000);
//Middleware and static files(static files refers to images, css files etc)(middleware and express app)
app.use(express.static('public'));
//Morgan middleware HTTP request logger middleware for node.js.
app.use(morgan('dev'));
//The express.urlencoded() function is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded());
//Middleware code
// app.use((req, res, next) => {
//     console.log("new request made");
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     next();
// };
//The importance use of next in middleware else the function would get stacked and not move to the next event handler

//Getting data and saving data to database
app.get('/add-blog', (req, res, ) => {
    const blog = new Blog ({
        title: 'New blog post',
        snippet: "about my new blog post",
        body: "more about my new blog post you get it right",
    });
    //Methods to use on the new blog post the instance of Blog model
    blog.save() 
    .then((result) => {
        res.send(result);
    })
    .catch((error) => { 
        console.log(error);
        
    });

});

// get all blog posts from the database
//NB its an async function so might some time
app.get('/all-blogs', (req, res) => {
    Blog.find()
    .then((result) => {
        res.send(result);
    })
    .catch(error => {
        console.log(error);
    })
   
})

//routes
app.get('/', (req, res) => {
    // res.send("<p><strong>home page</strong></p>");
    // res.sendFile('./views/index.html', {root: __dirname});
    res.redirect('/blogs');
    // const blogs = [
    //        {title: "Youshi finds eggs", snippet: 'Lorem ipsum dolor sit amet, consectetur'},
    //        {title: "Youshi finds eggs", snippet: 'Lorem ipsum dolor sit amet, consectetur'},
    //        {title: "Youshi finds eggs", snippet: 'Lorem ipsum dolor sit amet, consectetur'},
    // ];
    res.render("index", { title: 'Home page', blogs});
});
app.get('/about', (req, res) => {
    // res.send("<p><strong>About-Us Ony3 gbemi</strong></p>");
    // 
    res.render("about", { title: 'About page'});
});
//blogs routes
app.get('/blogs', (req, res) => {
    // descending order 
    Blog.find().sort({createdAt: -1})
.then((result) => {
  res.render('index', { title: 'All Blogs', blogs: result }); 
})
.catch(error => {
    console.log(error);
})

});
//POST REQUEST

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch(error => {
        console.log(error);
    });
});


app.get('/blogs/create', (req, res) => {
    res.render( "create",{ title: 'Create page'});
});


//Routes Parameters
app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then(result => {
        res.render('details', {blog: result, title: 'Blog details'});
    })
    .catch( err => {
        console.log(err)
    });
})


// redirects 
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

//404 page (mIddleware )
app.use((req, res) => {
    // res.status(404).sendFile("./views/404.html", { root: __dirname});
    res.status(404).render("404");
})

//Middleware a code that runs on the server between getting a request and sending a response:
//From Ejs passes through the view engine and finally converts the to  html this whole process is known as server-side rendering

//Mongoose is an ODM library - Object Document Mapping Library
//What it simply does is it wraps the standard mongoDB api and it provides with easy ways to communicate with the user database
// The way we usually work with mongoDB and mongoose is by creating schema objects and models
//Schema objects defines the structure of a type of data or documents
//Models allows us to communicate with databases;