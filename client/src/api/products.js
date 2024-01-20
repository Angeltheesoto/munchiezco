import axios from "axios";
var server_url = process.env.REACT_APP_SERVER_URL;

export const getProductsDataCall = async () => {
  try {
    const res = await axios.get(`${server_url}api/products`);
    // console.log(res.data);
    return res.data;
  } catch (err) {
    console.error("Error: ", err);
    throw err;
  }
};
