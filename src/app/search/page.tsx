"use client";

import { client } from "@/sanity/lib/client";
import { Product } from "../../../sanity.types";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { useSearchParams } from "next/navigation";
import { Box } from "lucide-react";

const Search = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setErrors(null);

      try {
        const query = `
          *[_type == "product" && name match "${searchQuery.toLowerCase()}*"] {
            _id,
            name,
            slug,
            price,
            "image": image.asset->url,
            discountPercent,
            ratings,
          }
        `;
        const data = await client.fetch(query);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setErrors("Failed to fetch products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (searchQuery) {
      fetchProducts();
    } else {
      setProducts([]);
      setIsLoading(false);
    }
  }, [searchQuery]);

  return (
    <div className="w-full px-4 my-4 min-h-screen py-20">
      <div className="max-w-6xl mx-auto">
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
          ) : products.length === 0 ? (
            <div className="h-[50vh] col-span-full flex flex-col justify-center items-center text-center space-y-4">
              <Box size={90} className="text-gray-500"/>
              <p className="text-gray-500">
                No products found. Please check your search query or try again
                later.
              </p>
            </div>
          ) : (
            products.map((product) => (
              <Link
                href={`/products/${product.slug?.current}`}
                key={product._id}
              >
                <ProductCard product={product} />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;


{/* <div className="mt-8">
            <div className="relative">
            <form onSubmit={handleSearch}>
              <Input
                type="search"
                placeholder="Search for products..."
                className="w-full py-2 pl-10 pr-4 bg-gray-100 rounded-lg focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </form>
            </div>
          </div> */}