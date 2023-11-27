const BASE_URL =
  "https://js1-todo-api.vercel.app/api/todos?apikey=970e1bb6-b916-43c5-b75f-64ccfddd8dce";
const inputText = document.getElementById("inputText");
const listContainer = document.getElementById("list-container");

const setError = document.querySelector(".errorText");

function addTodoToList(todo) {
  let li = document.createElement("li");
  li.innerHTML = todo;
  listContainer.prepend(li);
  let span = document.createElement("span");
  span.innerHTML = "\u00d7";
  li.prepend(span);
}
// FETCH
const loadData = async () => {
  try {
    const res = await fetch(BASE_URL);
    if (res.status !== 200) {
      throw new Error("Something went wrong");
    }
    const data = await res.json();
    let sortedTodos = data.sort((e1, e2) =>
      e1.createdAt > e2.createdAt ? 1 : e1.createdAt < e2.createdAt ? -1 : 0
    );
    data.forEach((e) => addTodoToList(e.title));
  } catch (error) {
    console.log(error.message);
  }
};

loadData();

// TODO
function addTask(event) {
  event.preventDefault();
  const inputValue = document.getElementById("inputText").value;

  if (inputValue === "") {
    setError.classList.add("is-invalid");
  } else {
    postMyData(inputValue);
    setError.classList.remove("is-invalid");
  }
  inputText.value = "";
}

//POST
async function postMyData(inputValue) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: inputValue }),
    });
    if (response.status === 201) {
      const data = await response.json();
      addTodoToList(data.title);
      console.log("Todo sparad");
    } else {
      throw new Error("Något gick fel vid skickande av data.");
    }
  } catch (error) {
    console.error("Det uppstod ett fel:", error);
  }
}

listContainer.addEventListener(
  "click",
  (e) => {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      //   saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      //   saveData();
    }
  },
  false
);

// function saveData() {
//   localStorage.setItem("dataTodos", listContainer.innerHTML);
// }

// TODO
// function addTask(event) {
//     event.preventDefault()
//     if (inputText.value === '') {
//         setError.classList.add('is-invalid');
//     } else {
//         setError.classList.remove('is-invalid');
//         let li = document.createElement('li');
//         li.innerHTML = inputText.value;
//         listContainer.appendChild(li);
//         let span = document.createElement('span');
//         span.innerHTML = '\u00d7';
//         li.appendChild(span);
//     }
//     inputText.value = '';
//     saveData();
// }

// FETCH
// const loadData = async () => {
//     try{
//     const res = await fetch(BASE_URL);
//     const data = await res.json();
//     console.log(data);
//     // Loopa igenom uppgifterna och skapa HTML-element för varje uppgift
//     data.forEach(todo => {
//         const todoItem = document.createElement('li');
//         todoItem.textContent = todo.task;

//         // Anta att du har en <ul> med id 'todo-list' på din sida där du vill lägga till uppgifterna
//         document.getElementById('list-container').appendChild(todoItem);
//     });
// } catch (err) {
//     console.log(err);
// }
// };

// loadData();

//Post

// POST adds a random id to the object sent *funkar*
// fetch(BASE_URL, {
//     'method': 'POST',
//     'body': JSON.stringify({
//     userId: 1,
//     title: 'clean room',
//     completed: false
// }),
// 'headers': {
// 'Content-type': 'application/json'
// }
// })
// .then(response => response.json())
// .then(json => console.log(json))

// const deleteResource = async () => {
//     try {
//       const deleteResponse = await fetch('https://js1-todo-api.vercel.app/api/todos/656461299f9066156be3d25f?apikey=970e1bb6-b916-43c5-b75f-64ccfddd8dce', {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//       });

//       if (!deleteResponse.ok) {
//         throw new Error('Failed');
//       }

//       const data = await deleteResponse.json();
//       console.log('Resursen har raderats:', data);
//     } catch (error) {
//       console.error('Fel vid radering:', error);
//     }
//   }

//   deleteResource();
