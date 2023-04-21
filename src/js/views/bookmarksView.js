import {  PreviewView } from './previewView.js';

class BookmarksView extends PreviewView {
  _parentElement = document.querySelector('.bookmarks__list');
    _data = [];
    _type = 'bookmarks'
  constructor() {
    super();
  }
  render(data) {
      this._data = data;
    this._init(this._data);

  }

}
export default new BookmarksView();
