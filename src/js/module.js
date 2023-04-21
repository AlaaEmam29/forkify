import { RES_PAR_PAGE } from './config.js';
import { AJAX } from './helper.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultPerPage: RES_PAR_PAGE,
    page: 0,
    numberOfPages: 0,
    key:false
  },
  bookmarks: [],
};
if (localStorage.getItem("bookmarks")) {
  const data = JSON.parse(localStorage.getItem('bookmarks'));
  data.forEach(d => {
    state.bookmarks.push(d)
  })
}
const createRecipe = recipe => {
  return {
    id: recipe.id,
    title: recipe.title,
    source: recipe.source_url,
    servings: recipe.servings,
    publisher: recipe.publisher,
    ingredients: recipe.ingredients,
    image: recipe.image_url,
    cookingTime: recipe.cooking_time,
    ...(recipe.key && {key : recipe.key})
  };
};
export const loadRecipe = async (id) => {
  try {
      const recipeData = await AJAX('id', id);

      let {
        data: { recipe },
      } = recipeData;
      state.recipe = createRecipe(recipe)
      
    state.bookmarks.forEach(item => {
      if (item.id == recipe.id) {
      }
    })
    if (state.bookmarks.some(item => item.id === recipe.id)) {
      state.recipe.bookmarked = true     
    }
    else {
            state.recipe.bookmarked = false;

    }
  } catch (error) {
      throw error;
  }
}
export const loadSearchRecipe = async (query) => {
        try {
          state.search.query = query
            const {
              data: { recipes },
          } = await AJAX('search', query);
          const tempRecipes = recipes.map(recipe => {
            return {
              id: recipe.id,
              publisher: recipe.publisher,
              title: recipe.title,
              image: recipe.image_url,
              ...(recipe.key && { key: recipe.key }),
            };
          });
          state.search.results = tempRecipes;
          state.search.page = 0
          
        } catch (error) {
          throw error
        }
}
export const getSearchResultPage = (data) => {
  state.search.numberOfPages = Math.ceil(
    data.length / state.search.resultPerPage
  );
  
return Array.from({ length: state.search.numberOfPages }, (_, index) => {
  const start = index * state.search.resultPerPage;        
  const end = start + state.search.resultPerPage;
  return data.slice(start, end);
});
  
}
export const updateServing = newServing => {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServing) / state.recipe.servings
  });
  state.recipe.servings = newServing
};
const setLocalStorageData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
}
export const addBookmark = (recipe) => {
  
  
  state.bookmarks.push(recipe);
  
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true
  }
  setLocalStorageData('bookmarks', state.bookmarks);
}
export const deleteBookmark = (id) => {
  const index = state.bookmarks.findIndex(item => item.id === id)
  state.bookmarks.splice(index, 1)
  if (id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }

  setLocalStorageData('bookmarks', state.bookmarks);


}
 const init = () => {
  const storage = localStorage.getItem('bookmarks');
  if(storage) state.bookmarks = JSON.parse(storage)
}
export const uploadRecipe = async (newRecipe) =>
{
  try {
    let ingredients = Object.entries(newRecipe)
ingredients =    ingredients.filter((entry) => entry[0].startsWith('ingredient-') && entry[1] != '') .map((recipe, i) => {
  const ingArr = recipe[1].split(',').map(el => el.trim());
  if(ingArr.length !== 3) throw Error('Enter a valid ingredients format'); 
  const [quantity, unit, description] = ingArr
         return {
           quantity: quantity ? +quantity : null,
           unit: unit ?? '',
           description: description ?? '',
         };
  })  

  const recipe = {
    title: newRecipe.title,
    source_url: newRecipe.sourceUrl,
    servings: +newRecipe.servings,
    publisher: newRecipe.publisher,
   ingredients,
    image_url: newRecipe.image,
    cooking_time: +newRecipe.cookingTime,
    };

    const {
      data: { recipe: recipeData },
    } = await AJAX( '','', recipe);
    state.recipe = createRecipe(recipeData);
        state.recipe ? (state.recipe.key = true) : (state.recipe.key = false);

  }
  catch (error) {
    throw error
  }
}
init()