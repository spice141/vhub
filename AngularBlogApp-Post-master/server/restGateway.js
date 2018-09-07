const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose');

/*Configs to be changed  for Prod*/
const urlDev = "mongodb://localhost/blogDb";
const urlStaging = "mongodb://localhost/blogDb"
const urlProd = "mongodb://localhost/blogDb";

const url = urlDev;

const CORSDev = 'http://localhost:4200';
const CORSStaging = 'http://www.pricelesspeanuts.com:4200';
const CORSProd = 'http://www.pricelesspeanuts.com';
const CORS = CORSDev;

var DIR_DEV = '../client/src/assets/images';
var DIR_STAGING = '../iis/client_staging/assets/images';
var DIR_PROD = '../iis/client/assets/images';
var DIR = DIR_DEV;

var WEBSERVER_PORT = 3000;
/*Configs to be changed  for Prod*/

const User = require('./model/user');
const Post = require('./model/post');
const FavPost = require('./model/favPost');
var multer = require('multer');


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))

app.use(function(req, res, next) { //allow cross origin requests
	res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
	res.header("Access-Control-Allow-Origin", CORS);
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Credentials", true);
	next();
});



app.post('/api/user/login', (req, res) => {
	mongoose.connect(url,{ useMongoClient: true, user: "dba", pass: "P@55word" }, function(err){
		if(err) throw err;
		User.find({
			username : req.body.username, password : req.body.password
		}, function(err, user){
			if(err) throw err;
			if(user.length === 1){	
				return res.status(200).json({
					status: 'success',
					data: user
				})
			} else {
				return res.status(200).json({
					status: 'fail',
					message: 'Login Failed'
				})
			}
			
		})
	});
})

app.post('/api/user/create', (req, res) => {
	mongoose.connect(url,{user: "dba", pass: "P@55word"}, function(err){
		if(err) throw err;
		const user = new User({
			name: req.body.name,
			username: req.body.username,
			password: req.body.password
		})
		user.save((err, res) => {
			if(err) throw err;
			return res.status(200).json({
				status: 'success',
				data: res
			})
		})
	});
})

app.post('/api/post/createPost', (req, res) => {
	mongoose.connect(url, { useMongoClient: true, user: "dba", pass: "P@55word" }, function(err){
		if(err) throw err;
		const post = new Post({
			title: req.body.title,
			description:  req.body.description,
			date: req.body.date,
			asscField:  req.body.asscField,
			leadImage: req.body.leadImage,
			leadText: req.body.leadText,
			leadTextCont: req.body.leadTextCont,
			publishPost: req.body.publishPost,
			paragraphs: req.body.paragraphs
			 
		})
		post.save((err, doc) => {
			if(err) throw err;
			return res.status(200).json({
				status: 'success',
				data: doc
			})
		})
	});
})

app.post('/api/post/getPost', (req, res) => {
	mongoose.connect(url, { useMongoClient: true , user: "dba", pass: "P@55word" }, function(err){
        if(err) throw err;
        Post.findOne(
            {_id: req.body.id },
            (err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
    });
})

app.post('/api/post/getAllPost', (req, res) => {
	mongoose.connect(url, { useMongoClient: true, user: "dba", pass: "P@55word" } , function(err){
		if(err) throw err;
		Post.find({},[],{ sort: { _id: -1 } },(err, doc) => {
			if(err) throw err;
			return res.status(200).json({
				status: 'success',
				data: doc
			})
		})
	});
})

app.post('/api/post/getAllFavPost', (req, res) => {
	mongoose.connect(url, { useMongoClient: true, user: "dba", pass: "P@55word" } , function(err){
		if(err) throw err;
		FavPost.find({},[],{ sort: { _id: -1 } },(err, doc) => {
			if(err) throw err;
			return res.status(200).json({
				status: 'success',
				data: doc
			})
		})
	});
})

app.post('/api/post/updatePost', (req, res) => {
    mongoose.connect(url, { useMongoClient: true, user: "dba", pass: "P@55word" }, function(err){
        if(err) throw err;
        Post.update(
            {_id: req.body._id },
			{ 
				_id: req.body._id,
				title : req.body.title, 
				description: req.body.description, 
				date: req.body.date,
				asscField: req.body.asscField,
				leadImage: req.body.leadImage,
				leadText: req.body.leadText,
				leadTextCont: req.body.leadTextCont,
				publishPost: req.body.publishPost,
				paragraphs: req.body.paragraphs


			},
            (err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
    });
})

app.post('/api/post/deletePost', (req, res) => {
    mongoose.connect(url, { useMongoClient: true, user: "dba", pass: "P@55word"}, function(err){
        if(err) throw err;
        Post.findByIdAndRemove(req.body.id,
            (err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
    });
})

/*Upload Functionality*/

var storage = multer.diskStorage({ //multers disk storage settings
	destination: function (req, file, cb) {
		cb(null, DIR);
	},
	filename: function (req, file, cb) {
		var datetimestamp = Date.now();
		//cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
		cb(null,file.originalname);
	}
});

var upload = multer({ //multer settings
				storage: storage
			}).single('file');

/** API path that will upload the files */
app.post('/upload', function(req, res) {
	upload(req,res,function(err){
		//console.log(req.file);
		if(err){
			 res.json({error_code:1,err_desc:err});
			 return;
		}
		 res.json({error_code:0,err_desc:null});
	});
});



app.listen(WEBSERVER_PORT, () => console.log('Blog server running on port : '+WEBSERVER_PORT))