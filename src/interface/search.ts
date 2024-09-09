import * as z from "zod";

export const AllergenSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.string(),
});

export type Allergen = z.infer<typeof AllergenSchema>;

export const PreferencesSchema = z.object({
  preference: z.array(AllergenSchema),
});

export type Preferences = z.infer<typeof PreferencesSchema>;

export const FoodSubCategoriesSchema = z.object({
  food_sub_category: z.array(z.string()),
});

export type FoodSubCategories = z.infer<typeof FoodSubCategoriesSchema>;

export const ServingSchema = z.object({
  serving_id: z.string(),
  serving_description: z.string(),
  serving_url: z.string(),
  metric_serving_amount: z.string(),
  metric_serving_unit: z.string(),
  number_of_units: z.string(),
  measurement_description: z.string(),
  is_default: z.string(),
  calories: z.string(),
  carbohydrate: z.string(),
  protein: z.string(),
  fat: z.string(),
  saturated_fat: z.string(),
  polyunsaturated_fat: z.string(),
  monounsaturated_fat: z.string(),
  trans_fat: z.string(),
  cholesterol: z.string(),
  sodium: z.string(),
  potassium: z.string(),
  fiber: z.string(),
  sugar: z.string(),
  added_sugars: z.string(),
  vitamin_d: z.string(),
  vitamin_a: z.string(),
  vitamin_c: z.string(),
  calcium: z.string(),
  iron: z.string(),
});
export type Serving = z.infer<typeof ServingSchema>;

export const AllergensSchema = z.object({
  allergen: z.array(AllergenSchema),
});
export type Allergens = z.infer<typeof AllergensSchema>;

export const ServingsSchema = z.object({
  serving: z.array(ServingSchema),
});
export type Servings = z.infer<typeof ServingsSchema>;

export const FoodAttributesSchema = z.object({
  allergens: AllergensSchema,
  preferences: PreferencesSchema,
});
export type FoodAttributes = z.infer<typeof FoodAttributesSchema>;

export const FoodSchema = z.object({
  food_id: z.string(),
  food_name: z.string(),
  brand_name: z.string(),
  food_type: z.string(),
  food_sub_categories: FoodSubCategoriesSchema,
  food_url: z.string(),
  food_attributes: FoodAttributesSchema,
  servings: ServingsSchema,
});
export type Food = z.infer<typeof FoodSchema>;

export const ResultsSchema = z.object({
  food: z.array(FoodSchema),
});

export type Results = z.infer<typeof ResultsSchema>;

export const FoodsSearchSchema = z.object({
  max_results: z.string(),
  total_results: z.string(),
  page_number: z.string(),
  results: ResultsSchema,
});

export type FoodsSearch = z.infer<typeof FoodsSearchSchema>;

export const MetadataSchema = z.object({
  foods_search: FoodsSearchSchema,
});

export type Metadata = z.infer<typeof MetadataSchema>;
