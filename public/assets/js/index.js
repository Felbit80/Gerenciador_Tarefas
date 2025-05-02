const tarefas = document.querySelector(".tarefas");
const accordionTarefas = document.querySelector("#tarefas");

async function fetchTasks(filtro = "todas") {
  try {
    const response = await fetch("/api/tasks");
    let tasks = await response.json();

    tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

    if (filtro !== "todas") {
      const statusMap = {
        pendente: "Pendente",
        atrasada: "Atrasada",
        concluida: "Concluída",
      };
      tasks = tasks.filter((task) => task.status === statusMap[filtro]);
    }

    accordionTarefas.innerHTML = "";

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
      const formattedDate = `${String(deadline.getDate() + 1).padStart(2, "0")}/${String(deadline.getMonth() + 1).padStart(2, "0")}/${String(deadline.getFullYear()).padStart(4, "0")}`;

      const isAtrasada = tarefa.status === "Atrasada";
      const isConcluida = tarefa.status === "Concluída";

      tarefaItem.innerHTML = `
        <div class="accordion-item">
          <h1 class="accordion-header" id="heading-${tarefa.id}">
            <button class="accordion-button item-${tarefa.id} ${isConcluida ? "completed" : isAtrasada ? "atrasada" : ""}" type="button" data-bs-toggle="collapse" data-bs-target="#tarefa-${tarefa.id}" aria-expanded="true" aria-controls="tarefa-${tarefa.id}">
              ${tarefa.title}
            </button>
          </h1>
          <div class="accordion-collapse collapse" id="tarefa-${tarefa.id}" aria-labelledby="heading-${tarefa.id}" data-bs-parent="#tarefas">
            <div class="accordion-body">
              <p class="tarefa-item-description tarefa-item-p">${tarefa.description}</p>
              <p class="tarefa-item-p ${isAtrasada ? "atrasada" : ""}" id="prazo-${tarefa.id}">Prazo: ${formattedDate}</p>
              <div class="d-flex justify-content-between align-items-center flex-column flex-sm-row">
                <p class="tarefa-item-p ${isConcluida ? "status-concluida" : isAtrasada ? "status-atrasada" : ""}" id="status-${tarefa.id}">Status: ${tarefa.status}</p>
                <div>
                  <button class="btn-edit">
                    <img src="/assets/imgs/editIcon.png" class="img-edit">
                  </button>
                  <button class="${isConcluida ? "btn-desconcluir" : "btn-concluir"}" onclick="completeTask(${tarefa.id})">
                    <img src="/assets/imgs/${isConcluida ? "descompleteIcon.png" : "completeIcon.png"}" class="img-complete">
                  </button>
                  <button class="btn-delete" onclick="deleteTask(${tarefa.id})">
                    <img src="/assets/imgs/deleteIcon.png" class="img-delete">
                  </button>
                </div>
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

document.addEventListener("click", (event) => {
  if (event.target.closest(".btn-edit")) {
    const tarefaItem = event.target.closest(".accordion-item");
    const idMatch = tarefaItem.querySelector("button.accordion-button").className.match(/item-(\d+)/);
    const taskId = idMatch ? idMatch[1] : null;
    if (taskId) {
      window.location.href = `/edit-task/${taskId}`;
    }
  }
});

async function deleteTask(taskId) {
  try {
    const response = await fetch(`/api/tasks/${taskId}`, { method: "DELETE" });

    if (response.ok) {
      fetchTasks();
      window.location.reload();
    } else {
      console.error(`Erro ao deletar a tarefa com ID ${taskId}.`);
    }
  } catch (error) {
    console.error("Erro ao deletar a tarefa:", error);
  }
}

async function completeTask(taskId) {
  try {
    const response = await fetch(`/api/tasks`);
    let tasks = await response.json();
    const task = tasks.find((task) => task.id === taskId);

    if (!task) return;

    const deadline = new Date(task.deadline);
    const now = new Date();
    const isAtrasada = now > deadline && task.status !== "Concluída";
    const novoStatus = task.status === "Concluída" ? "Pendente" : "Concluída";
    const statusFinal = isAtrasada && novoStatus !== "Concluída" ? "Atrasada" : novoStatus;

    const responseUpdate = await fetch(`/api/tasks/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: statusFinal }),
    });

    if (responseUpdate.ok) {
      fetchTasks();
      window.location.reload();
    } else {
      console.error("Erro ao atualizar tarefa");
    }
  } catch (error) {
    console.error("Erro no completeTask:", error);
  }
}

fetchTasks(document.querySelector("#filtro-status").value);

const filtroSelect = document.querySelector("#filtro-status");
filtroSelect.addEventListener("change", (e) => fetchTasks(e.target.value));

const createTask = document.querySelector(".createTask");
createTask.addEventListener("click", () => {
  window.location.href = "http://localhost:3000/create-task";
});

const btnFiltro = document.querySelector("#toggleFiltro");
btnFiltro.addEventListener("click", () => {
  filtroSelect.classList.toggle("hidden");
});

window.completeTask = completeTask;
window.deleteTask = deleteTask;
