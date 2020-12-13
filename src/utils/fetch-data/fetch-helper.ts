export const checkIfNotInLocalStorage = (idToCheck: string, dataset: []) => {
  return new Promise((resolve) => {
    if (dataset.length === 0) {
      resolve(true);
    } else {
      for (let i = 0; i < dataset.length; i += 1) {
        // @ts-ignore
        if (dataset[i].id === idToCheck) {
          //return false if already in local storage
          resolve(false);
        } else {
          if (i + 1 === dataset.length) {
            resolve(true);
          }
        }
      }
    }
  });
};
