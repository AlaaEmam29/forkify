class SearchView  {
  #parentElement = document.querySelector('.search');
 
  addHandlerSearchEvent( handler) {
    this.#parentElement.addEventListener('submit', handler);
  }
  get query() {
    const q = String(this.#parentElement.querySelector('.search__field').value).toLocaleLowerCase();
    this.#clearInput()
    return q
  }
  #clearInput() {
    this.#parentElement.querySelector('.search__field').value = ''
  }
  

}
export default new SearchView();
