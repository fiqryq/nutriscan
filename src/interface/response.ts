export interface I_Response {
  _id: string;
  _keywords: string[];
  added_countries_tags: any[];
  allergens: string;
  allergens_from_ingredients: string;
  allergens_from_user: string;
  allergens_hierarchy: any[];
  allergens_tags: any[];
  brands: string;
  brands_tags: string[];
  categories: string;
  categories_hierarchy: string[];
  categories_lc: string;
  categories_old: string;
  categories_properties: CategoriesProperties;
  categories_properties_tags: string[];
  categories_tags: string[];
  checkers_tags: any[];
  cities_tags: any[];
  code: string;
  codes_tags: string[];
  compared_to_category: string;
  complete: number;
  completeness: number;
  correctors_tags: string[];
  countries: string;
  countries_hierarchy: string[];
  countries_tags: string[];
  created_t: number;
  creator: string;
  data_quality_bugs_tags: any[];
  data_quality_errors_tags: any[];
  data_quality_info_tags: string[];
  data_quality_tags: string[];
  data_quality_warnings_tags: string[];
  data_sources: string;
  data_sources_tags: string[];
  ecoscore_data: EcoscoreData;
  ecoscore_grade: string;
  ecoscore_tags: string[];
  editors_tags: string[];
  emb_codes: string;
  emb_codes_tags: string[];
  entry_dates_tags: string[];
  food_groups: string;
  food_groups_tags: string[];
  id: string;
  images: Images;
  informers_tags: string[];
  ingredients_text_in: string;
  ingredients_text_with_allergens_in: string;
  interface_version_created: string;
  interface_version_modified: string;
  labels: string;
  labels_hierarchy: string[];
  labels_lc: string;
  labels_old: string;
  labels_tags: string[];
  lang: string;
  languages: Languages;
  languages_codes: Languages;
  languages_hierarchy: string[];
  languages_tags: string[];
  last_edit_dates_tags: string[];
  last_editor: string;
  last_image_dates_tags: string[];
  last_image_t: number;
  last_modified_by: string;
  last_modified_t: number;
  last_updated_t: number;
  lc: string;
  main_countries_tags: any[];
  max_imgid: string;
  misc_tags: string[];
  nova_group: number;
  nova_group_debug: string;
  nova_groups: string;
  nova_groups_markers: NovaGroupsMarkers;
  nova_groups_tags: string[];
  nutrient_levels: NutrientLevels;
  nutrient_levels_tags: string[];
  nutriments: Nutriments;
  nutriscore: { [key: string]: Nutriscore };
  nutriscore_2021_tags: string[];
  nutriscore_2023_tags: string[];
  nutriscore_data: NutriscoreData;
  nutriscore_grade: string;
  nutriscore_score: number;
  nutriscore_score_opposite: number;
  nutriscore_tags: string[];
  nutriscore_version: string;
  nutrition_data: string;
  nutrition_data_per: string;
  nutrition_data_prepared_per: string;
  nutrition_grade_fr: string;
  nutrition_grades: string;
  nutrition_grades_tags: string[];
  nutrition_score_beverage: number;
  nutrition_score_debug: string;
  nutrition_score_warning_no_fruits_vegetables_nuts: number;
  packaging: string;
  packaging_hierarchy: string[];
  packaging_lc: string;
  packaging_materials_tags: string[];
  packaging_old: string;
  packaging_old_before_taxonomization: string;
  packaging_recycling_tags: any[];
  packaging_shapes_tags: string[];
  packaging_tags: string[];
  packagings: IRespoSEPackaging[];
  packagings_materials: PackagingsMaterials;
  packagings_n: number;
  photographers_tags: string[];
  pnns_groups_1: string;
  pnns_groups_1_tags: string[];
  pnns_groups_2: string;
  pnns_groups_2_tags: string[];
  popularity_key: number;
  popularity_tags: string[];
  product_name_in: string;
  product_quantity: string;
  quantity: string;
  removed_countries_tags: any[];
  rev: number;
  scans_n: number;
  selected_images: SelectedImages;
  serving_quantity: string;
  serving_size: string;
  states: string;
  states_hierarchy: string[];
  states_tags: string[];
  traces: string;
  traces_from_ingredients: string;
  traces_from_user: string;
  traces_hierarchy: string[];
  traces_lc: string;
  traces_tags: string[];
  unique_scans_n: number;
  unknown_nutrients_tags: any[];
  update_key: string;
}

