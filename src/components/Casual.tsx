import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Button } from "./ui/button";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import { client } from "@/sanity/lib/client";
import { Product } from "../../sanity.types";

async function getAllProducts() {
  const query = await client.fetch(`
      *[_type == "product"] {
        _id,
        name,
        slug,
        price,
        "image": image.asset->url,
        discountPercent,
        ratings,
      }
    `);
  return query;
}

const Casual =  () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<string | null>(null);
  const [visibleProducts, setVisibleProducts] = useState<number>(9);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getAllProducts();
        setProducts(products);
      } catch (err) {
        setErrors("Failed to load products");
        console.error("Error fetching new products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLoadMore = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 9);
  };

  return (
    <div className="w-full px-4 my-4">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10">
          {isLoading ? (
            Array(9)
              .fill(0)
              .map((_, index) => (
                <div key={index}>
                  <Skeleton className="w-full h-[22rem]" />
                </div>
              ))
          ) : errors ? (
            <div className="text-red-500 text-center">
              {errors}
              <Button onClick={() => window.location.reload()} className="ml-4">
                Retry
              </Button>
            </div>
          ) : (
            products.slice(0, visibleProducts).map((product) => (
              <Link href={`/products/${product.slug?.current}`} key={product._id}>
                <ProductCard product={product} />
              </Link>
            ))
          )}
        </div>

        <div className="w-full flex justify-center">
          {products.length > visibleProducts && (
            <Button
              onClick={handleLoadMore}
              className="text-black bg-white hover:bg-gray-100 border border-black/50 mt-10 px-12 py-6"
            >
              Load More
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Casual;
