import { View } from './view';
import icons from '../../img/icons.svg';

class PaginateView extends View {
  _parentElement = document.querySelector('.pagination');
  constructor() {
    super();
  }
  render(data) {
    this._data = data
    const html = this.#generateMarkupPaginate();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }
  addHandlerToggle(handler) {
      this._parentElement.addEventListener('click', function (e) {
          const btn = e.target.closest('button');
          if (!btn) return;
          if (btn.classList.contains('pagination__btn--prev')) {
            handler(-1);
          }
          if (btn.classList.contains('pagination__btn--next')) {
            handler(1);
          }
    });
  }
  #generateMarkupPaginate() {
    let { numberOfPages, page } = this._data;
    const currentPage = page + 1;
    if (currentPage == 1 && numberOfPages > 1) {
      return this.#generateNxtBtn(currentPage);
    }
    if (currentPage == numberOfPages && numberOfPages > 1) {
      return `  ${this.#generatePrevBtn(currentPage)}`;
    }
    if (currentPage < numberOfPages) {
      return `
            ${this.#generatePrevBtn(currentPage)}
            ${this.#generateNxtBtn(currentPage)}`;
    }
    return '';
  
    }
    #generateNxtBtn(page) {
        return `
            <button class="btn--inline pagination__btn--next">
                            <span>Page ${page + 1}</span>
                            <svg class="search__icon">
                              <use href="${icons}#icon-arrow-right"></use>
                            </svg>
                          </button>`;
    }
    #generatePrevBtn(page) {
        return `<button  class="btn--inline pagination__btn--prev">
                      <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                      </svg>
                      <span>Page ${page - 1}</span>
                    </button>`;
    }
}
export default new PaginateView();
