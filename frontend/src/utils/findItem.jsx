const findItemByProperty = (list, propertyName, propertyValue) => {
  return list.find((item) => item[propertyName] === propertyValue);
};

export default findItemByProperty;
