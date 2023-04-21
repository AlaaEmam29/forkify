import { View } from './view';
import icons from '../../img/icons.svg';

class PreviewView extends View {
    _parentElement = '';
    _type = ''
    constructor() {
        super()
    }
  
  _init(data) {
    const fragment = document.createDocumentFragment();
    this._data.map(recipe => {
      fragment.appendChild(this._generateMarkup(recipe));
    });
    const tempDiv = Array.from(fragment.childNodes)
      .map(div => div.outerHTML)
      .join('');
    this._parentElement.insertAdjacentHTML('beforeend', tempDiv);
  }

  _generateMarkup(recipe) {
    this._clear();
    const li = document.createElement('li');
    li.classList.add('preview');

    li.innerHTML = `
            <a class="preview__link "   href="#${recipe.id}">
              <figure class="preview__fig">
              <img src="${recipe.image}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${recipe.title}</h4>
                <p class="preview__publisher">${recipe.publisher}</p>
                ${
                  this._type === 'result'
                    ? `<div class="preview__user-generated">
                      <svg>
${
  recipe.key
    ? `    <use href="${icons}#icon-lock"></use>`
    : `    <use href="${icons}#icon-users"></use>`
}
                      </svg>
                    </div>`
                    : ''
                }
               
                  </div>
                  </a>
                  `;

    return li;
  }

}

export  { PreviewView };
