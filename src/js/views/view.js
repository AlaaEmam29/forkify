import icons from '../../img/icons.svg';
import { Fraction } from 'fractional';

class View {
  constructor() {
  }
  _parentElement;
  _successMessage = '';
  _errorMessage = '';
  _data;

  _clear() {
    this._parentElement.innerHTML = '';
  }
  addHandlerRenderEvent(handler) {
    ['hashchange', 'DOMContentLoaded'].forEach(evt =>
      window.addEventListener(evt, handler)
    );
  }

  renderSpinner() {
    this._clear();
    const spinner = `<div class="spinner">
          <svg>
            <use href=${icons}#icon-loader></use>
          </svg>
        </div>`;
    this._parentElement.insertAdjacentHTML('afterbegin', spinner);
  }
  renderSuccessMessage(err = this._successMessage) {
    this._clear();

    const error = `

    <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${err}</p>
          </div>
    `;
    this._parentElement.insertAdjacentHTML('afterbegin', error);
  }
  renderError(err = this._errorMessage) {
    this._clear();
    const error = `
<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${err}</p>
          </div>
    `;
    this._parentElement.insertAdjacentHTML('afterbegin', error);
  }
  render(data) {
    this._data = data;
    this._clear();
    if (!data) return;
    const fragment = document.createDocumentFragment();
    const div = this._generateMarkup();
    fragment.appendChild(div);
    const tempDiv = fragment.childNodes[0];
    this._parentElement.insertAdjacentHTML('afterbegin', tempDiv.innerHTML);
  }
  update(data) {
    this._data = data;
    if (!data) return;
    const newMarkup = this._generateMarkup();
    const newElements = Array.from(newMarkup.querySelectorAll('*'));
    const oldElements = Array.from(this._parentElement.querySelectorAll('*'));
    newElements.forEach((newEl, i) => {
      let currEl = oldElements[i];
      if (
        !newEl.isEqualNode(currEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        currEl.textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(currEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          currEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  _generateMarkup() {
    const div = document.createElement('div');
    div.innerHTML = `    
          <figure data-id=${this._data.id} class="recipe__fig">
          <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
          <span>${this._data.title}</span>
          </h1>
          </figure>
  
          <div class="recipe__details">
                  <div class="recipe__info">
                    <svg class="recipe__info-icon">
                      <use href="${icons}#icon-clock"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">${
                      this._data.cookingTime
                    }</span>
                    <span class="recipe__info-text">minutes</span>
                  </div>
                  <div class="recipe__info">
                    <svg class="recipe__info-icon">
                    <use href="${icons}#icon-users"></use>
                    </svg>
                    <span  class="recipe__info-data recipe__info-data--people">${
                      this._data.servings
                    }</span>
                    <span class="recipe__info-text">servings</span>
            
                    <div class="recipe__info-buttons">
                      <button data-servings=${
                        this._data.servings - 1
                      }  class="btn--tiny btn--update-servings">
                      <svg>
                          <use href="${icons}#icon-minus-circle"></use>
                        </svg>
                        </button>
                        <button  data-servings=${
                          this._data.servings + 1
                        }  class="btn--tiny btn--update-servings">
                        <svg>
                          <use href="${icons}#icon-plus-circle"></use>
                          </svg>
                      </button>
                      </div>
                  </div>
          
                  <div class="recipe__user-generated">
                    <svg>
                    <use href="${
                      this._data.key === undefined
                        ? `${icons}#icon-users`
                        : `${icons}#icon-lock`
                    }"></use>
                    </svg>
                    </div>
                    <button class="btn--round">
                    <svg class="">
                      <use href="${
                        this._data.bookmarked === true
                          ? `${icons}#icon-bookmark-fill`
                          : `${icons}#icon-bookmark`
                      }"></use>
                    </svg>
                    </button>
                    </div>
            
                    <div class="recipe__ingredients">
                    <h2 class="heading--2">Recipe ingredients</h2>
                    <ul class="recipe__ingredient-list">
            
                    ${this._data.ingredients
                      .map(ing => {
                        return this.#generateHTMLIngredients(ing);
                      })
                      .join('')}
           
              
                  </ul>
                  </div>
          
                  <div class="recipe__directions">
                  <h2 class="heading--2">How to cook it</h2>
                  <p class="recipe__directions-text">
                  This recipe was carefully designed and tested by
                  <span class="recipe__publisher">${
                    this._data.publisher
                  }</span>. Please check out
                  directions at their website.
                  </p>
                  <a
                  class="btn--small recipe__btn"
                  href="${this._data.source}"
                  target="_blank"
                  >
                  <span>Directions</span>
                    <svg class="search__icon">
                      <use href="${icons}#icon-arrow-right"></use>
                      </svg>
                      </a>
                      </div>`;

    return div;
  }
  #generateHTMLIngredients(ing) {
    return ` <li class="recipe__ingredient">
                        <svg class="recipe__icon">
                        <use href="${icons}#icon-check"></use>
                        </svg>
                        <div class="recipe__quantity">${
                          ing.quantity
                            ? new Fraction(ing.quantity).toString()
                            : ''
                        }</div>
                        <div class="recipe__description">
                        <span class="recipe__unit">${ing.unit}</span>
                        ${ing.description}
                        </div>
                        </li>`;
  }
}
export { View };
