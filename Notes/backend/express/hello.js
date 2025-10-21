//npm init, npm install express
import express from 'express'; //old way: require(express)

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  //don't need to set header, etc.
  res.send("This is the response");
});

app.get('/about', (req, res) => {
  
})

app.listen(port, () => {
  console.log("Server listening on port ", port);
});