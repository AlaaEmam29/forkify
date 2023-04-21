import { View } from "./view";

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'No recipes found for your query. Please try again!';
  // addHandlerRenderEvent(handler) {
  //   ['hashchange', 'DOMContentLoaded'].forEach(evt =>
  //     window.addEventListener(evt, handler)
  //   );
  // }
  addServicesEvent(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;
      let newServing = +btn.dataset.servings;
      if (newServing == 0) return;
      handler(newServing);
    });
  }
  addBookMarksHandler(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--round');
      if (!btn) return;
      handler();

    });
  }
}
export default new RecipeView();