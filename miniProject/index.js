import { getAllData, postData, deleteData, updateData } from "../indexDB/controllers.js";

//
// Variables
//
const list = document.getElementById("list");
const showGPAResult = document.getElementById("show-gpa-result");
const showHistory = document.getElementById("show-history");
const buttonAdd = document.getElementById("buttonAdd");
const buttonReset = document.getElementById("buttonReset");
const buttonCal = document.getElementById("buttonCal");

//
// Methods
//
function handleAdd() {
  list.classList.remove("hidden");
  list.insertAdjacentHTML(
    "beforeend",
    `
        <div class="row grid grid-cols-3 gap-3 pt-3">
          <input
            type="text"
            placeholder="Subject"
            class="subject bg-base border border-stone-200 px-3 py-2 rounded-sm w-full outline-none focus:border-lime focus:ring-1 focus:ring-lime/20 transition-all duration-150 text-sm"
          />
          <select
            class="gpa bg-base border border-stone-200 px-3 py-2 rounded-sm w-full outline-none focus:border-lime focus:ring-1 focus:ring-lime/20 transition-all duration-150 text-sm"
          >
            <option value="" disabled selected>GPA</option>
            <option value="4">4</option>
            <option value="3.5">3.5</option>
            <option value="3">3</option>
            <option value="2.5">2.5</option>
            <option value="2">2</option>
            <option value="1.5">1.5</option>
            <option value="1">1</option>
          </select>
          <input
            type="text"
            placeholder="Credit"
            class="credit bg-base border border-stone-200 px-3 py-2 rounded-sm w-full outline-none focus:border-lime focus:ring-1 focus:ring-lime/20 transition-all duration-150 text-sm"
          />
        </div>`,
  );
}

// ------------------------------------------------

function handleReset() {
  list.innerHTML = "";
  list.classList.add("hidden");
  showGPAResult.classList.add("hidden");
  showGPAResult.innerHTML = "";
}

// ------------------------------------------------

async function handleCal() {
  const rowData = getRowsData();

  if (rowData.length === 0) {
    throw new Error("Data Empty");
  }

  const avgGPA = calculateGPA(rowData);

  await postData({ avgGPA, allSubjects: rowData }, "gpa");
  const allGPA = await getAllData("gpa");

  showGPAResult.classList.remove("hidden");
  showGPAResult.innerHTML = `<p>GPA: ${avgGPA.gpa.toFixed(2)}</p>`;
}

// ------------------------------------------------

function getRowsData() {
  const rows = document.querySelectorAll(".row");
  let data = [];

  rows.forEach((row) => {
    const subject = row.querySelector(".subject").value;
    const gpa = Number(row.querySelector(".gpa").value);
    const credit = Number(row.querySelector(".credit").value);

    if (!subject || gpa <= 0 || credit <= 0) return;

    data.push({ subject, gpa, credit });
  });

  return data;
}

// ------------------------------------------------

function calculateGPA(data) {
  let totalCredit = 0;
  let totalPoint = 0;

  data.forEach(function (d) {
    totalPoint += d.gpa * d.credit;
    totalCredit += d.credit;
  });

  return {
    gpa: totalPoint / totalCredit,
    totalPoint,
    totalCredit,
  };
}

// ------------------------------------------------

function renderHistory(data) {
  if (data.length === 0) return;

  showHistory.classList.remove("hidden");

  let html = "";

  for (let i = 0; i < data.length; i++) {
    const { avgGPA, allSubjects, id } = data[i];

    html += `<div class="bg-white overflow-hidden rounded-md border border-stone-200 shadow-lg mt-3 p-6">
      <p>GPA: ${avgGPA.gpa.toFixed(2)} | Credits: ${avgGPA.totalCredit}</p>
    `;

    for (let j = 0; j < allSubjects.length; j++) {
      const { subject, gpa, credit } = allSubjects[j];

      html += `<div>
        <p>Subject: ${subject}</p>
        <p>S-GPA: ${gpa}</p>
        <p>Credit: ${credit}</p>
      </div>`;
    }

    html += `
      <p>id: ${id}</p>
      <button class="delete-btn" id="delete-${id}">Delete</button>
    </div>`;
  }

  showHistory.insertAdjacentHTML("beforeend", html);

  const buttons = showHistory.querySelectorAll(".delete-btn");
  console.log(buttons)

  for (let i = 0; i < buttons.length; i++) {
    const id = data[i].id;

    buttons[i].addEventListener("click", async () => {
       await deleteData(id, "gpa");
    });
  }
}

// ------------------------------------------------

async function init() {
  const data = await getAllData("gpa");
  renderHistory(data);
}

// ------------------------------------------------

//
// Inits & Event Listeners
//
buttonAdd.addEventListener("click", handleAdd);
buttonReset.addEventListener("click", handleReset);
buttonCal.addEventListener("click", handleCal);

init();