import { getAllData, postData } from "../indexDB/controllers.js";

let countClick = 0;
const list = document.getElementById("list");
const showGPAResult = document.getElementById("show-gpa-result");

const buttonAdd = document.getElementById("buttonAdd");
const buttonReset = document.getElementById("buttonReset");
const buttonCal = document.getElementById("buttonCal");


buttonAdd.addEventListener("click", () => {
  list.classList.remove("hidden");
  list.insertAdjacentHTML(
    "beforeend",
    `
        <div class="row grid grid-cols-3 gap-3 pt-3">
          <input type="text" placeholder="Subject"
            class="subject bg-base border border-stone-200 px-3 py-2 rounded-sm w-full outline-none focus:border-lime focus:ring-1 focus:ring-lime/20 transition-all duration-150"/>

          <select
            class="gpa bg-base border border-stone-200 px-3 py-3 rounded-sm w-full outline-none focus:border-lime focus:ring-1 focus:ring-lime/20 transition-all duration-150">
            <option value="" disabled selected>GPA</option>
            <option value="4">4</option>
            <option value="3.5">3.5</option>
            <option value="3">3</option>
            <option value="2.5">2.5</option>
            <option value="2">2</option>
            <option value="1.5">1.5</option>
            <option value="1">1</option>
          </select>

          <input type="text" placeholder="Credit"
            class="credit bg-base border border-stone-200 px-3 py-2 rounded-sm w-full outline-none focus:border-lime focus:ring-1 focus:ring-lime/20 transition-all duration-150"/>
        </div>
    `,
  );
});

buttonReset.addEventListener("click", () => {
  const rows = document.querySelectorAll(".row");

  rows.forEach((row) => {
    row.querySelector(".subject").value = "";
    row.querySelector(".gpa").value = "";
    row.querySelector(".credit").value = "";
  });
  list.innerHTML = "";
  showGPAResult.classList.add("hidden");
  showGPAResult.innerHTML = "";
  countClick = 0;
});

buttonCal.addEventListener("click", async () => {
  countClick++;
  const rowData = getRowsData();

  if (rowData.length === 0) return

  const avgGPA = calculateGPA(rowData);
  const result = {
    avgGPA,
    allSubjects: rowData,
  };

  postData(result, "gpa");
  const allGPA = await getAllData("gpa");

  if (countClick <= 1 && allGPA.length !== 0) {
    showGPAResult.classList.remove("hidden");
    showGPAResult.insertAdjacentHTML(
      "beforeend",
      `<p>GPA: ${avgGPA.gpa.toFixed(2)}</p>`,
    );
  }
});

function calculateGPA(data) {
  let totalCredit = 0;
  let totalPoint = 0;

  data.forEach((d) => {
    totalPoint += d.gpa * d.credit;
    totalCredit += d.credit;
  });

  const gpa = totalPoint / totalCredit;
  return {
    gpa,
    totalPoint,
    totalCredit,
  };
}

function getRowsData() {
  const rows = document.querySelectorAll(".row");
  const data = [];

  rows.forEach((row) => {
    const subject = row.querySelector(".subject").value;
    const gpa = Number(row.querySelector(".gpa").value);
    const credit = Number(row.querySelector(".credit").value);

    if (!subject || !gpa || !credit) return null;

    data.push({ subject, gpa, credit });
  });
  return data;
}