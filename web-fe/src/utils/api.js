import { endpoints } from "./endpoints";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

// fetch all product by category or brand
export async function fetchProducts(type, slug, page, limit = 10) {
  const { data } = await axios.get(
    `${baseUrl}${endpoints.products.getAll}/${type === "categories" ? "getByCategory" : "getByBrand"}/${slug}?page=${page}&limit=${limit}`,
  );
  return data;
}

// fetch single product by slug
export async function fetchProduct(slug) {
  const { data } = await axios.get(
    `${baseUrl}${endpoints.products.getAll}/${slug}`,
  );

  return data;
}
