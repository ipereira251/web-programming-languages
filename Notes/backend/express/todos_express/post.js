/*import axios from 'axios'; 
axios.post(<url>, {<array item>)
.then(res => ) 
.catch(error =>)
*/
import axios from 'axios';
axios.post('http://localhost:3000/tasks', { id:3, name: "Groceries", completed: false })
.then(res => console.log(res))
.catch(error => console.error(error));
