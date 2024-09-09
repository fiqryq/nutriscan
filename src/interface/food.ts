import * as z from "zod";

export const MetricServingUnitSchema = z.enum(["g"]);
export type MetricServingUnit = z.infer<typeof MetricServingUnitSchema>;

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

export const FoodImageSchema = z.object({
  image_url: z.string(),
  image_type: z.string(),
});
export type FoodImage = z.infer<typeof FoodImageSchema>;

export const FoodSubCategoriesSchema = z.object({
  food_sub_category: z.array(z.string()),
});
export type FoodSubCategories = z.infer<typeof FoodSubCategoriesSchema>;

export const ServingSchema = z.object({
  serving_id: z.string(),
  serving_description: z.string(),
  serving_url: z.string(),
  metric_serving_amount: z.string(),
  metric_serving_unit: MetricServingUnitSchema,
  number_of_units: z.string(),
  measurement_description: z.string(),
  calories: z.string(),
  carbohydrate: z.string(),
  protein: z.string(),
  fat: z.string(),
  saturated_fat: z.string(),
  polyunsaturated_fat: z.string(),
  monounsaturated_fat: z.string(),
  cholesterol: z.string(),
  sodium: z.string(),
  potassium: z.string(),
  fiber: z.string(),
  sugar: z.string(),
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

export const FoodImagesSchema = z.object({
  food_image: z.array(FoodImageSchema),
});
export type FoodImages = z.infer<typeof FoodImagesSchema>;

export const ServingsSchema = z.object({
  serving: z.array(ServingSchema),
});
export type Servings = z.infer<typeof ServingsSchema>;

export const FoodAttributesSchema = z.object({
  allergens: AllergensSchema,
  preferences: PreferencesSchema,
});
export type FoodAttributes = z.infer<typeof FoodAttributesSchema>;

export const FoodClassSchema = z.object({
  food_id: z.string(),
  food_name: z.string(),
  food_type: z.string(),
  food_sub_categories: FoodSubCategoriesSchema,
  food_url: z.string(),
  food_images: FoodImagesSchema,
  food_attributes: FoodAttributesSchema,
  servings: ServingsSchema,
});
export type FoodClass = z.infer<typeof FoodClassSchema>;

export const IFoodSchema = z.object({
  food: FoodClassSchema,
});
export type IFood = z.infer<typeof IFoodSchema>;
