const fetchedData = fetch('https://fakestoreapi.com/products/')
  .then((res) => res.json())
  .then((json) => {
    console.log(json);
  })
  .catch((err) => {
    console.log(err);
  });

export default fetchedData;

// export const fetchedData = async () => {
//   const response = await fetch('https://fakestoreapi.com/products');
//   const body = await response.json();
//   return body;
// };
