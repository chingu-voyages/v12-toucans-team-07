var firebaseConfig = {
  apiKey: "AIzaSyBDSksPKqYIvv3VZdN-3Gp6eYlGK19MY9M",
  authDomain: "chingu-budget.firebaseapp.com",
  databaseURL: "https://chingu-budget.firebaseio.com",
  projectId: "chingu-budget",
  storageBucket: "chingu-budget.appspot.com",
  messagingSenderId: "366448320990",
  appId: "1:366448320990:web:88ddcdbfa46cbdb99b3d4f",
  measurementId: "G-N37DBYNFJZ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// let infoBudget = document.querySelector('.info-budget');
const DATABASE_REF = firebase.database().ref();
const INFO_BOX = document.querySelector(".info-box");
const ADD_BUDGET_BOX = document.querySelector(".add-budget-box");
const SAVE_BUDGET = document.querySelector("#budget-submit");
const CANCEL_BUDGET = document.querySelector("#budget-cancel");
const BUDGET_NAME = document.querySelector("#budget-name");
const BUDGET_VALUE = document.querySelector("#budget-value");
const ADD_EXPENSE_BOX = document.querySelector(".add-expense-box");
const SAVE_EXPENSE = document.querySelector("#expense-submit");
const CANCEL_EXPENSE = document.querySelector("#expense-cancel");
const EXPENSE_NAME = document.querySelector("#expense-name");
const EXPENSE_VALUE = document.querySelector("#expense-value");
const USER_IMAGE = document.querySelector(".user-image");
const USER_NAME = document.querySelector(".user-name");

let userName;
let userImageUrl;
let uid;
let expenseId;
let viewExpenseID;

function signout() {
  firebase
    .auth()
    .signOut()
    .then(function() {
      if (confirm("Do you wish to leave?")) {
        window.location = "index.html";
      }
    });
}

function informationBoxToggle() {
  if (INFO_BOX.style.visibility === "hidden") {
    INFO_BOX.style.visibility = "visible";
  } else {
    INFO_BOX.style.visibility = "hidden";
  }
}

function closeInformationBox() {
  INFO_BOX.style.visibility = "hidden";
}

function budgetBoxToggle() {
  if (ADD_BUDGET_BOX.style.visibility === "hidden") {
    ADD_BUDGET_BOX.style.visibility = "visible";
  } else {
    ADD_BUDGET_BOX.style.visibility = "hidden";
    BUDGET_NAME.value = "";
    BUDGET_VALUE.value = "";
  }
}

function closeBudgetBox() {
  ADD_BUDGET_BOX.style.visibility = "hidden";
  BUDGET_NAME.value = "";
  BUDGET_VALUE.value = "";
}

function saveBudgetDetails() {
  let budgetAddDate = new Date();
  let budgetTimeStamp = budgetAddDate.toLocaleString();

  if (BUDGET_NAME.value == "") {
    alert("Please mention 'Budget Name'");
  } else if (BUDGET_VALUE.value == "") {
    alert("Please mention 'Budget Value'");
  } else {
    budgetStoreRef = DATABASE_REF.child(
      "BudgetManager/users/" + uid + "/Budgets/"
    );
    budgetStoreRef.push({
      BudgetName: BUDGET_NAME.value,
      BudgetValue: BUDGET_VALUE.value,
      BudgetTimestamp: budgetTimeStamp
    });
    closeBudgetBox();
  }
}

function expenseBoxToggle() {
  if (ADD_EXPENSE_BOX.style.visibility === "hidden") {
    ADD_EXPENSE_BOX.style.visibility = "visible";
  } else {
    ADD_EXPENSE_BOX.style.visibility = "hidden";
    EXPENSE_NAME.value = "";
    EXPENSE_VALUE.value = "";
  }
}

function closeExpenseBox() {
  ADD_EXPENSE_BOX.style.visibility = "hidden";
  EXPENSE_NAME.value = "";
  EXPENSE_VALUE.value = "";
}

function storeExpense(clickedID) {
//  console.log("The clicked add new expense button's id is : " + clickedID);
  expenseID = clickedID;
}

function viewExpense(clickedID, budgetName, budgetValue) {
  console.log("The clicked view expense button's id is : " + clickedID);
  viewExpenseID = clickedID;


  $(".expenses-display-section").append("<div class='budget-details'><h2>Budget Name :"+budgetName+"</h2><h2>Budget Value : "+budgetValue+"</div>");

  expenseRetrieveRef = DATABASE_REF.child(
    "BudgetManager/users/" + uid + "/Budgets/" + viewExpenseID + "/Expenses"
  );

  expenseRetrieveRef.on("child_added", snapshotExpenses => {
    retrievedExpenseData = snapshotExpenses.val();
    retrievedExpenseKey = snapshotExpenses.key;

    
   


    $(".expenses-display-section").append(
        "<div class='expense-card'><h3>" +
          retrievedExpenseData.ExpenseName +
          "</h3><h5>Expense Value : " +
          retrievedExpenseData.ExpenseValue +
          "</h5><h5>Created On : " +
          retrievedExpenseData.ExpenseTimestamp +
          "</h5></div>"
      );
  });

}


function clearExpensesSection(){
    $(".expenses-display-section").empty();
}

function saveExpenseDetails() {
  let expenseAddDate = new Date();
  let expenseTimeStamp = expenseAddDate.toLocaleString();

  if (EXPENSE_NAME.value == "") {
    alert("Please mention 'Expense Name'");
  } else if (EXPENSE_VALUE.value == "") {
    alert("Please mention 'Expense Value'");
  } else {
    expenseStoreRef = DATABASE_REF.child(
      "BudgetManager/users/" + uid + "/Budgets/" + expenseID + "/Expenses"
    );
    expenseStoreRef.push({
      ExpenseName: EXPENSE_NAME.value,
      ExpenseValue: EXPENSE_VALUE.value,
      ExpenseTimestamp: expenseTimeStamp
    });
    closeExpenseBox();
  }
}

firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    userName = firebaseUser.displayName;
    userImageUrl = firebaseUser.photoURL;
    uid = firebaseUser.uid;

    //Updating User Info
    USER_IMAGE.src = userImageUrl;
    USER_NAME.innerHTML = "Welcome, " + userName;

    //Retrieving Budget Info
    budgetRetrieveRef = DATABASE_REF.child(
      "BudgetManager/users/" + uid + "/Budgets"
    );
    budgetRetrieveRef.on("child_added", snapshotBudget => {
      retrievedBudgetData = snapshotBudget.val();
      retrievedBudgetKey = snapshotBudget.key;

      $(".budgets-display-section").append(
        "<div class='budget-card'><h3>" +
          retrievedBudgetData.BudgetName +
          "</h3><h5>Budget Value : " +
          retrievedBudgetData.BudgetValue +
          "</h5><h5>Created On : " +
          retrievedBudgetData.BudgetTimestamp +
          "</h5><button id=" +
          retrievedBudgetKey +
          " onClick='clearExpensesSection();viewExpense(this.id,\""+retrievedBudgetData.BudgetName+"\","+retrievedBudgetData.BudgetValue+")'>View Expense History</button><button id=" +
          retrievedBudgetKey +
          " class='add-expense' onclick='expenseBoxToggle();storeExpense(this.id)'><i class='fas fa-plus-circle'></i></button></div>"
      );

      //+++++++++testing expenses under a particular budget+++++++++++++++++
    //   expensesData = snapshotBudget.child("Expenses");
    //   if (expensesData.exists()) {
    //     expensesData.forEach(function(snapshotExpense) {
    //       retrievedExpensekey = snapshotExpense.key;
    //       retrievedExpenseData = snapshotExpense.val();

    //       $(".expenses-display-section").append(
    //         "<div class='budget-card'><h3>" +
    //           retrievedExpenseData.ExpenseName +
    //           "</h3><h5>Budget Value : " +
    //           retrievedExpenseData.ExpenseValue +
    //           "</h5><h5>Created On : " +
    //           retrievedExpenseData.ExpenseTimestamp +
    //           "</h5></div>"
    //       );
    //     });
    //   }
      //+++++++testing ends for expenses under a particular budget++++++++++++++++
    });
  } else {
    console.log("Firebase User is not logged in");
  }
});
