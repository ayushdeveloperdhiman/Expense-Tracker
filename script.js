const totalIncome = document.getElementById("total-income");
const totalexpense = document.getElementById("total-expense");
const netBalance = document.getElementById("net-balance");
const incomeForm = document.getElementById("income-form");
const expenseForm = document.getElementById("expense-form");
const incomeTransaction = document.getElementById("income-list");
const expenseTransaction = document.getElementById("expense-list");

let incomes = JSON.parse(localStorage.getItem("incomes")) || [];
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

incomeForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const date = document.getElementById("income-date").value;
  const description = document.getElementById("income-description").value;
  const amount = parseFloat(document.getElementById("income-amount").value);
  const category = document.getElementById("income-category").value;

  incomes.push({ id: Date.now(), date, description, amount, category });
  updateUi();
  incomeForm.reset();
});

expenseForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const date = document.getElementById("expense-date").value;
  const description = document.getElementById("expense-description").value;
  const amount = parseFloat(document.getElementById("expense-amount").value);
  const category = document.getElementById("expense-category").value;

  expenses.push({ id: Date.now(), date, description, amount, category });
  updateUi();
  expenseForm.reset();
});

function updateUi() {
  localStorage.setItem("incomes", JSON.stringify(incomes));
  localStorage.setItem("expenses", JSON.stringify(expenses));
  incomeTransaction.innerHTML = "";
  expenseTransaction.innerHTML = "";
  let incomeTotal = 0;
  let expenseTotal = 0;

  incomes.forEach((transaction) => {
    incomeTotal += transaction.amount;
    const li = document.createElement("li");
    li.innerHTML = `${transaction.date} - ${transaction.description} (${transaction.category}): ₹${transaction.amount}
      <button onclick="deleteIncome(${transaction.id})">❌</button>`;

    incomeTransaction.appendChild(li);
  });

  expenses.forEach((transaction) => {
    expenseTotal += transaction.amount;
    const li = document.createElement("li");
    li.innerHTML = `${transaction.date} - ${transaction.description} (${transaction.category}): ₹${transaction.amount}
      <button onclick="deleteExpense(${transaction.id})">❌</button>`;

    expenseTransaction.appendChild(li);
  });
  totalIncome.innerText = incomeTotal;
  totalexpense.innerText = expenseTotal;
  netBalance.innerText = incomeTotal - expenseTotal;
}

function deleteIncome(id) {
  incomes = incomes.filter((transaction) => transaction.id !== id);
  updateUi();
}

function deleteExpense(id) {
  expenses = expenses.filter((transaction) => transaction.id != id);
  updateUi();
}

updateUi();
