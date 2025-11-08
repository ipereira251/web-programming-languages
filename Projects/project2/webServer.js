/**
 * Project 2 Express server connected to MongoDB 'project2'.
 * Start with: node webServer.js
 * Client uses axios to call these endpoints.
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import mongoose from "mongoose";
// eslint-disable-next-line import/no-extraneous-dependencies
import bluebird from "bluebird";
import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { ObjectId } from "mongodb";

// ToDO - Your submission should work without this line. Comment out or delete this line for tests and before submission!
//import models from "./modelData/photoApp.js";

// Load the Mongoose schema for User, Photo, and SchemaInfo
// ToDO - Your submission will use code below, so make sure to uncomment this line for tests and before submission!
import User from "./schema/user.js";
import Photo from "./schema/photo.js";
import SchemaInfo from "./schema/schemaInfo.js";

const portno = 3001; // Port number to use
const app = express();

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

mongoose.Promise = bluebird;
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1/project2", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// We have the express static module
// (http://expressjs.com/en/starter/static-files.html) do all the work for us.
app.use(express.static(__dirname));

app.get("/", function (request, response) {
  response.send("Simple web server of files from " + __dirname);
});

/**
 * /test/info - Returns the SchemaInfo object of the database in JSON format.
 *              This is good for testing connectivity with MongoDB.
 */

app.get('/test/info', (request, response) => {
  const info = SchemaInfo; //models.schemaInfo();
  response.status(200).send(info.load_date_time);
  console.log(info, "trying");
});

/**
 * /test/counts - Returns an object with the counts of the different collections
 *                in JSON format.
 */
app.get('/test/counts', (request, response) => {
  /*const users = models.userListModel();
  let photoCount = 0;
  users.forEach((user) => {
    photoCount += models.photoOfUserModel(user._id).length;
  });
  response.status(200).send({
    user: users.length,
    photo: photoCount,
    schemaInfo: 1
  });*/

});

/**
 * URL /user/list - Returns all the User objects.
 */
app.get('/user/list', async (request, response) => {
  try{
    const userModels = await User.find({});
    const users = userModels.map((model) => {
      return {
        _id: model.id,
        first_name: model.first_name,
        last_name: model.last_name, 
        location: model.location, 
        description: model.description, 
        occupation: model.occupation
      };
    });
    response.status(200).json(users);
  } catch (err){
    console.error(err);
    response.status(400).send("Internal server error");
  }
});

/**
 * URL /user/:id - Returns the information for User (id).
 */
app.get('/user/:id', async (request, response) => {
  try{
    const userModel = await User.findById(request.params.id);
    const user = { 
      _id: userModel.id, 
      first_name: userModel.first_name, 
      last_name: userModel.last_name, 
      location: userModel.location, 
      description: userModel.description,
      occupation: userModel.occupation
    };
    response.status(200).json(user);
  } catch (err){
    console.error(err);
    response.status(400).send("Internal server error");
  }
});

/**
 * URL /photosOfUser/:id - Returns the Photos for User (id).
 */
app.get('/photosOfUser/:id', async (request, response) => {
  try{

    if(!ObjectId.isValid(request.params.id)){
      response.status(400);
      return;
    }
    const userId = new ObjectId(request.params.id);
    console.log("Userid, objid:", userId);

    const photoModels = await Photo.aggregate([
      { 
        $match: { user_id: userId } 
      }, {
        $unwind: { path:`$comments`, preserveNullAndEmptyArrays: true }
      }, {
        $lookup: { //add commenters
          from: 'users', 
          localField: 'comments.user_id',
          foreignField: '_id', 
          as: 'commenter'
        }
      }, {
        $addFields: {
          'comments.user': { $first: `$commenter`}
        }
      }, {
        $group: {
          _id: `$_id`,
          file_name: { $first: `$file_name` },
          date_time: { $first: `$date_time` },
          user_id: { $first: `$user_id` },
          comments: { $push: `$comments` }
        }
      }, {
        $sort: { date_time: -1 }
      }
    ]);
    console.log("PhotoModels:", photoModels);

    response.status(200).json(photoModels);
  } catch (err){
    console.error(err);
    response.status(400).send("Internal server error");
  }
});

const server = app.listen(portno, function () {
  const port = server.address().port;
  console.log(
    "Listening at http://localhost:" +
      port +
      " exporting the directory " +
      __dirname
  );
});