export interface CategoriesProperties {
  "agribalyse_proxy_food_code:en": string;
  "ciqual_food_code:en": string;
}

export interface EcoscoreData {
  adjustments: Adjustments;
  ecoscore_not_applicable_for_category: string;
  missing: Missing;
  scores: Scores;
  status: string;
}

export interface Adjustments {
  origins_of_ingredients: OriginsOfIngredients;
  packaging: AdjustmentsPackaging;
  production_system: ProductionSystem;
  threatened_species: ThreatenedSpecies;
}

export interface OriginsOfIngredients {
  aggregated_origins: AggregatedOrigin[];
  epi_score: number;
  epi_value: number;
  origins_from_categories: string[];
  origins_from_origins_field: string[];
  transportation_score: number;
  transportation_scores: { [key: string]: number };
  transportation_value: number;
  transportation_values: { [key: string]: number };
  value: number;
  values: { [key: string]: number };
  warning: string;
}

export interface AggregatedOrigin {
  epi_score: string;
  origin: string;
  percent: number;
  transportation_score: null;
}

export interface AdjustmentsPackaging {
  non_recyclable_and_non_biodegradable_materials: number;
  packagings: PackagingPackaging[];
  score: number;
  value: number;
}

export interface PackagingPackaging {
  ecoscore_material_score: number;
  ecoscore_shape_ratio: number;
  material: string;
  non_recyclable_and_non_biodegradable: string;
  shape: string;
}

export interface ProductionSystem {
  labels: any[];
  value: number;
  warning: string;
}

export interface ThreatenedSpecies {
  warning: string;
}

export interface Missing {
  ingredients: number;
  labels: number;
  origins: number;
}

export interface Scores {}

export interface Images {
  "1": The1;
  "2": The1;
  "3": The1;
  "4": The1;
  front_in: In;
  ingredients_in: In;
  nutrition_in: In;
  packaging_in: In;
}

export interface The1 {
  sizes: Sizes;
  uploaded_t: number;
  uploader: string;
}

export interface Sizes {
  "100": The100;
  "400": The100;
  full: The100;
  "200"?: The100;
}

export interface The100 {
  h: number;
  w: number;
}

export interface In {
  angle: number | null;
  coordinates_image_size: string;
  geometry: string;
  imgid: string;
  normalize: null;
  rev: string;
  sizes: Sizes;
  white_magic: null;
  x1: null | string;
  x2: null | string;
  y1: null | string;
  y2: null | string;
}

export interface Languages {
  in: number;
}

export interface NovaGroupsMarkers {
  "3": Array<string[]>;
}

export interface NutrientLevels {
  fat: string;
  salt: string;
  "saturated-fat": string;
  sugars: string;
}

