import { CLOSE_POP_Time } from '../config';
import { View } from './view';
const addRecipeBtn = document.querySelector('.nav__btn--add-recipe');
const overlay = document.querySelector('.overlay');
const btnClose = document.querySelector('.btn--close-modal');
const recipeView = document.querySelector('.add-recipe-window');
class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _successMessage = `Recipe upload Success you need to wait ${CLOSE_POP_Time} second :)`;
  constructor() {
    super();
    this.#addHAndlerShoWindow();
    this.#addHAndlerHiddenWindow();
  }
  _addCloseLogic() {
    overlay.classList.add('hidden');
    recipeView.classList.add('hidden');
  }

  #addHAndlerShoWindow() {
    addRecipeBtn.addEventListener('click', function (e) {
      overlay.classList.remove('hidden');
      recipeView.classList.remove('hidden');
    });
  }

  #addHAndlerHiddenWindow() {
    [btnClose, overlay].forEach(evt => {
      evt.addEventListener('click', e => {
        this._addCloseLogic();
      });
    });
    window.addEventListener('keyup', e => {
      if (e.code === 'Escape') {
        this._addCloseLogic();
      }
    });
  }
  addUploadHandler(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const dataObj = Object.fromEntries(dataArr);
      handler(dataObj);
    });
  }
}

export default new AddRecipeView();