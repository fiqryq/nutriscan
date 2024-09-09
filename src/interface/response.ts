export type ISugarGrade = "A" | "B" | "C" | "D" | "0";

export interface IResponse {
  title: string;
  description: string;
  image: string;
  nutrition: INutrition;
  sugar: Sugar;
}

export interface INutrition {
  carbo: string;
  protein: string;
  sugar: string;
  fat: string;
  salt: string;
}

export interface Sugar {
  grade: ISugarGrade;
  description: string;
}

export interface ChatMessage {
  role: string;
  content: string;
}
