import { async } from 'regenerator-runtime';
import { BASE_URL, SEC_TIMEOUT } from './config.js';

export const createUrlApi = (slug='', url, query = '') => {
  let newUrl = new URL(url);
  const params = newUrl.searchParams;
  if (slug === 'search') {
    const name = params.set('search', query);
  }
  if (slug === 'id') {
    const id = params.set('', query);
    newUrl.href = newUrl.href.replace('?=', '/');
  }
    const apiKey = params.set('key', process.env.API_KEY);
  
  return newUrl.href;
};

export const AJAX = async (params = '', query = '' , uploadRecipe = undefined) => {
  try {
    const urlForFetch = createUrlApi(params, BASE_URL, query);

  let request = uploadRecipe
    ? fetch(urlForFetch, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(uploadRecipe),
      })
    : fetch(urlForFetch);
      
    const resultFetch = await Promise.race([request, timeout(SEC_TIMEOUT)]);
    const data = await resultFetch.json();
    if (!resultFetch.ok) {
      throw new Error(`${data.message} (${resultFetch.status})`);
    }
    if (data.results === 0) {
      throw new Error(
        `We could not find the recipe data you were looking for in our database. Please double-check the recipe name for any errors or try searching for a similar recipe. `
      );
    }

    return data;
  } catch (err) {
    throw err;
  }
}; 


export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
