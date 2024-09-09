// app/api/oauth/route.ts

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;

  if (!CLIENT_ID || !CLIENT_SECRET) {
    return NextResponse.json(
      { error: "Missing CLIENT_ID or CLIENT_SECRET" },
      { status: 500 }
    );
  }

  const base64Encode = (str: string): string =>
    Buffer.from(str).toString("base64");

  try {
    const tokenResponse = await fetch(
      "https://oauth.fatsecret.com/connect/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " + base64Encode(`${CLIENT_ID}:${CLIENT_SECRET}`),
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          scope: "basic",
        }),
      }
    );

    if (!tokenResponse.ok) {
      const errorDetails = await tokenResponse.text();
      return NextResponse.json(
        { error: errorDetails },
        { status: tokenResponse.status }
      );
    }

    const tokenData = await tokenResponse.json();
    console.log("🚀 ~ POST ~ tokenData:", tokenData);
    return NextResponse.json(tokenData, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching OAuth token:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
