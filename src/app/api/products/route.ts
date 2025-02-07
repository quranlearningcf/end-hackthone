import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const query = `
    *[_type == "products" && slug.current == $slug][0]{
      _id,
      name,
      description,
      price,
      "image": image.asset->url,
      category,
      discountPercent,
      "isNew": new,
      colors,
      sizes
    }
  `;

  const data = await client.fetch(query, { slug });
  return NextResponse.json(data);
}
