import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import renderStars from "./RenderStar";
import { Product } from "../../sanity.types";
import { urlFor } from "@/sanity/lib/image"; 

interface ProductProps {
  product: Product;
}


const ProductCard = ({ product }: ProductProps) => {
  const price = product.price ?? 0;

  const discountedPrice = product.discountPercent
    ? (price * (100 - product.discountPercent)) / 100
    : price;

  const imageUrl = product.image
    ? urlFor(product.image).url()
    : null;

  return (
    <Card
      className="h-[27rem]"
      aria-label={`View details for ${product.name || "Unknown Product"}`}
    >
      <div className="relative">
        <CardHeader className="relative bg-[#f1f1f1]">
          {imageUrl ? (
            <Image
              width={200}
              height={100}
              src={imageUrl}
              alt={product.name || "Product Image"}
              className="w-full h-52 object-contain"
            />
          ) : (
            <div className="w-full h-52 bg-gray-200 flex items-center justify-center">
              No Image Available
            </div>
          )}
        </CardHeader>
        <CardContent>
          <h3 className="font-medium text-base mt-4">{product.name || "Unnamed Product"}</h3>
          <div className="flex gap-2 my-2">
            {renderStars(product.ratings || 0)}
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="flex gap-3 mt-2 items-center">
              {product.discountPercent ? (
                <>
                  <span className="text-lg">${discountedPrice.toFixed(2)}</span>
                  <span className="text-gray-500 line-through text-base">
                    ${price.toFixed(2)}
                  </span>
                  <span className="text-red-500 bg-red-100 px-3 py-1 rounded-xl text-base">
                    -{product.discountPercent}%
                  </span>
                </>
              ) : (
                <span className="text-lg">${discountedPrice.toFixed(2)}</span>
              )}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default ProductCard;