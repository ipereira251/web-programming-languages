//browser used to be interpreter-only, now has js engine
//compilation not necessarily needed, but done 
/* Primitives: 
    number, bigint, string, boolean, 
    null (unknown), undefined (unassigned), symbol (unique)
 */

    
let name="name";
console.log(`Hi ${name}`);
//Compare *types* using ===
//Number(str) shortcut: +str or +'6'

//nullish coalescing operator
result=(a !== null && a !== undefined) ? a : b;
result = a ?? b;

//give default value in function
function showMsg (from, text="no text", time){
    console.log("Something here");
}
showMsg("Ann"); //valid, even if no default given to time

//Function is a value
console.log(showMsg); //prints the js code
let sayHi = function(){alert("Hello");}; //function expression, not function declaration
sayHi();
func = sayHi;
func();
//input function to function
function ask(question, yes, no){
    if(confirm(question)) yes()
        else no();
}
ask(
    "Do you agree?", 
    function() {alert("You agreed.")}, //anonymous functions
    function() {alert("You canceled")},
);
askPrime(
    "Do you agree?", 
    () => alert("You agreed."), //anonymous functions
    function() {alert("You canceled")}
);

//arrow function shorthand
let sum = (a, b) => (a + b); //returns sum

//Object: several key-value pairs called properties
let foo = {};
//object literal syntax
let user = {
    age: 22, 
    "likes birds": true
}
user.age 
user["age"]
user["likes birds"] //no dot notation for property with space

"age" in user //returns boolean

Object.keys(user);

function isEmpty(object){
    for (let key in object){
        return false;
    }
    return true;
}
let schedule = {};
alert(isEmpty(schedule));
schedule["8:30"] = "get up";
alert(isEmpty(schedule));

//OBJECT METHODS function is still a value
let user2 = {
    name: "", 
    age: 12, 
    sayHi() {
        alert("Hello");
    }
}

//arrays can contain mixed values + undef
//for(let item *of* fruits)
//double ended queue, shift/unshift, pop/push
//.splice() destructive, .slice() not destructive
res = arr.map(function(item, index, array){});
let double = arr.map( item => 2*item);
// forEach, sort, reverse, find, concat, split, join, filter, flatMap

//destructuring
[firstName, lastName] = arr;
[n1, , n3] = [1, 2, 3, 4];

//rest parameters
function sumAll(...args){}

//spread
let arr = [1, 2, 3];
let arr2 = [5, 6, 7];
Math.max(...arr);
let merged = [0, ...arr, 4, ...arr2];



//CLOSURE: fn that remembers the lexical environment in which the fn was created
//all js functions are closures, high-order functions, first-class
//see arrowThis.html, keyword "this": use arrow fn, not anonymous
//can explicitly bind with apply() call() bind()
function makeCounter(){
    let count = 0;

    function increment(){
        return count++;
    }
    return increment;
}
let counter = makeCounter();  //count must be defined when increment() called, must have access to all outer (functions') environments
console.log(increment);

////
function outer() {
  this.value = 42;
  return () => console.log(this.value);
}

let fn = outer.call({ value: 99 });
fn();