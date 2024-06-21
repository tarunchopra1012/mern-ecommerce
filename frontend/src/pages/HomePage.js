import React, { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/products/read"
      );
      setProductList(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      <h2>My HomePage</h2>
      <ul>
        {productList.map((product, index) => (
          <li key={index}>{product.title}</li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default HomePage;
