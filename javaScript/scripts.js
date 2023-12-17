// studentModal.open = true // funciona para abrir o dialog
// studentModal.open = false// funciona para fechar o dialog
// studentModal.setAttribute('open', true) // funciona para abrir o dialog
// studentModal.setAttribute('open', false) // não funciona para fechar o dialog
// studentModal.removeAttribute('open') funciona para fechar o dialog
// studentModal.showModal() // funciona para abrir o dialog
// studentModal.close() funciona para fechar o dialog

const baseUrl = "http://localhost:3000";

// Passo 1: Selecionar os elementos HTML necessários
const studentModal = document.querySelector("#student-modal");
const studentTable = document.querySelector("#student-table");
const studentForm = document.querySelector("#student-form");
const studentModalTitle = document.querySelector("#student-modal-title");
const saveStudentButton = document.querySelector("#save-student");
// studentModal.showModal()
// Passo 2: Definir função para abrir o modal do estudante
const openStudentModal = () => studentModal.showModal();
const createStudent = () => {
  studentModalTitle.innerHTML = `Novo Aluno`;
  saveStudentButton.innerHTML = "Criar";
  openStudentModal();
  saveStundentData(`${baseUrl}/alunos`, "POST");
};
// Passo 3: Definir função para fechar o modal do estudante
const closeStudentModal = () => studentModal.close();
// Passo 4: Criar uma linha na tabela do estudante
const createStudentTableRow = (id, name, matricula, curso) => {
  const tableTr = document.createElement("tr");
  tableTr.innerHTML = `
    <td>${name}</td>
    <td>${matricula}</td>
    <td>${curso}</td>
    <td align="center">
      <button class="button button--danger" onclick="deleteStudentTable(${id})">Apagar</button>
      <button class="button button--success" onclick="editdStudentModal(${id})"}>Editar</button>
    </td>`;
  studentTable.appendChild(tableTr);
};

const saveStundentData = (url, method) => {
  studentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(studentForm);

    if (Array.from(formData.values()).some((value) => value.trim() === "")) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    const payload = {};
    formData.forEach((value, key) => {
      payload[key] = value.trim();
    });

    fetch(url, {
      method: method,
      body: new URLSearchParams(payload),
    }).catch((error) => {
      closeStudentModal();
      alert("Ocorreu um erro. Tente mais tarde.");
      console.error(error);
    });
  });
};

// Passo 7: Abrir o modal para criar um novo aluno
// Passo 8: Excluir um aluno da tabela
const deleteStudentTable = (id) => {
  fetch(`${baseUrl}/alunos/${id}`, {
    method: "DELETE",
  }).catch((error) => {
    alert("Ocorreu um erro. Tente mais tarde.");
    console.error(error);
  });
};
// Passo 9: Abrir o modal de edição e carregar os dados do aluno
const editdStudentModal = (id) => {
  fetch(`${baseUrl}/alunos/${id}`)
    .then((resp) => resp.json())
    .then((data) => {
      const { nome, matricula, curso } = data;
      studentModalTitle.innerHTML = `Editar Aluno ${nome}`;
      document.querySelector("#nome").value = nome;
      document.querySelector("#matricula").value = matricula;
      document.querySelector("#curso").value = curso;
      saveStudentButton.innerHTML = "Salvar";
      openStudentModal();
      saveStundentData(`${baseUrl}/alunos/${id}`, "PUT");
    })
    .catch((error) => {
      alert("Ocorreu um erro. Tente mais tarde.");
      console.error(error);
    });
};

// Passo 10: Chamar a função para carregar dados iniciais da tabela ao carregar a página
const loadStudentTable = async () => {
  try {
    const response = await fetch("http://localhost:3000/alunos");
    const data = await response.json();
    data.forEach((student) => {
      createStudentTableRow(
        student.id,
        student.nome,
        student.matricula,
        student.curso
      );
    });
  } catch (error) {
    alert("Ocorreu um erro. Tente mais tarde.");
    console.error(error);
  }
};

