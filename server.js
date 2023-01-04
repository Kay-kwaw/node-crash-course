const fs = require('fs')
const http = require('http')
const _ = require('lodash'); 

// Http modules allows us to transfer content over the HTTP server
// Fs allows us to work or access the filesystem on our computer
//Consider modules as javascript libraries These are set of functions you want to incluse in your application


//A call back function

const server = http.createServer((req, res) =>
{
    // console.log(req.url, req.method);
    const num = _.random(0, 40);
    console.log(num);

    const greet = _.once(() => {
        console.log("hey bitching!");
    });

    greet();


// How to set headers and make responses;
//The setheader give the browser the type of response to expect whether plain or json or html response
    res.setHeader('Content-Type', 'text/html');

   let path = './views/';
   switch(req.url)
   {
    case '/':
        path += '/index.html';
        res.statusCode = 200;
        break;
    case '/about':
        path += '/about.html';
        res.statusCode = 200;
        break;

        //How to redirect to in node
        case '/about-me':
            res.setHeader('Location', './about');
            res.statusCode = 201;
            break;

        default:
            path += '/404.html';
            res.statusCode = 404;
            break;
   }

    fs.readFile(path, (err, data) =>{
        if(err) {
            console.log(err);
            res.end();
        }else
        {
            res.write(data)
            res.end();
        }
    })

//Status Codes describes the type of response sent to the browser.




//  res.write("<p>Hello, world!</p>");
//  res.write("<p>Hello again, world!</p>");
//  res.write("<p>Hello, world!</p>");
//  res.write("<p>Hello again, world!</p>");
//  res.end();
  
});
 

// How to listen to requests on the browser
server.listen(3000, 'localhost', () => {
    console.log("listening for requests on port 3000");
});
 

 //How to send requests

//NPM is a project manager for node.js
//A project manager in node.js is the number of files you can include in your module