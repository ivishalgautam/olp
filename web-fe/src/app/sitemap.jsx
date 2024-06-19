import axios from "axios";
import { endpoints } from "@/utils/endpoints";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
async function fetchProducts() {
  const { data } = await axios.get(
    `${apiBaseUrl}${endpoints.products.getAll}?page=1&limit=10000`,
  );
  return data;
}

async function fetchCategories() {
  const { data } = await axios.get(
    `${apiBaseUrl}${endpoints.categories.getAll}?page=1&limit=10000`,
  );
  return data;
}

async function fetchBrands() {
  const { data } = await axios.get(
    `${apiBaseUrl}${endpoints.brands.getAll}?page=1&limit=10000`,
  );
  return data;
}

export default async function Sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const { data: products } = await fetchProducts();
  const { data: categories } = await fetchCategories();
  const { data: brands } = await fetchBrands();

  //product urls
  const productUrls =
    products?.map((product) => {
      return {
        url: `${baseUrl}/products/${product.slug}`,
        lastModified: new Date(),
      };
    }) ?? [];

  //catgory urls
  const categoriesUrl =
    categories?.map((category) => {
      return {
        url: `${baseUrl}/categories/${category.slug}`,
        lastModified: new Date(),
      };
    }) ?? [];

  //brands urls
  const brandsUrl =
    brands?.map((brand) => {
      return {
        url: `${baseUrl}/brands/${brand.slug}`,
        lastModified: new Date(),
      };
    }) ?? [];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },
    ...productUrls,
    ...categoriesUrl,
    ...brandsUrl,
  ];
}
