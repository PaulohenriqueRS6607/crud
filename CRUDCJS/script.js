const modal = document.querySelector(".modal-container");
const tbody = document.querySelector("tbody");
const sId = document.querySelector("#m-id");
const sNome = document.querySelector("#m-nome");
const sAutor = document.querySelector("#m-autor");
const btnSalvar = document.querySelector("#btnSalvar");

let itens;
let id;

function openModal(edit = false, index = 0) {
  modal.classList.add("active");

  modal.onclick = (e) => {
    if (e.target.className.indexOf("modal-container") !== -1) {
      modal.classList.remove("active");
    }
  };

  if (edit) {
    sId.value = itens[index].id;
    sNome.value = itens[index].nome;
    sAutor.value = itens[index].autor;
    id = index;
  } else {
    sId.value = "";
    sNome.value = "";
    sAutor.value = "";
  }
}

function editItem(index) {
  openModal(true, index);
}

function deleteItem(index) {
  itens.splice(index, 1);
  setItensBD();
  loadItens();
}

function insertItem(item, index) {
  let tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${item.id}</td>
    <td>${item.nome}</td>
    <td>${item.autor}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `;
  tbody.appendChild(tr);
}

btnSalvar.onclick = (e) => {
  if (sId.value == "" || sNome.value == "" || sAutor.value == "") {
    return;
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].id = sId.value;
    itens[id].nome = sNome.value;
    itens[id].autor = sAutor.value;
  } else {
    itens.push({ id: sId.value, nome: sNome.value, autor: sAutor.value });
  }

  setItensBD();

  modal.classList.remove("active");
  loadItens();
  id = undefined;
};

function loadItens() {
  itens = getItensBD();
  tbody.innerHTML = "";
  itens.forEach((item, index) => {
    insertItem(item, index);
  });
}

const getItensBD = () => JSON.parse(localStorage.getItem("dbfunc")) ?? [];
const setItensBD = () => localStorage.setItem("dbfunc", JSON.stringify(itens));

loadItens();