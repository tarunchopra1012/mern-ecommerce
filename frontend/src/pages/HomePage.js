import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import NavBar from "../components/NavBar";

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
      <NavBar />
      <h2>My HomePage</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {productList.length !== 0 &&
          productList.map((product) => <ProductCard product={product} />)}
      </div>
    </React.Fragment>
  );
};

export default HomePage;
