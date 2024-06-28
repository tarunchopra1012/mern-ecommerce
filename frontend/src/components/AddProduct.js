import React, { useState } from "react";
import {
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  Container,
  TextareaAutosize,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    title: "",
    brand: "",
    category: "",
    description: "",
    discountPercentage: "",
    mainImage: null,
    thumbnails: [],
    price: "",
    rating: "",
    stock: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChanges = (event) => {
    const { name, value } = event.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setProductData({ ...productData, [name]: files[0] });
  };

  const handleThumbnailsChange = (event) => {
    const files = Array.from(event.target.files);

    setProductData((prevData) => ({
      ...prevData,
      thumbnails: [...prevData.thumbnails, ...files],
    }));
  };

  const handleSave = async () => {
    const formData = new FormData();

    // Append regular fields to FormData
    formData.append("title", productData.title);
    formData.append("brand", productData.brand);
    formData.append("category", productData.category);
    formData.append("description", productData.description);
    formData.append("discountPercentage", productData.discountPercentage);
    formData.append("price", productData.price);
    formData.append("rating", productData.rating);
    formData.append("stock", productData.stock);

    // Append main image file if selected
    if (productData.mainImage instanceof File) {
      formData.append("mainImage", productData.mainImage);
    }

    // Append thumbnail images if selected
    if (productData.thumbnails && productData.thumbnails.length > 0) {
      productData.thumbnails.forEach((file, index) => {
        formData.append("thumbnails", file);
      });
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/products/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data === "Product saved to the database!") {
        navigate("/");
      }
    } catch (e) {
      const errorResponse = e.response?.data?.errors;
      if (errorResponse) {
        const errorBag = {};
        errorResponse.forEach((error) => {
          const field = error.path;
          errorBag[field] = error.msg;
        });
        setErrors(errorBag);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <Container maxWidth="lg" style={{ paddingTop: "50px" }}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <Typography variant="h5">Add Product</Typography>
            </Grid>

            <Grid item>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={productData.title}
                name="title"
                onChange={handleInputChanges}
                error={!!errors.title}
                helperText={errors.title}
              />
            </Grid>

            <Grid item>
              <TextField
                label="Brand"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={productData.brand}
                name="brand"
                onChange={handleInputChanges}
                error={!!errors.brand}
                helperText={errors.brand}
              />
            </Grid>

            <Grid item>
              <TextField
                label="Category"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={productData.category}
                name="category"
                onChange={handleInputChanges}
                error={!!errors.category}
                helperText={errors.category}
              />
            </Grid>

            <Grid item>
              <TextareaAutosize
                placeholder="Description"
                minRows={10}
                style={{ width: "100%" }}
                value={productData.description}
                name="description"
                onChange={handleInputChanges}
              />
              {errors.description && (
                <Typography color="error">{errors.description}</Typography>
              )}
            </Grid>

            <Grid item>
              <TextField
                label="Discount Percentage"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                type="number"
                value={productData.discountPercentage}
                name="discountPercentage"
                onChange={handleInputChanges}
                error={!!errors.discountPercentage}
                helperText={errors.discountPercentage}
              />
            </Grid>

            <Grid item>
              <TextField
                label="Price"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                type="number"
                value={productData.price}
                name="price"
                onChange={handleInputChanges}
                error={!!errors.price}
                helperText={errors.price}
              />
            </Grid>

            <Grid item>
              <TextField
                label="Rating"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                type="number"
                value={productData.rating}
                name="rating"
                onChange={handleInputChanges}
                error={!!errors.rating}
                helperText={errors.rating}
              />
            </Grid>

            <Grid item>
              <TextField
                label="Stock"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                type="number"
                value={productData.stock}
                name="stock"
                onChange={handleInputChanges}
                error={!!errors.stock}
                helperText={errors.stock}
              />
            </Grid>

            <Grid item>
              <Typography variant="body1">Main Product Image</Typography>
              <input
                type="file"
                name="mainImage"
                onChange={handleFileChange}
                accept="image/*"
              />
              {errors.mainImage && (
                <Typography color="error">{errors.mainImage}</Typography>
              )}
            </Grid>

            <Grid item>
              <Typography variant="body1">Thumbnail Images (3-4)</Typography>
              <input
                type="file"
                name="thumbnails"
                onChange={handleThumbnailsChange}
                accept="image/*"
                multiple
              />
              {errors.thumbnails && (
                <Typography color="error">{errors.thumbnails}</Typography>
              )}
            </Grid>

            <Grid item>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default AddProduct;
