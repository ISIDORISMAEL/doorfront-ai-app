import { CollectedImageInterface } from "./../database/models/collectImage";
import { Request, Response, NextFunction } from "express";
import { CollectImageService } from "../services/collectImage";
import {
  AddHumanLabelsBody,
  DeleteImageBody,
  GetMultiImageByPano,
  GetMultiImagesByIdsBody,
  UpdateImageBody,
} from "../types/collectedImages";

const collectImageService = new CollectImageService();
export class CollectImageController {
  async createImage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const body: CollectedImageInterface = req.body;
    await collectImageService.createImage({ req, res, next }, body);
  }

  async updateImage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const body: UpdateImageBody = req.body;
    await collectImageService.updateImage({ req, res, next }, body);
  }

  async getMultiImageByIds(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const body: GetMultiImagesByIdsBody = req.body;
    await collectImageService.getMultiImageByIds({ req, res, next }, body);
  }

  async getMultiImageByPano(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const body: GetMultiImageByPano = req.body;
    await collectImageService.getMultiImageByPano({ req, res, next }, body);
  }

  async addHumanLabels(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const body: AddHumanLabelsBody = req.body;
    await collectImageService.addHumanLabels({ req, res, next }, body);
  }

  async deleteImage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { imageId }: DeleteImageBody = req.body;
    await collectImageService.deleteImage({ req, res, next }, imageId);
  }
}