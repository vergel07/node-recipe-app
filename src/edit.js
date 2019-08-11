import { initializeEditPage, renderIngredients } from './view-edit';
import { updateRecipe, removeRecipe, getIngredients, createIngredients, loadRecipe } from './recipe';

const recipeID = location.hash.substring(1)
const titleElement = document.querySelector('#recipe-title')
const procedureElement = document.querySelector('#recipe-procedure')
const removeElement = document.querySelector('#remove-recipe')
const formEl = document.querySelector('#ingredient-form')

initializeEditPage(recipeID)
renderIngredients(recipeID)

titleElement.addEventListener('input', (e) => {
    updateRecipe(recipeID, {
        title: e.target.value
    })
})

procedureElement.addEventListener('input', (e) => {
    updateRecipe(recipeID, {
        procedure: e.target.value
    })
})

removeElement.addEventListener('click', (e) => {
    removeRecipe(recipeID)
    location.assign('./index.html')
})

formEl.addEventListener('submit', (e) => {
    e.preventDefault()
    const ingredient = e.target.elements.ingredientText.value.trim()
    if (ingredient.length > 0){
        createIngredients(recipeID, ingredient)
        renderIngredients(recipeID)
        e.target.elements.ingredientText.value = ''
    }
})

window.addEventListener('storage', (e) => {
    if (e.key === 'recipe') {
        loadRecipe()
        initializeEditPage(recipeID)
        renderIngredients(recipeID)
    }
})

