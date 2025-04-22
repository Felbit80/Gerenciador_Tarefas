const tarefas = document.querySelector(".tarefas");
const accordionTarefas = document.querySelector("#tarefas");

async function fetchTasks() {
  try {
    const response = await fetch("/api/tasks");
    let tasks = await response.json();

    tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

    if (tasks.length === 0) {
      tarefas.innerHTML = `<p class="tarefa-item-p">Nenhuma tarefa encontrada.</p>`;
      return;
    } else {
      tarefas.innerHTML = "";
    }

    tasks.forEach((tarefa) => {
      const tarefaItem = document.createElement("div");
      tarefaItem.classList.add("tarefa-item");

      const deadline = new Date(tarefa.deadline);
      const currentDate = new Date();
      const formattedDate = `${String(deadline.getDate() + 1).padStart(2, "0")}/${String(deadline.getMonth() + 1).padStart(2, "0")}/${String(deadline.getFullYear()).padStart(4, "0")}`;

      tarefaItem.innerHTML = `
          <div class="accordion-item">
            <h1 class="accordion-header" id="heading-${tarefa.id}">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#tarefa-${tarefa.id}" aria-expanded="true" aria-controls="tarefa-${tarefa.id}">
                ${tarefa.title}
              </button>
            </h1>
            <div class="accordion-collapse collapse" id="tarefa-${tarefa.id}" aria-labelledby="heading-${tarefa.id}" data-bs-parent="#tarefas">
              <div class="accordion-body">
                  <p class="tarefa-item-description tarefa-item-p">${tarefa.description}</p>
                  <p class="tarefa-item-p ${currentDate > deadline ? "atrasada" : ""}">Prazo: ${formattedDate}</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <p class="tarefa-item-p">Status: ${tarefa.status}</p>
                  </div>  
              </div>
            </div>
          </div>
      `;
      accordionTarefas.appendChild(tarefaItem);
    });

    tarefas.appendChild(accordionTarefas);
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
  }
}

fetchTasks();

const createTask = document.querySelector(".createTask");
createTask.addEventListener("click", () => {
  window.location.href = "http://localhost:3000/create-task";
});