export interface Nutriments {
  carbohydrates: number;
  carbohydrates_100g: number;
  carbohydrates_serving: number;
  carbohydrates_unit: string;
  carbohydrates_value: number;
  energy: number;
  "energy-kcal": number;
  "energy-kcal_100g": number;
  "energy-kcal_serving": number;
  "energy-kcal_unit": string;
  "energy-kcal_value": number;
  "energy-kcal_value_computed": number;
  energy_100g: number;
  energy_serving: number;
  energy_unit: string;
  energy_value: number;
  fat: number;
  fat_100g: number;
  fat_serving: number;
  fat_unit: string;
  fat_value: number;
  fiber: number;
  fiber_100g: number;
  fiber_serving: number;
  fiber_unit: string;
  fiber_value: number;
  "nova-group": number;
  "nova-group_100g": number;
  "nova-group_serving": number;
  "nutrition-score-fr": number;
  "nutrition-score-fr_100g": number;
  proteins: number;
  proteins_100g: number;
  proteins_serving: number;
  proteins_unit: string;
  proteins_value: number;
  salt: number;
  salt_100g: number;
  salt_serving: number;
  salt_unit: string;
  salt_value: number;
  "saturated-fat": number;
  "saturated-fat_100g": number;
  "saturated-fat_serving": number;
  "saturated-fat_unit": string;
  "saturated-fat_value": number;
  sodium: number;
  sodium_100g: number;
  sodium_serving: number;
  sodium_unit: string;
  sodium_value: number;
  sugars: number;
  sugars_100g: number;
  sugars_serving: number;
  sugars_unit: string;
  sugars_value: number;
}

export interface Nutriscore {
  category_available: number;
  data: Data;
  grade: string;
  nutrients_available: number;
  nutriscore_applicable: number;
  nutriscore_computed: number;
  score: number;
}

export interface Data {
  energy?: number;
  energy_points?: number;
  energy_value?: number;
  fiber?: number;
  fiber_points?: number;
  fiber_value?: number;
  fruits_vegetables_nuts_colza_walnut_olive_oils?: number;
  fruits_vegetables_nuts_colza_walnut_olive_oils_points?: number;
  fruits_vegetables_nuts_colza_walnut_olive_oils_value?: number;
  is_beverage: number;
  is_cheese: number;
  is_fat?: number;
  is_water: number;
  negative_points: number;
  positive_points: number;
  proteins?: number;
  proteins_points?: number;
  proteins_value?: number;
  saturated_fat?: number;
  saturated_fat_points?: number;
  saturated_fat_value?: number;
  sodium?: number;
  sodium_points?: number;
  sodium_value?: number;
  sugars?: number;
  sugars_points?: number;
  sugars_value?: number;
  grade?: string;
  score?: number;
  components?: Components;
  count_proteins?: number;
  count_proteins_reason?: string;
  is_fat_oil_nuts_seeds?: number;
  is_red_meat_product?: number;
  negative_points_max?: number;
  non_nutritive_sweeteners_max?: number;
  positive_nutrients?: string[];
  positive_points_max?: number;
}

export interface Components {
  negative: Tive[];
  positive: Tive[];
}

export interface Tive {
  id: string;
  points: number;
  points_max: number | null;
  unit: null | string;
  value: number;
}

export interface NutriscoreData {
  energy: number;
  energy_points: number;
  energy_value: number;
  fiber: number;
  fiber_points: number;
  fiber_value: number;
  fruits_vegetables_nuts_colza_walnut_olive_oils: number;
  fruits_vegetables_nuts_colza_walnut_olive_oils_points: number;
  fruits_vegetables_nuts_colza_walnut_olive_oils_value: number;
  is_beverage: number;
  is_cheese: number;
  is_fat: number;
  is_water: number;
  negative_points: number;
  positive_points: number;
  proteins: number;
  proteins_points: number;
  proteins_value: number;
  saturated_fat: number;
  saturated_fat_points: number;
  saturated_fat_value: number;
  sodium: number;
  sodium_points: number;
  sodium_value: number;
  sugars: number;
  sugars_points: number;
  sugars_value: number;
  grade?: string;
  score?: number;
}

export interface IRespoSEPackaging {
  material: string;
  shape: string;
}

export interface PackagingsMaterials {
  all: Scores;
  "en:plastic": Scores;
}

export interface SelectedImages {
  front: Front;
  ingredients: Front;
  nutrition: Front;
  packaging: Front;
}

export interface Front {
  display: Display;
  small: Display;
  thumb: Display;
}

export interface Display {
  in: string;
}

export interface ChatMessage {
  role: string;
  content: string;
}
