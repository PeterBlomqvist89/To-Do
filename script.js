// GET retrieve all to-do’s

const url = 'https://jsonplaceholder.typicode.com/todos';

const loadData = async () => {
    try{
    const res = await fetch(url);
    // console.log(res.ok);
    const data = await res.json();
    console.log(data);
    } catch (err) {
    console.log(err)};
};

loadData();






// const fetchApi = async() => {
  
//     const res = await fetch('https://jsonplaceholder.typicode.com/todos');
//     const data = await res.json()
//     console.log(data);
// }
// fetchApi();

/* will return this specific resource:
{
“userId”: 1,
“id”: 5,
“title”: “laboriosam mollitia et enim quasi adipisci quia provident illum”,
“completed”: false
}
*/