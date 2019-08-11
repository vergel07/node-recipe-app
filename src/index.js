import { loadRecipe, createRecipe} from './recipe'
import { setFilters} from './filters'
import { renderRecipe } from './view-index'

renderRecipe()

document.querySelector('#add-recipe').addEventListener('click', (e) => {
    const id = createRecipe()
    location.assign(`/edit.html#${id}`)
})

document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderRecipe()
})

window.addEventListener('storage', (e) => {
    if (e.key === 'recipe') {
        loadRecipe()
        renderRecipe()
    }
})
