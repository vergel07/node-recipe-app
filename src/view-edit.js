import { getRecipe, getIngredients, toggleIngredients, removeIngredients } from './recipe'

const generateIngredientsDOM = (recipeID, ingredients) => {
    const recipeEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkEl = document.createElement('input')
    const spanEl = document.createElement('span')
    const buttonEl = document.createElement('button')

    // For checkbox of Recipe
    checkEl.setAttribute('type', 'checkbox')
    checkEl.checked = ingredients.status
    containerEl.appendChild(checkEl)
    checkEl.addEventListener('change', (e) => {
        toggleIngredients(recipeID, ingredients.ids)
        renderIngredients(recipeID)
    })

    // For Ingredient title
    spanEl.textContent = ingredients.ingredient 
    containerEl.appendChild(spanEl)
    containerEl.classList.add('list-item__container')
    recipeEl.classList.add('list-item--secondary')
    recipeEl.appendChild(containerEl)

    // For remove button of Ingredient
    buttonEl.textContent = 'remove'
    buttonEl.classList.add('button--third', 'button--text')
    recipeEl.appendChild(buttonEl)
    buttonEl.addEventListener('click', (e) => {
        removeIngredients(recipeID, ingredients.ids)
        renderIngredients(recipeID)
    })

    return recipeEl
}

const renderIngredients = (recipeID) => {
    const divEl = document.querySelector('#ingredients')
    const filteredRecipe = getIngredients(recipeID)
    const filteredIngredients = filteredRecipe.ingredients.filter((rec) => rec.ingredient.includes(''))
    divEl.innerHTML = ''
    
    if (filteredIngredients.length > 0) {
        filteredIngredients.forEach((ingredients) => {
            const ingredientsEl = generateIngredientsDOM(recipeID, ingredients)
            divEl.appendChild(ingredientsEl)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No ingredients to show'
        emptyMessage.classList.add('empty-message')
        divEl.appendChild(emptyMessage)
    }
}

const initializeEditPage = (recipeID) => {
    const titleElement = document.querySelector('#recipe-title')
    const procedureElement = document.querySelector('#recipe-procedure')

    // Validatior for unknown id
    const recipe = getRecipe().find((reci) => reci.id === recipeID)
    if (!recipe) {
        location.assign('/index.html')
    }

    titleElement.value = recipe.title
    procedureElement.value = recipe.procedure
}

export { renderIngredients, generateIngredientsDOM, initializeEditPage }