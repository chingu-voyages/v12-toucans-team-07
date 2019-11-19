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
const INFO_BOX = document.querySelector('.info-box');
const ADD_BUDGET_BOX = document.querySelector('.add-budget-box');
const SAVE_BUDGET = document.querySelector('#budget-submit');
const CANCEL_BUDGET = document.querySelector('#budget-cancel');
const BUDGET_NAME = document.querySelector('#budget-name');
const BUDGET_VALUE = document.querySelector('#budget-value');
const USER_IMAGE = document.querySelector(".user-image");
const USER_NAME = document.querySelector(".user-name");


let userName;
let userImageUrl;
let uid;

function signout(){
    firebase.auth().signOut().then(function(){
        if(confirm("Do you wish to leave?")){
         window.location = "index.html";
     }	
             });
}



function informationBoxToggle(){
    if(INFO_BOX.style.visibility === "hidden"){
        INFO_BOX.style.visibility = "visible";
    }
    else{
        INFO_BOX.style.visibility = "hidden";
    }
}

function closeInformationBox(){
    INFO_BOX.style.visibility = "hidden";
}


function budgetBoxToggle(){
    if(ADD_BUDGET_BOX.style.visibility === "hidden"){
        ADD_BUDGET_BOX.style.visibility = "visible";
    }
    else{
        ADD_BUDGET_BOX.style.visibility = "hidden";
        BUDGET_NAME.value = "";
        BUDGET_VALUE.value = "";
    }
}

function closeBudgetBox(){
    ADD_BUDGET_BOX.style.visibility = "hidden";
    BUDGET_NAME.value = "";
    BUDGET_VALUE.value = "";
}


function saveBudgetDetails(){
	var budgetAddDate = new Date();
			let budgetTimeStamp = budgetAddDate.toLocaleString();
			
			if(BUDGET_NAME.value==""){
				alert("Please mention 'Budget Name'");
			}
			else if(BUDGET_VALUE.value==""){
				alert("Please mention 'Budget Value'");
			}
			else{
			  budgetStoreRef = DATABASE_REF.child("BudgetManager/users/"+uid+"/Budgets/");
			  budgetStoreRef.push({BudgetName:BUDGET_NAME.value, BudgetValue:BUDGET_VALUE.value, BudgetTimestamp:budgetTimeStamp});
			  closeBudgetBox();
			  }
}

firebase.auth().onAuthStateChanged(firebaseUser =>{
		
    if(firebaseUser){
        userName = firebaseUser.displayName;
        userImageUrl = firebaseUser.photoURL;
        uid = firebaseUser.uid;
        
        USER_IMAGE.src = userImageUrl;
        USER_NAME.innerHTML = "Welcome, "+ userName;

        
    }
    else{
        console.log("Firebase User is not logged in");
    }
    
});



