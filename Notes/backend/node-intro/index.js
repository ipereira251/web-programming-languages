import {createServer} from 'node:http'; //adding "node:" helps search faster

const port = 5533;
const hostName = '127.0.0.1';
/*const server = createServer(); 
server.on("data", () => {

});*/
//simpler: 
const server = createServer((req, res) => {
  console.log("Got request ", req);
  console.log(req.method);
  console.log(req.url);
  
  //fill response, http will send back
  if(req.url === '/about'){ //express allows you to avoid all the repetition
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write("<html><body><h1>About Page</h1></body></html>");
    res.end("hello"); //writes one line, can be empty
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write("<html><body><h1>Hiiiii</h1></body></html>");
    res.end("hello"); //writes one line, can be empty
  }
  
});
//listen for request
server.listen(port, hostName, () => {
    console.log("listening....");
});