const tarefas = document.querySelector(".tarefas");

async function fetchTasks() {
  try {
    const response = await fetch("/api/tasks");
    const tasks = await response.json();

    // Renderiza as tarefas na página
    if (tasks.length === 0) {
      tarefas.innerHTML = `<p class="tarefa-item-p">Nenhuma tarefa encontrada.</p>`;
      return;
    } else {
      tarefas.innerHTML = "";
    }

    tasks.forEach((tarefa) => {
      const tarefaItem = document.createElement("div");
      tarefaItem.classList.add("tarefa-item");

      // Formata a data no formato DD/MM/YYYY
      const deadline = new Date(tarefa.deadline);
      const formattedDate = `${String(deadline.getDate()).padStart(2, "0")}/${String(deadline.getMonth() + 1).padStart(2, "0")}/${String(deadline.getFullYear()).padStart(4, "0")}`;

      tarefaItem.innerHTML = `
        <div class="accordion" id="tarefas">
            <div class="accordion-item">
              <h1 class="accordion-header" id="heading-${tarefa.id}">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#tarefa-${tarefa.id}" aria-expanded="true" aria-controls="tarefa-${tarefa.id}">
                  ${tarefa.title}
                </button>
              </h1>
              <div class="accordion-collapse collapse show" id="tarefa-${tarefa.id}" aria-labelledby="heading-${tarefa.id}" data-bs-parent="#tarefas">
                <div class="accordion-body">
                    <p class="tarefa-item-description tarefa-item-p">${tarefa.description}</p>
                    <p class="tarefa-item-p">Prazo: ${formattedDate}</p>
                    <p class="tarefa-item-p">Status: ${tarefa.status}</p>
                </div>
              </div>
            </div>
          </div>
      `;
      tarefas.appendChild(tarefaItem);
    });
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
  }
}

// Chama a função para buscar e renderizar as tarefas
fetchTasks();

const createTask = document.querySelector(".createTask");
createTask.addEventListener("click", () => {
  window.location.href = "http://localhost:3000/create-task";
});
