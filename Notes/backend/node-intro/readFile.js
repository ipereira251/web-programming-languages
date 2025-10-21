import fs from 'node:fs';

//asych, req. callback fn
fs.readFile('package.json', 'utf8', (err, data) => { 
  if(err){
    console.error(err);
    return;
  } 
  console.log(data); 
});
console.log("hello :)"); //will be executed before package.json

//SYNCHRONOUS read, no callback required
const data = fs.readFileSynch('package.json', 'utf8');
//if file not found, crash, must be contained in try/catch
console.log(data);
console.log("Hello again"); //executes AFTER package.json now