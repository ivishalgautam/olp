import PaginationControls from "@/components/PaginationControls";
import ProductCard from "@/components/cards/product";
import SidebarBrands from "@/components/layout/sidebar-brands";
import SidebarCategories from "@/components/layout/sidebar-categories";
import { P } from "@/components/ui/typography";
import { fetchCategory, fetchProducts } from "@/utils/api";

async function fetchCategoryMetadata(slug) {
  return fetchCategory(slug);
}

export async function generateMetadata({ params: { type, slug } }) {
  if (type !== "categories") return;

  const { data: category } = await fetchCategoryMetadata(slug);

  return {
    title: category.meta_title ? category.meta_title : category.name,
    description: category.meta_description,
    keywords: category.meta_keywords,
    openGraph: {
      title: category.meta_title ? category.meta_title : category.name,
      description: category.meta_description,
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/categories/${slug}`,
    },
  };
}

export default async function Page({
  params: { type, slug },
  searchParams: { page: currPage, limit },
}) {
  const { data, total_page, page } = await fetchProducts(
    type,
    slug,
    currPage ? currPage : 1,
    limit,
  );
  return (
    <section className="py-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-4 lg:col-span-3">
            <div className="space-y-4">
              <SidebarCategories />
              <SidebarBrands />
            </div>
          </div>

          <div className="relative col-span-12 md:col-span-8 lg:col-span-9">
            <div className="grid grid-cols-2 gap-4 pb-14 md:grid-cols-3 lg:grid-cols-5">
              {data?.length ? (
                data?.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))
              ) : (
                <P>No products found!</P>
              )}
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
              <PaginationControls total_page={total_page} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
