export const jParse = (value) => {
  return JSON.parse(value);
}  

export const jStringify = (value) => {
  return JSON.stringify(value);
}
  
export const getDelConfirmation = (name) => {
  return confirm(`Are you sure you want to delete this ${name}?`)
}

export const getAcceptConfirmation = (name) => {
  return confirm(`Are you sure you want to Assign this ${name}?`)
}

export const remove = (array, id) => {
  return array.filter(
    (array) => array.id !== id
  ); 
}


export const navigateWithToaster = (navigate, path, toastMessage, toastType) => {
  console.log('here2')
  navigate(path, {
    state: {
      toastMessage,
      toastType,
    }
  });
}

export const permalinkUrlHandler = (value, key) => {
  let url = import.meta.env.VITE_PERMALINK;

  if(value) url += value;
  if(key) url += key;

  return url;
}

export const dicountedPrice = (price, disPercent) => {
  const dicountedPrice = price * disPercent / 100;
  return price - dicountedPrice;
}