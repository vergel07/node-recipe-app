import { getRecipe } from './recipe'
import { getFilters } from './filters'

const generateRecipeDOM = (recipe) => {
    const recipeEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')

    // For Recipe Title
    textEl.textContent = recipe.title.length > 0 ? recipe.title : 'Untitled Recipe'
    textEl.classList.add('list-item__title')
    recipeEl.appendChild(textEl)

    // For recipe edit link
    recipeEl.setAttribute('href', `/edit.html#${recipe.id}`)
    recipeEl.classList.add('list-item')

    // Setup the status message
    statusEl.textContent= generateSummaryIngredients(recipe)
    statusEl.classList.add('list-item__subtitle')
    recipeEl.appendChild(statusEl)

    return recipeEl
}

const renderRecipe = () => {
    const divEl = document.querySelector('#recipe')
    const filteredRecipe = getRecipe().filter((reci) => reci.title.toLowerCase().includes(getFilters().searchText.toLowerCase()))

    divEl.innerHTML = ''

    if (filteredRecipe.length > 0) {
        filteredRecipe.forEach((recipe) => {
            const recipeEl = generateRecipeDOM(recipe)
            divEl.appendChild(recipeEl)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No recipes to show'
        emptyMessage.classList.add('empty-message')
        divEl.appendChild(emptyMessage)
    }
}

const generateSummaryIngredients = (recipe) => {
        const msg = recipe.ingredients.filter((ing) => ing.ingredient.includes(''))
        let tr = 0
        let fs = 0

        msg.forEach((stat) => {
            if (stat.status === true ) {
                tr += 1
            } else {
                fs += 1
            }
        })
        console.log(msg)
        if ( fs >= 0 && tr === 0) {
            return `You have none of the ingredients`
        } else if (fs === 0 && tr > 0) {
            return `You have all the ingredients`
        } else {
            return `You have some of the ingredients`
        }
        
    // const filterRecipe = recipe.filter((rec) => rec.title.includes(''))
    // return filterRecipe.forEach((recipe) => {
    //     const msg = recipe.ingredients.filter((ing) => ing.ingredient.includes(''))
    //     let tr = 0
    //         let fs = 0
    //     msg.forEach((stat) => {
            
    //         if (stat.status === true ) {
    //             tr += 1
    //         } else {
    //             fs += 1
    //         }
    //     })

    //     if ( fs >= 0 && tr === 0) {
    //         return `You have none of the ingredients`
    //     } else if (fs === 0 && tr > 0) {
    //         return `You have all the ingredients`
    //     } else {
    //         return `You have some of the ingredients`
    //     }
        
    // })
    
}

export{ renderRecipe, generateRecipeDOM }

