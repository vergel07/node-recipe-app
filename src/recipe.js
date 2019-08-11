import uuidv4 from 'uuid/v4'

// Setup the empty array for recipe
let recipe = []

//load recipe
const loadRecipe = () => {
    const recipeJSON = localStorage.getItem('recipe')

    try {
        recipe = recipeJSON ? JSON.parse(recipeJSON) : []
    } catch (e){
        recipe = []
    }
}

//save recipe
const saveRecipe = () => {
    localStorage.setItem('recipe', JSON.stringify(recipe))
}

// get recipe
const getRecipe = () => recipe

// get ingredients
const getIngredients = (recipeID) => {
    const reci = recipe.find((rec) => rec.id === recipeID)
    return reci
}

// create recipe
const createRecipe = () => {
    const id = uuidv4()
    recipe.push({
        id: id,
        title: '',
        procedure: '',
        ingredients: []
    })
    saveRecipe()
    return id
}

// create recipe ingredients
const createIngredients = (recipeID, ing = '') => {
    const recipeIndex = recipe.find((rec) => rec.id === recipeID)

    if (recipeIndex) {
        const id = uuidv4()
        recipeIndex.ingredients.push({
            ids: id,
            ingredient: ing,
            status: false
        })
        saveRecipe()
    }
    
}

// remove recipe
const removeRecipe = (id) => {
    const recipeIndex = recipe.findIndex((rec) => rec.id === id)

    if (recipeIndex > -1 ){
        recipe.splice(recipeIndex, 1)
        saveRecipe()
    }
}

// remove recipe ingredients
const removeIngredients = (recipeID, ingID) => {
    const recipeIndex = recipe.find((rec) => rec.id === recipeID)
    const ingIndex = recipeIndex.ingredients.findIndex((rec) => rec.ids === ingID)

    if (recipeIndex) {
        if (ingIndex > -1) {
            recipeIndex.ingredients.splice(ingIndex, 1)
            saveRecipe()
        }
    }
}

// update recipe
const updateRecipe = (id, { title, procedure} ) => {
    const reci = recipe.find((recipe) => recipe.id === id)

    if (!reci){
        return
    }

    if (typeof title === 'string') {
        reci.title = title
    }

    if (typeof procedure === 'string') {
        reci.procedure = procedure
    }

    saveRecipe()
    return reci
}

// update recipe ingredients
const toggleIngredients = (recipeID, ingID) => {
    const reci = recipe.find((recipe) => recipe.id === recipeID)
    const ingre = reci.ingredients.find((rec) => rec.ids === ingID)
    
    if (reci) {
        if (ingre) {
            ingre.status = !ingre.status
            saveRecipe()
        }
    }

}

loadRecipe()

export {loadRecipe, getRecipe, getIngredients, createRecipe, createIngredients, removeRecipe, removeIngredients, updateRecipe, toggleIngredients }