import { NextRequest, NextResponse } from "next/server";
import OpenFoodFacts from "openfoodfacts-nodejs";

export async function GET(req: NextRequest) {
  const client = new OpenFoodFacts(fetch);

  const { searchParams } = new URL(req.url);
  const barcode = searchParams.get("barcode");

  if (!barcode) {
    return NextResponse.json({ error: "Barcode is required" }, { status: 400 });
  }

  try {
    const product = await client.getProduct(barcode);

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product information" },
      { status: 500 }
    );
  }
}
