import  { PreviewView } from "./previewView";

class ResultView extends PreviewView {
  _parentElement = document.querySelector('.results');
  _type = 'result'
   

  _errorMessage = 'No recipes found for your query. Please try again!';
  constructor() {
    super();
    this.addClickEvent();
  }

  render(data) {
    this._data = data;
        this._clear();


    this._init(this._data);
  }
  addClickEvent() {
    this._parentElement.addEventListener('click', e => {
      const preview = e.target.closest('.preview');
      if (!preview) return;

      const links = Array.from(
        this._parentElement.querySelectorAll('.preview__link')
      );
      links.forEach(element => {
        element.classList.remove('preview__link--active');
      });
      const previewLink = preview.querySelector('.preview__link');

      if (previewLink) {
        if (previewLink.classList.contains('preview__link--active')) {
          previewLink.classList.remove('preview__link--active');
        } else {
          previewLink.classList.add('preview__link--active');
        }
      }
    });
  }
}

export default new ResultView()