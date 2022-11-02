import { BaseModel } from "../@types";

export interface Project extends BaseModel {
  name: string;
  description: string;
  ownerId?: number;
}

