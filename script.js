const BASE_URL =
  "https://js1-todo-api.vercel.app/api/todos?apikey=970e1bb6-b916-43c5-b75f-64ccfddd8dce";
const inputText = document.getElementById("inputText");
const listContainer = document.getElementById("list-container");

const setError = document.querySelector(".errorText");

// FETCH
const loadData = async () => {
  try {
    const res = await fetch(BASE_URL);
    if (res.status !== 200) {
      throw new Error("Something went wrong");
    }
    const data = await res.json();

    data.forEach((e) => addTodoToList(e.title, e._id, e.completed));
    // console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};

loadData();

//Funktion som skapar elementen för todon, span är krysset som man tar bort todos.
function addTodoToList(todo, todoId) {
  let li = document.createElement("li");
  li.innerHTML = todo;
  listContainer.prepend(li);

  let span = document.createElement("span");
  span.innerHTML = "\u00d7";
  span.className = "close";
  span.id = `${todoId}`;

  li.prepend(span);
}

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
    // console.log(response);
    if (response.status === 201) {
      const data = await response.json();
      addTodoToList(data.title, data._id);
      console.log("Todo sparad");
    } else {
      throw new Error("Något gick fel vid skickande av data.");
    }
  } catch (error) {
    console.error("Det uppstod ett fel:", error);
  }
}

// Visar om uppgiften är klar
listContainer.addEventListener(
  "click",
  (e) => {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
    }
  },
  false
);

// DELETE
listContainer.addEventListener("click", async (event) => {
  const clickedElement = event.target;

  if (
    clickedElement.tagName === "SPAN" &&
    clickedElement.classList.contains("close")
  ) {
    try {
      const todoId = clickedElement.id;

      const response = await fetch(
        `https://js1-todo-api.vercel.app/api/todos/${todoId}?apikey=970e1bb6-b916-43c5-b75f-64ccfddd8dce`,
        {
          method: "DELETE",
        }
      );

      if (response.status === 200) {
        clickedElement.parentElement.remove();
        console.log("Todo borttagen");
      } else {
        throw new Error("Kunde inte ta bort todo");
      }
    } catch (error) {
      console.error(error.message);
    }
  }
});