const loadStudentTable2 = () => {
  fetch("http://localhost:3000/alunos")
    .then((resp) => resp.json())
    .then((data) => {
      data.forEach((student) => {
        // pode ser feito assim também
        // const { nome, matricula, curso } = student;
        createStudentTableRow(
          student.id,
          student.nome,
          student.matricula,
          student.curso
        );
      });
    })
    .catch((error) => {
      alert("Ocorreu um erro. Tente mais tarde.");
      console.error(error);
    });
};

loadStudentTable();

const disciplineModal = document.querySelector("#discipline-modal");
const disciplineTable = document.querySelector("#discipline-table");
const disciplineForm = document.querySelector("#discipline-form");
const disciplineModalTitle = document.querySelector("#discipline-modal-title");
const saveDisciplineButton = document.querySelector("#save-discipline");

const openDisciplineModal = () => disciplineModal.showModal();
const createDiscipline = () => {
  disciplineModalTitle.innerHTML = `Nova Disciplina`;
  saveDisciplineButton.innerHTML = "Criar";
  openDisciplineModal();
  saveDisciplineData(`${baseUrl}/disciplinas`, "POST");
};

const closeDisciplineModal = () => disciplineModal.close();

const createDisciplineTableRow = (
  id,
  nome,
  cargaHoraria,
  professor,
  status,
  observacoes
) => {
  const tableTr = document.createElement("div");
  tableTr.classList.add("subject-card");
  tableTr.innerHTML = `
    <h3 class="subject-card__title">${nome}</h3>
    <hr />
    <ul class="subject-card__list">
      <li>carga horária: ${cargaHoraria}</li>
      <li>Professor: ${professor}</li>
      <li>Status <span class="tag ${
        status === "Obrigatória" ? "tag--danger" : "tag--success"
      }">${status}</span></li>
      <li>Observações: ${observacoes}</li>
    </ul>
    
    
    <div class="subject-card__actions">
      <button class="button button--danger" onclick="deleteDisciplineTable(${id})">Apagar</button>
      <button class="button button--success" onclick="editedDisciplineModal(${id})"}>Editar</button>    
    </div>

    `;

  document.querySelector(".subject-list").appendChild(tableTr);
};

const saveDisciplineData = (url, method) => {
  disciplineForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(disciplineForm);
    if (Array.from(formData.values()).some((value) => value.trim() === "")) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    const payload = {};
    formData.forEach((value, key) => {
      payload[key] = value.trim();
    });

    fetch(url, {
      method: method,
      body: new URLSearchParams(payload),
    }).catch((error) => {
      closeStudentModal();
      alert("Ocorreu um erro. Tente mais tarde.");
      console.error(error);
    });
  });
};

const loadDisciplineTable = async () => {
  try {
    const response = await fetch(`${baseUrl}/disciplinas`);
    const data = await response.json();
    data.forEach((discipline) => {
      createDisciplineTableRow(
        discipline.id,
        discipline.nome,
        discipline.cargaHoraria,
        discipline.professor,
        discipline.status,
        discipline.observacoes
      );
    });
  } catch (error) {
    alert("Ocorreu um erro. Tente mais tarde.");
    console.error(error);
  }
};

const deleteDisciplineTable = (id) => {
  fetch(`${baseUrl}/disciplinas/${id}`, {
    method: "DELETE",
  }).catch((error) => {
    alert("Ocorreu um erro. Tente mais tarde.");
    console.error(error);
  });
};

const editedDisciplineModal = (id) => {
  fetch(`${baseUrl}/disciplinas/${id}`)
    .then((resp) => resp.json())
    .then((data) => {
      const { nome, cargaHoraria, professor, status, observacoes } = data;
      disciplineModalTitle.innerHTML = `Editar Disciplina ${nome}`;
      document.querySelector("#nome").value = nome;
      document.querySelector("#cargaHoraria").value = cargaHoraria;
      document.querySelector("#professor").value = professor;
      document.querySelector("#status").value = status;
      document.querySelector("#observacoes").value = observacoes;
      saveDisciplineButton.innerHTML = "Salvar";
      openDisciplineModal();
      saveDisciplineData(`${baseUrl}/disciplinas/${id}`, "PUT");
    })
    .catch((error) => {
      alert("Ocorreu um erro. Tente mais tarde.");
      console.error(error);
    });
};

loadDisciplineTable();
