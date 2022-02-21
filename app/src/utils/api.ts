import { NavigateFunction } from "react-router-dom";
import {
  CollectedLabelInterface,
  ImageLocation,
  PovInterface,
} from "../types/collectedImage";

export interface CreateImageData {
  image_id: string;
  location: ImageLocation;
  pov: PovInterface;
  creator: string;
  pano: string;
}

export interface UpdateImageData {
  fileName: string;
  url: string;
  model_labels: CollectedLabelInterface[];
}

export interface CollectedImageApiReturnType<T> {
  code: number;
  message: string;
  data?: T;
}

export interface HandleFailedTokenFuncs {
  navigate: NavigateFunction;
  deleteAllLocal: () => void;
  clearUserInfo: () => void;
}
