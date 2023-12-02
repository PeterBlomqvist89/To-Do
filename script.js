const BASE_URL =
  "https://js1-todo-api.vercel.app/api/todos?apikey=970e1bb6-b916-43c5-b75f-64ccfddd8dce";
const inputText = document.getElementById("inputText");
const listContainer = document.getElementById("list-container");

const setError = document.querySelector(".errorText");
//Modal Popup
const modal = document.querySelector("#modal");
const closeBtn = document.querySelector("#close-btn");
const modalBg = document.querySelector(".modal-bg");

// FETCH TODO
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

// Skapar felmeddelande
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

//POST TODO
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
      addTodoToList(data.title, data._id, data.completed);
      console.log("Todo sparad");
    } else {
      throw new Error("Något gick fel vid skickande av data.");
    }
  } catch (error) {
    console.error("Det uppstod ett fel:", error);
  }
}
// PUT Funktion för att ändra statusen för en todo
async function toggleTodoStatus(todoId, completed) {
  try {
    const response = await fetch(
      `https://js1-todo-api.vercel.app/api/todos/${todoId}?apikey=970e1bb6-b916-43c5-b75f-64ccfddd8dce`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: completed }), // Invertera statusen
      }
    );

    if (response.status === 200) {
      console.log("Todo-status uppdaterad");
      return true;
    } else {
      throw new Error("Kunde inte uppdatera todo-status");
    }
  } catch (error) {
    console.error(error.message);
    return false;
  }
}

// Lyssna på klick på listContainer och hantera klarmarkering av todos
listContainer.addEventListener("click", async (event) => {
  const clickedElement = event.target;

  if (clickedElement.tagName === "LI") {
    clickedElement.classList.toggle("checked");

    const getTodoId = clickedElement.querySelector("span").id; // Hämta ID från span-elementet

    const currentCompletedStatus = clickedElement.classList.contains("checked");
    const updatedStatus = await toggleTodoStatus(
      getTodoId,
      currentCompletedStatus
    );

    if (updatedStatus) {
      // Uppdatera klassen för att visa den nya statusen visuellt
      if (currentCompletedStatus) {
        clickedElement.classList.add("checked");
      } else {
        clickedElement.classList.remove("checked");
      }
    }
  }
});

// DELETE TODO
listContainer.addEventListener("click", async (event) => {
  const clickedElement = event.target;

  if (
    clickedElement.tagName === "SPAN" &&
    clickedElement.classList.contains("close")
  ) {
    try {
      const todoId = clickedElement.id;

      // Hämta hela LI-elementet (för att kontrollera om det är klarmarkerat)
      const parentListItem = clickedElement.parentElement;

      const isCompleted = parentListItem.classList.contains("checked");

      // Endast om todo:n är klarmarkerad
      if (isCompleted) {
        const response = await fetch(
          `https://js1-todo-api.vercel.app/api/todos/${todoId}?apikey=970e1bb6-b916-43c5-b75f-64ccfddd8dce`,
          {
            method: "DELETE",
          }
        );

        if (response.status === 200) {
          parentListItem.remove();
          console.log("Todo borttagen");
        } else {
          throw new Error("Kunde inte ta bort todo");
        }
      } else {
        modal.classList.add("open");
        modalBg.classList.add("open");
        console.log("Kan inte ta bort en oslutförd uppgift.");
      }
    } catch (error) {
      console.error(error.message);
    }
  }
});
modalBg.addEventListener("click", closeModal);
closeBtn.addEventListener("click", closeModal);
function closeModal() {
  modalBg.classList.remove("open");
  modal.classList.remove("open");
}
