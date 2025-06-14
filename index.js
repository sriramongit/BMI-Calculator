let age = document.querySelector(".js-age");
let height = document.querySelector(".js-height");
let weight = document.querySelector(".js-weight");
let categoryEl = document.querySelector(".category");
let bmi = 0;
let category = "";
let error;
let errorTimeoutID = null; 

//click event listener
document.querySelector(".js-calculate-bmi").addEventListener("click", RenderOutputs);

//Key event listener
document.querySelector("body").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    RenderOutputs();
  } else if (event.key === "Delete") {
    resetValues();
  }
});

//rendering outputs
function RenderOutputs() {
  if (!bmi) {
    document.querySelector(".bmi").innerHTML = "N.A";
    document.querySelector(".category").innerHTML = "N.A";
    document.querySelector(".category").style.color = "black";
  }

  if (age.value === "" || age.value === "0") {
    error = "age";
    validateError(error);
    return;
  } else if (height.value === "" || height.value === "0") {
    error = "height";
    validateError(error);
    return;
  } else if (weight.value === "" || weight.value === "0") {
    error = "weight";
    validateError(error);
    return;
  }

  bmi = BMICalculation(Number(height.value), Number(weight.value));
  document.querySelector(".bmi").innerHTML = Math.round(bmi * 10) / 10;

  let gender = Gender();
  if (gender === "male") {
    category = CategoryMale(bmi);
    CategoryFlag(category);
  } else if (gender === "female") {
    category = CategoryFemale(bmi);
    CategoryFlag(category);
  } else {
    error = "Gender";
    validateError(error);
  }
}

//Adding colour codes to categories 
function CategoryFlag(category) {
  if (category === "underweight" || category === "overweight") {
    categoryEl.style.color = "rgb(255, 217, 0)";
  } else if (category === "normal") {
    categoryEl.style.color = "green";
  } else if (category === "obese") {
    categoryEl.style.color = "red";
  } else {
    categoryEl.style.color = "black";
  }

  categoryEl.innerHTML = category;
}

//calculating BMI using formula 
function BMICalculation(height, weight) {
  return weight / Math.pow(height / 100, 2);
}

//validating category according to bmi for males 
function CategoryMale(bmi) {
  if (!bmi) {
    return "N.A";
  }

  if (bmi < 18.5) {
    return "underweight";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return "normal";
  } else if (bmi >= 25.0 && bmi < 29.9) {
    return "overweight";
  } else {
    return "obese";
  }
}
//validating category according to bmi for females 
function CategoryFemale(bmi) {
  if (!bmi) {
    return "N.A";
  }

  if (bmi < 18.5) {
    return "underweight";
  } else if (bmi >= 18.5 && bmi < 23.9) {
    return "normal";
  } else if (bmi >= 24 && bmi < 28.9) {
    return "overweight";
  } else {
    return "obese";
  }
}

//resetting all values
function resetValues() {
  age.value = "";
  weight.value = "";
  height.value = "";
  bmi = null;
  category = null;
  document
    .querySelectorAll('input[name="gender"]')
    .forEach((r) => (r.checked = false));

  RenderOutputs();
}

//reset button
document.querySelector(".js-reset").addEventListener("click", resetValues);

//Getting gender through radio buttons
function Gender() {
  const selected = document.querySelector('input[name="gender"]:checked');
  if (selected) {
    return selected.value; // "male" or "female"
  } else {
    return null; // No selection
  }
}

//Error Handling
function validateError(error) {
  // Clear any previous timeout
  if (errorTimeoutID) {
    clearTimeout(errorTimeoutID);
  }

  if (error === "Gender") {
    document.querySelector(".error").innerHTML = `Please Select ${error}`;
    document.querySelector(".error").style.margin = "10px";
  } else if (error === "age" || error === "height" || error === "weight") {
    document.querySelector(".error").innerHTML = `Please enter ${error}`;
    document.querySelector(".error").style.margin = "10px";
  }

  // Set a new timeout and store its ID
  errorTimeoutID = setTimeout(() => {
    document.querySelector(".error").innerHTML = "";
    document.querySelector(".error").style.margin = "0px";
    errorTimeoutID = null; // Optional: reset the ID
  }, 2000);
}
