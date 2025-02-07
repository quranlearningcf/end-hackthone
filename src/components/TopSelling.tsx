"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { Skeleton } from "./ui/skeleton";
import { Product } from "../../sanity.types";

async function fetchNewProducts() {
  try {
    const data = await client.fetch(`
      *[_type == "product"][8..11] {
        _id,
        name,
        slug,
        price,
        "image": image.asset->url,
        discountPercent,
        ratings,
      }
    `);
    return data;
  } catch (error) {
    console.error("Error fetching new products:", error);
    return []; 
  }
}

const NewArrival = () => {
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); 
        const products = await fetchNewProducts();
        setNewProducts(products);
      } catch (err) {
        setError("Failed to load products.");
        console.error("Error fetching new products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full px-6 my-20">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-5xl font-bold text-center" aria-label="New Arrivals">
          Top Sellings
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
          {isLoading ? (
            Array(4)
              .fill(0)
              .map((_, index) => (
                <div key={index}>
                  <Skeleton className="w-full h-72" />
                </div>
              ))
          ) : error ? (
            <div className="text-center mt-10 text-red-500">
              {error}
              <Button onClick={() => window.location.reload()} className="ml-4">
                Retry
              </Button>
            </div>
          ) : (
            newProducts.length > 0 ? ( 
              newProducts.map((product) => (
                <Link href={`/products/${product.slug?.current}`} key={product._id}>
                  <ProductCard product={product} />
                </Link>
              ))
            ) : (
              <div className="text-center mt-10">
                <p>No new arrivals found.</p> 
              </div>
            )
          )}
        </div>

        <div className="w-full flex justify-center">
          <Link href="/shop">
            <Button className="text-black bg-white hover:bg-gray-100 border border-black/50 mt-10 px-12 py-6">
              View All
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;