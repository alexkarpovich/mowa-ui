export const selectedSetIds = (oldIds, newId, sets) => {
  let newIds = [];
  const rangeIds = [...oldIds, newId];

  const range = sets.reduce((res, set, index) => {
    if (rangeIds.indexOf(set.id) !== -1) {
      if (res.min > index) res.min = index;
      if (res.max < index) res.max = index;
    }

    return res;
  }, { min: sets.length - 1, max: 0 });

  sets.forEach((set, i) => {
    if (i >= range.min && i <= range.max) {
      newIds.push(set.id);
    }
  });

  return newIds;
};
