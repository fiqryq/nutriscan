import { responseAPI } from "@/constant/food";

export const assistantPropmtAnalyzeFood = (): string => `
Extract the relevant nutritional information from the provided API response and use it to populate the JSON template below. Ensure the output is strictly the completed JSON object, with no additional text, explanations, or prefixes like "Here is the completed JSON object".

JSON Template for your response:
{
  "title": "{{food_name}}",
  "description": "{{food_description}}",
  "image": "{{image_url}}",
  "nutrition": {
    "carbo": "{{carbohydrates_per_100g}} return 0g if have 0 carbo",
    "protein": "{{protein_per_100g}} return 0g if have 0 protein",
    "sugar": "{{sugar_per_100g}} return 0g if have 0 sugar",
    "fat": "{{fat_per_100g}} return 0g if have 0 fat",
    "salt": "{{salt_per_100g}} return 0g if have 0 salt"
  },
  "sugar": {
    "grade": "{{sugar_grade}} return 0 if have 0 sugar",
    "description": "Enjoy the sweetness of {{food_name}}, certified with a food grade of {{sugar_grade}}. This product contains {{sugar_per_serving}} grams of sugar per serving."
  }
}

Return only the populated JSON object without any additional text.
`;

export const ChatPrompt = (): string => `
  You are a virtual nutritionist assistant. Your job is to answer user inquiries strictly based on the provided API data. Do not include any introductory phrases like "Based on the API response." Respond directly to the user's question with only the relevant information or calculations derived from the API response below.

  API Response: ${JSON.stringify(responseAPI)}
`;
