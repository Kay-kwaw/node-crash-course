const mongoose = require('mongoose');
//A contructor function
const Schema= mongoose.Schema;
//Mongoose is an ODM library - Object Document Mapping Library
//What it simply does is it wraps the standard mongoDB api and it provides with easy ways to communicate with the user database
// The way we usually work with mongoDB and mongoose is by creating schema objects and models
//Schema objects defines the structure of a type of data or documents to be used
//Models allows us to communicate with databases;//Provides us with the interface to communicate with the database

//we pass in an object as a parameter so that is object can describe the structure of the document type we want to store in our block collection
//This is mongoose creating a schema type
const blogSchema = new Schema ({
    title:{
        type:String,
        required:true,
    },
    snippet:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    }
},{timestamps: true})


//creating a model based on the schema
//Basically blogs collection

const Blog = mongoose.model('Blog',blogSchema);

module.export = Blog;