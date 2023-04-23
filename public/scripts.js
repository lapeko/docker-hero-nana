const id = 1;
let user;

initUser();

const mainEl = document.querySelector(".main");
const editEl = document.querySelector(".edit");
editEl.style.display = "none";

const editBtnEl = document.querySelector(".edit-button");
editBtnEl.addEventListener("click", editUser);

const saveEl = document.querySelector(".save");
saveEl.addEventListener("click", save);

async function initUser() {
  const res = await fetch(`/user/${id}`);
  user = await res.json();
  showUser();
}

function showUser() {
  const nameEls = document.querySelectorAll(".name");
  Array.from(nameEls).forEach((e) => (e.innerHTML = user.name));

  const ageEls = document.querySelectorAll(".age");
  Array.from(ageEls).forEach((e) => (e.innerHTML = user.age));
}

function editUser() {
  editEl.style.display = "block";
  mainEl.style.display = "none";
  const editNameEl = document.querySelector(".edit-name");
  const editAgeEl = document.querySelector(".edit-age");
  editNameEl.value = user.name;
  editAgeEl.value = user.age;
}

async function save() {
  const editNameEl = document.querySelector(".edit-name");
  const editAgeEl = document.querySelector(".edit-age");
  const name = editNameEl.value;
  const age = editAgeEl.value;
  const res = await fetch(`/user/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, age }),
  });
  if (!res.ok) window.alert("Some error");
  user = await res.json();
  editEl.style.display = "none";
  mainEl.style.display = "block";
  showUser();
}
