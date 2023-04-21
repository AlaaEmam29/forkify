import 'core-js/stable'
import 'regenerator-runtime/runtime'
import * as module from './module.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginateView from './views/paginateView.js';
import bookmarksView from "./views/bookmarksView.js"
import addRecipeView from './views/addRecipeView.js';
import { CLOSE_POP_Time } from './config.js';
if (module.hot) {
  module.hot.accept()
}
async function fetchSearchRecipe(e) {
  e.preventDefault();
  try {
    const value = searchView.query;
    if (!value) {
      resultView.renderError('You Must Enter valid data');
      return
    };
    resultView.renderSpinner()    
    await module.loadSearchRecipe(value)
    const recipes = module.getSearchResultPage(module.state.search.results);
    resultView.render(recipes[module.state.search.page]);
    paginateView.render(module.state.search);
  } catch (error) {
    resultView.renderError(error.message)
    throw error;

  }
}


async function controllerRecipe() {
  const randomId = [
    '5ed6604591c37cdc054bcd45',
    '5ed6604591c37cdc054bcac4',
    '5ed6604591c37cdc054bcc7a',
    '5ed6604691c37cdc054bd085',
  ];
  
  const idx = Math.floor(Math.random() * randomId.length);
  const id = window.location.hash?.substring(1) || randomId[idx]
  try {
    recipeView.renderSpinner();
    
    await module.loadRecipe(id);
    recipeView.render(module.state.recipe);

  } catch (error) {
    recipeView.renderError();
  }
}



function toggleBtns(i) {
  const recipes = module.getSearchResultPage(module.state.search.results);
  let currentPage = (module.state.search.page += i);
  paginateView.render(module.state.search);
  resultView.render(recipes[currentPage]);
  
}
paginateView.addHandlerToggle(toggleBtns)
 function controllerServings(newServing) {
  module.updateServing(newServing);
  recipeView.update(module.state.recipe);
  
 }
const addNewBookMarks = () => {
  if (!module.state.recipe.bookmarked) {
    
    module.addBookmark(module.state.recipe)
  }
  else {
    module.deleteBookmark(module.state.recipe.id);
  }
  recipeView.update(module.state.recipe);
  bookmarksView.render(module.state.bookmarks)
  
}

const controllerAddNewRecipe = async(newRecipe) =>{
  try {
    addRecipeView.renderSpinner()
    await module.uploadRecipe(newRecipe);
    addRecipeView.renderSuccessMessage()
    
    setTimeout(() => {
      addRecipeView._addCloseLogic()
    }, CLOSE_POP_Time * 1000)
    window.history.pushState(null, '', `#${module.state.recipe.id}`);
    recipeView.render(module.state.recipe) 
    
    
  } catch (error) {
    addRecipeView.renderError(error )
  }
}
const init = async () => {
  recipeView.addHandlerRenderEvent(controllerRecipe);
  searchView.addHandlerSearchEvent(fetchSearchRecipe);
  recipeView.addServicesEvent(controllerServings);
  recipeView.addBookMarksHandler(addNewBookMarks);
  addRecipeView.addUploadHandler(controllerAddNewRecipe);
    bookmarksView.render(module.state.bookmarks);
 

};
init();


