// let infoBudget = document.querySelector('.info-budget');
let infoBox = document.querySelector('.info-box');
let addBudgetBox = document.querySelector('.add-budget-box');






function informationBoxToggle(){
    if(infoBox.style.visibility === "hidden"){
        infoBox.style.visibility = "visible";
    }
    else{
        infoBox.style.visibility = "hidden";
    }
}

function closeInformationBox(){
    infoBox.style.visibility = "hidden";
}


function budgetBoxToggle(){
    if(addBudgetBox.style.visibility === "hidden"){
        addBudgetBox.style.visibility = "visible";
    }
    else{
        addBudgetBox.style.visibility = "hidden";
    }
}

function closeBudgetBox(){
    addBudgetBox.style.visibility = "hidden";
}



