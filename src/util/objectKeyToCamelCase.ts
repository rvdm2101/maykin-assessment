export const objectKeyToCamelCaseRecursively = (data: object) => {
  // Change the case of the object keys on the top level
  const camelCaseData = objectKeyToCamelCase(data);

  // Check if this object has any sub-objects
  for (const key in camelCaseData) {
    if (typeof camelCaseData[key] === 'object') {
      if (Array.isArray(camelCaseData[key])) {
        // loop through array
        for (let i = 0; i < camelCaseData[key].length; i++) {
          camelCaseData[key][i] = objectKeyToCamelCaseRecursively(camelCaseData[key][i]);
        }
      } else {
        // call function recursively for object
        camelCaseData[key] = objectKeyToCamelCaseRecursively(camelCaseData[key]);
      }
    }
  }
  return camelCaseData;
};

export const objectKeyToCamelCase = (data: object) => {
  // Turn the object into a tuple, and map over the different items
  return Object.entries(data)
    .map(([key, value]) => ({
      // Change the first character of the key value to lowercase
      key: key.charAt(0).toLowerCase() + key.slice(1),
      value
    }))
    .reduce((carry: any, current) => {
      // Turn the tuples back into objects
      carry[current.key] = current.value;
      return carry;
    }, {});
};
