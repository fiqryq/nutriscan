import { MetadataSchema } from "@/interface/search";
import { createZodFetcher } from "zod-fetch";

const fetchWithZod = createZodFetcher();
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET;

export const getOAuthToken = async (): Promise<string> => {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error("Missing CLIENT_ID or CLIENT_SECRET");
  }

  console.log(CLIENT_ID + "client");
  console.log(CLIENT_SECRET + "secret");

  const base64Encode = (str: string) => {
    return Buffer.from(str).toString("base64");
  };

  console.log("Fetching token...");
  const tokenResponse = await fetch(
    "https://oauth.fatsecret.com/connect/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + base64Encode(`${CLIENT_ID}:${CLIENT_SECRET}`),
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        scope: "basic",
      }),
    }
  );

  console.log(`Response status: ${tokenResponse.status}`);
  if (!tokenResponse.ok) {
    const errorDetails = await tokenResponse.text();
    console.error("Error response details: ", errorDetails);
    throw new Error(`Failed to fetch OAuth token: ${tokenResponse.statusText}`);
  }

  const tokenData = await tokenResponse.json();
  console.log("Token response data:", tokenData);

  if (!tokenData.access_token) {
    throw new Error("No access token returned");
  }

  return tokenData.access_token;
};

export const fetchFood = async (): Promise<any> => {
  try {
    const oauthToken = await getOAuthToken();
    const response = await fetchWithZod(
      MetadataSchema,
      `${BASE_URL}?method=foods.search.v3&search_expression=corn&format=json&include_sub_categories=true&flag_default_serving=true&max_results=1&language=en&region=US`,
      {
        headers: { Authorization: `Bearer ${oauthToken}` },
      }
    );

    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};
