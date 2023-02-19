export const refactorSearchedInputData = (data) => {
  // Object.keys(data).forEach((key) => !data[key] && delete data[key]);

  Object.keys(data).forEach((key) => {
    if (!data[key]) delete data[key];

    if (Array.isArray(data[key])) {
     data[key] = data[key].toString();
    }
  });

  return data;
};

export const getUrlSearchParams = (data) => {
  const params = {};
  data.forEach((value, key) => (params[key] = value || ""));
  return params;
};

export const getPaginationParams = (data) => {
  const params = {
    page_size: data?.get("page_size") || 10,
    page: data.get("page") || 1,
  };
  return params;
};

export function moveElement(arr, old_index, new_index) {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
}
