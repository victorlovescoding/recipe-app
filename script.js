const input = document.getElementById('input');
const button = document.getElementById('button');
const favoriteContainer = document.getElementById('favoriteContainer');
const mealPic = document.getElementById('mealPic');
const mealName = document.getElementById('mealName');
const randomSign = document.getElementById('randomSign');
const searchBar = document.getElementById('searchBar');
const collect = document.getElementById('collect');
const recipeInfoContainer = document.getElementById('recipeInfoContainer');
const closeBtn = document.getElementById('closeBtn');
const recipeInfo = document.getElementById('recipeInfo');
const recipePic = document.getElementById('recipePic');
const indredientContainer = document.getElementById('indredientContainer');
const indredient = document.getElementById('indredient');
const instruction = document.getElementById('instruction');


window.addEventListener('load',randomMeal)

button.addEventListener('click',searchMeal);

searchBar.addEventListener('submit',(e)=>{
  e.preventDefault();
  searchMeal();
})
collect.addEventListener('click',()=>{
  addToFavorite();  
  
})
mealPic.addEventListener('click',()=>{
  recipeInfoContainer.style.display="block";
  recipeContainer.style.display="none"


})

closeBtn.addEventListener('click',()=>{
  recipeInfoContainer.style.display="none";
  recipeContainer.style.display="block"

})

function addToFavorite(){
  if(collect.className==="fa-regular fa-bookmark"){
  collect.className = "fa-solid fa-bookmark";
  const li = document.createElement('li');
  li.id="favCardContainer";

  li.innerHTML = `
    
    <img id="favCardImg" src="${mealPic.src}">
    <span id="favCardName">${mealName.textContent}</span>
  `
  //<button id="removeFavBtn" type="button">X</button>

  favoriteContainer.appendChild(li);
  
 
  
  //點favorite時跳出recipe
  li.addEventListener('click',()=>{
    
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${li.innerText}`)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    recipeInfoContainer.style.display="block";
    recipePic.src = data.meals[0].strMealThumb;
    instruction.textContent = data.meals[0].strInstructions;
    indredientContainer.innerHTML = "";
    let num=1;
     for(let i=1;i<20;i++){
        
        let strIngredient = "strIngredient"+num;
        let strMeasure = "strMeasure"+num;
        if(data.meals[0][strIngredient]){
          const indredient = document.createElement('li');
          indredient.id="indredient";
          indredient.innerHTML = `
          <li id="indredient">${data.meals[0][strIngredient]}${" "} ${data.meals[0][strMeasure]}</li>
          `
          indredientContainer.appendChild(indredient);
        }else{
          return
        }
        
        num++;
     }
    
  });
  })
  

  //右鍵favorite時刪除recipe
  li.addEventListener('contextmenu',(e)=>{
    e.preventDefault();
    confirm("You want to delete?")
    if(confirm){
      li.remove();
      collect.className = "fa-regular fa-bookmark";
    }
    
  })
  }

}  
  
// } else if(collect.className === "fa-solid fa-bookmark"){
//   collect.className = "fa-regular fa-bookmark";
//   const favCardContainer = document.getElementById('favCardContainer');
//   favCardContainer.remove();
// }}



function randomMeal(){
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {

    mealName.textContent = data.meals[0].strMeal;
    mealPic.src = data.meals[0].strMealThumb;
    recipeMealName.textContent = data.meals[0].strMeal;
    recipePic.src = data.meals[0].strMealThumb;
    instruction.textContent = data.meals[0].strInstructions;
    randomSign.textContent = "Random Recipe";
    let num=1;
     for(let i=1;i<20;i++){
        
        let strIngredient = "strIngredient"+num;
        let strMeasure = "strMeasure"+num;
        if(data.meals[0][strIngredient]){
          const indredient = document.createElement('li');
          indredient.id="indredient";
          indredient.innerHTML = `
          <li id="indredient">${data.meals[0][strIngredient]}${" "} ${data.meals[0][strMeasure]}</li>
          `
          indredientContainer.appendChild(indredient);
        }else{
          return
        }
        
        num++;
     }
  });
}




function searchMeal(){
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    randomSign.style.display="none"
    mealName.textContent = data.meals[0].strMeal;
    mealPic.src = data.meals[0].strMealThumb;
    recipeMealName.textContent = data.meals[0].strMeal;
    recipePic.src = data.meals[0].strMealThumb;
    indredientContainer.innerHTML = ""
    let num=1;
     for(let i=1;i<20;i++){
        
        let strIngredient = "strIngredient"+num;
        let strMeasure = "strMeasure"+num;
        if(data.meals[0][strIngredient]){
          const indredient = document.createElement('li');
          indredient.id="indredient";
          indredient.innerHTML = `
          <li id="indredient">${data.meals[0][strIngredient]}${" "} ${data.meals[0][strMeasure]}</li>
          `
          indredientContainer.appendChild(indredient);
        }else{
          return
        }
        
        num++;
     }
  });
  input.value="";
  collect.className = "fa-regular fa-bookmark";

  
}

//https://www.themealdb.com/api/json/v1/1/random.php
//www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
//https://www.themealdb.com/api/json/v1/1/search.php?s=pizza

