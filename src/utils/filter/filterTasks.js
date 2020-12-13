const filterTasksForList = async (data, selectedList) => {
  return new Promise(async (resolve) => {
    //Filter only tasks for selected list
    let filteredData = data.filter((task) => {
      return task.list === selectedList.id;
    });
    resolve(filteredData);
  });
};

const sortTasks = (data, rule) => {
  return new Promise(async (resolve) => {
    let sortedData;
    if (rule === 'favourite') {
      sortedData = data.sort((a, b) => {
        let aItem = a.isFavourite === 'true' ? true : false;
        let bItem = b.isFavourite === 'true' ? true : false;
        return aItem - bItem;
      });
    } else if (rule === 'updated') {
      sortedData = data.sort((a, b) => {
        return parse(b.updated) - parse(a.updated);
      });
    } else if (rule === 'created') {
      sortedData = data.sort((a, b) => {
        return parseInt(b.id) - parseInt(a.id);
      });
    } else if (rule === 'name') {
      sortedData = data.sort((a, b) => {
        let aItem = a.text.slice(0, 1).toUpperCase();
        let bItem = b.text.slice(0, 1).toUpperCase();
        return aItem.localeCompare(bItem);
      });
    }
    resolve(sortedData);
  });
};
const setFinalOrder = async (data, tasksSortBy) => {
  return new Promise(async (resolve) => {
    let favouriteNormalTasks = [];
    let favouriteCheckedTasks = [];
    let checkedTasks = [];
    let normalTasks = [];
    let favouriteNormalSorted;
    let favouriteCheckedSorted;
    let checkedSorted;
    let normalSorted;
    let result;
    data.forEach(async (item, index) => {
      if (item.isFavourite === 'true') {
        //On top
        if (item.isChecked === 'true') {
          favouriteCheckedTasks.push(item);
        } else {
          favouriteNormalTasks.push(item);
        }
        if (index + 1 === data.length) {
          favouriteNormalSorted = await sortTasks(
            favouriteNormalTasks,
            tasksSortBy
          );
          favouriteCheckedSorted = await sortTasks(
            favouriteCheckedTasks,
            tasksSortBy
          );
          normalSorted = await sortTasks(normalTasks, tasksSortBy);
          checkedSorted = await sortTasks(checkedTasks, tasksSortBy);
          result = favouriteNormalSorted
            .concat(normalSorted)
            .concat(favouriteCheckedSorted)
            .concat(checkedSorted);
        }
      } else {
        if (item.isChecked === 'true') {
          checkedTasks.push(item);
          if (index + 1 === data.length) {
            favouriteNormalSorted = await sortTasks(
              favouriteNormalTasks,
              'favourite'
            );
            favouriteCheckedSorted = await sortTasks(
              favouriteCheckedTasks,
              'favourite'
            );
            normalSorted = await sortTasks(normalTasks, tasksSortBy);
            checkedSorted = await sortTasks(checkedTasks, tasksSortBy);
            result = favouriteNormalSorted
              .concat(normalSorted)
              .concat(favouriteCheckedSorted)
              .concat(checkedSorted);
          }
        } else {
          normalTasks.push(item);
          if (index + 1 === data.length) {
            favouriteNormalSorted = await sortTasks(
              favouriteNormalTasks,
              'favourite'
            );
            favouriteCheckedSorted = await sortTasks(
              favouriteCheckedTasks,
              'favourite'
            );
            normalSorted = await sortTasks(normalTasks, tasksSortBy);
            checkedSorted = await sortTasks(checkedTasks, tasksSortBy);
            result = favouriteNormalSorted
              .concat(normalSorted)
              .concat(favouriteCheckedSorted)
              .concat(checkedSorted);
          }
        }
      }
      if (index + 1 === data.length) {
        resolve(result);
      }
    });
  });
};

export const filterTasks2 = async (data, selectedList, sortBy) => {
  const thisListTasks = await filterTasksForList(data, selectedList);
  const result = await setFinalOrder(thisListTasks, sortBy);
  return result;
};
/*
const filterTasksForList =  (data, selectedList) => {
  //Filter only tasks for selected list
  return data.filter(task => {
    return task.list === selectedList.id;
  });
};

const sortTasks = (data, rule) => {
  let sortedData;
  if (rule === "favourite") {
    return data.sort((a, b) => {
      let aItem = a.isFavourite === "true" ? true : false;
      let bItem = b.isFavourite === "true" ? true : false;
      return aItem - bItem;
    });
  } else if (rule === "updated") {
    return data.sort((a, b) => {
      return parse(b.updated) - parse(a.updated);
    });
  } else if (rule === "created") {
    return data.sort((a, b) => {
      return parseInt(b.id) - parseInt(a.id);
    });
  } else if (rule === "name") {
    return data.sort((a, b) => {
      let aItem = a.text.slice(0, 1).toUpperCase();
      let bItem = b.text.slice(0, 1).toUpperCase();
      return aItem.localeCompare(bItem);
    });
  }
};
const setFinalOrder =  (data, tasksSortBy) => {
  let favouriteNormalTasks = [];
  let favouriteCheckedTasks = [];
  let checkedTasks = [];
  let normalTasks = [];
  let favouriteNormalSorted;
  let favouriteCheckedSorted;
  let checkedSorted;
  let normalSorted;
  let result;
  data.forEach((item, index) => {
    if (item.isFavourite === "true") {
      //On top
      if (item.isChecked === "true") {
        favouriteCheckedTasks.push(item);
      } else {
        favouriteNormalTasks.push(item);
      }
      if (index + 1 === data.length) {
        favouriteNormalSorted = sortTasks(
          favouriteNormalTasks,
          tasksSortBy
        );
        favouriteCheckedSorted = sortTasks(
          favouriteCheckedTasks,
          tasksSortBy
        );
        normalSorted = sortTasks(normalTasks, tasksSortBy);
        checkedSorted = sortTasks(checkedTasks, tasksSortBy);
        return favouriteNormalSorted
          .concat(normalSorted)
          .concat(favouriteCheckedSorted)
          .concat(checkedSorted);
      }
    } else {
      if (item.isChecked === "true") {
        checkedTasks.push(item);
        if (index + 1 === data.length) {
          favouriteNormalSorted = sortTasks(
            favouriteNormalTasks,
            "favourite"
          );
          favouriteCheckedSorted = sortTasks(
            favouriteCheckedTasks,
            "favourite"
          );
          normalSorted = sortTasks(normalTasks, tasksSortBy);
          checkedSorted = sortTasks(checkedTasks, tasksSortBy);
          return favouriteNormalSorted
            .concat(normalSorted)
            .concat(favouriteCheckedSorted)
            .concat(checkedSorted);
        }
      } else {
        normalTasks.push(item);
        if (index + 1 === data.length) {
          favouriteNormalSorted = sortTasks(
            favouriteNormalTasks,
            "favourite"
          );
          favouriteCheckedSorted = sortTasks(
            favouriteCheckedTasks,
            "favourite"
          );
          normalSorted = sortTasks(normalTasks, tasksSortBy);
          checkedSorted = sortTasks(checkedTasks, tasksSortBy);
          return favouriteNormalSorted
            .concat(normalSorted)
            .concat(favouriteCheckedSorted)
            .concat(checkedSorted);

        }
      }
    }
    if (index + 1 === data.length) {
      return result
    }
  });
};
}
*/
