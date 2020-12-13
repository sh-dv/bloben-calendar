import { parseISO, format, formatISO,  } from 'date-fns';
import { BASE_URL } from 'bloben-common/globals/url';
const uuidv4 = require('uuid/v4');

export const fetchData = async (path) => {
  return new Promise(async (resolve, reject) => {
    const url = BASE_URL + path;
    let response = await fetch(url, { method: 'GET', credentials: 'include' });
    let data = await response.json();
    resolve(data);
  });
};

export const exportData = async (data) => {
  const { notes } = this.props; // I am assuming that "this.state.myData"
  // is an object and I wrote it to file as
  // json
  const fileName = 'file';
  const json = JSON.stringify(notes);
  const blob = new Blob([json], { type: 'application/json' });
  const href = await URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = href;
  link.download = fileName + '.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const changeStatusbarColor = (color) => {
  document
    .querySelector('meta[name="theme-color"]')
    .setAttribute('content', color);
};

export const sendPost = function (path, content, callback, callback2) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        if (xhr.responseText) {
          if (xhr.responseText === 'response') {
            callback.call();
          } else {
            if (typeof callback2 === typeof Function) {
              callback2.call();
            }
          }
        }
      } else {
        console.error(xhr.statusText);
      }
    }
  };
  xhr.onerror = function (e) {
    console.error(xhr.statusText);
    callback2.call();
  };

  const url = BASE_URL + path;
  xhr.open('POST', url, true);

  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.withCredentials = true;

  xhr.send(
    JSON.stringify({
      content,
    })
  );
};
export const sendPostAsyncCors = async (path, content, callback, callback2) => {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (xhr.responseText) {
            resolve(xhr.responseText);
          }
        } else {
          reject('error');
        }
      }
    };
    xhr.onerror = function (e) {
      reject('error');
    };
    const url = BASE_URL + path;
    xhr.open('POST', url, true);

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.withCredentials = true;

    xhr.send(
      JSON.stringify({
        content,
      })
    );
  });
};
export const sendPostAsync = async (path, content, callback, callback2) => {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (xhr.responseText) {
            if (xhr.responseText === 'response') {
              resolve('resolved');
            } else {
              if (path == '/login') {
                resolve(xhr.responseText);
              } else {
                const errorMsg = JSON.parse(xhr.responseText);

                resolve(errorMsg);
              }
            }
          }
        } else {
          reject('error');
        }
      }
    };
    xhr.onerror = function (e) {
      reject('error');
    };
    const url = BASE_URL + path;
    xhr.open('POST', url, true);
    xhr.setRequestHeader('credentials', 'same-origin');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.withCredentials = true;

    xhr.send(
      JSON.stringify({
        content,
      })
    );
  });
};

export const createLocalId = () => {
  let timestamp = new Date().getTime();
  let hash = Math.random();
  let stringHash = hash.toString().slice(2) + timestamp.toString();
  return stringHash;
};

export const hashForComparingChanges = () => {
  let timestamp = new Date().getTime();
  let hash = Math.random();
  let stringHash = hash.toString().slice(2) + timestamp.toString();
  return stringHash;
};

export const createId = () => {
  let uuid = uuidv4();
  return uuid;
};

export const addToArray = (array, item) => {
  array.push(item);
  return array;
};
export const removeFromArray = (array, item) => {
  let newArray = array.filter((arrayItem) => {
    return arrayItem !== item;
  });
  return newArray;
};

export const sortData = (data, rule) => {
  let sortedData;
  if (rule === 'created') {
    sortedData = data.sort((a, b) => {
      return parseISO(a.created) - parseISO(b.created);
    });
  } else if (rule === 'updated') {
    sortedData = data.sort((a, b) => {
      return parseISO(a.updated) - parseISO(b.updated);
    });
  } else if (rule === 'name') {
    sortedData = data.sort((a, b) => {
      let aItem = a.text
        ? a.text.slice(0, 1).toUpperCase()
        : a.list.slice(0, 1).toUpperCase();
      let bItem = b.text
        ? b.text.slice(0, 1).toUpperCase()
        : b.list.slice(0, 1).toUpperCase();
      return aItem.localeCompare(bItem);
    });
  }
  return sortedData;
};
export const sortDataPromise = (data, rule) => {
  return new Promise((resolve) => {
    let sortedData;
    if (rule === 'created') {
      resolve(
        data.sort((a, b) => {
          return parse(b.created) - parse(a.created);
        })
      );
    } else if (rule === 'updated') {
      resolve(
        data.sort((a, b) => {
          return parse(b.updated) - parse(a.updated);
        })
      );
    } else if (rule === 'name') {
      resolve(
        data.sort((a, b) => {
          let aItem = a.text.slice(0, 1).toUpperCase();
          let bItem = b.text.slice(0, 1).toUpperCase();
          return aItem.localeCompare(bItem);
        })
      );
    }
  });
};

export const renderIcon = (icon) => {
  return icon;
};
