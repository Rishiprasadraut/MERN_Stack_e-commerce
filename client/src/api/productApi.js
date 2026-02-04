import api from "./axios";

/**
 * USER PRODUCTS (Search + Pagination + Category)
 */


export const getProducts = async ({
  search = "",
  category = "",
  page = 1,
} = {}) => {
  const res = await api.get(
    `/products?search=${search}&category=${category}&page=${page}`
  );

  return res.data;
  // { products, page, pages, totalProducts }
};




/**
 * SINGLE PRODUCT (Product Details Page)
 */
export const getProductById = async (id) => {
  if (!id) throw new Error("Product ID required");

  const res = await api.get(`/products/${id}`);
  return res.data;
};



/**
 * ADMIN: GET ALL PRODUCTS (including inactive)
 */

export const getAdminProducts = async (page = 1) => {
  const res = await api.get(`/products/admin?page=${page}`);
  return res.data;
};



/**
 * ADMIN: CREATE PRODUCT
 */

export const createProduct = async (productData) => {
  const res = await api.post("/products", productData);
  return res.data;
};


/**
 * ADMIN: UPDATE PRODUCT IMAGE
 */
export const updateProductImage = async (id, imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  const res = await api.put(`/products/${id}/image`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};





//ADMIN: UPDATE PRODUCT


export const updateProduct = async (id, productData) => {
  const res = await api.put(`/products/${id}`, productData);
  return res.data;
};

export const getAllProducts = async () => {
  const res = await api.get("/products");
  return res.data.products;
};

/**
 * ADMIN: DELETE PRODUCT (Soft delete)
 */

export const deleteProduct = async (id) => {
  const res = await api.delete(`/products/${id}`);
  return res.data;
};

// adding review

export const addReview = async (id, review) => {
  const res = await api.post(`/products/${id}/reviews`, review);
  return res.data;
};
