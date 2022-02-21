import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user";
import {
  UserBody,
  LoginBody,
  UpdateImageBody,
  UpdateUserLabelsBody,
} from "../types";
import {
  GetUserScoreBody,
  QueryImageBody,
  QueryImageListBody,
  UpdateCreditBody,
  UpdateLabelCreditBody,
} from "../types/user";

const userService = new UserService();

export class UserController {
  async addUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    // await imageService.getAllImages({ req, res, next });
    const body: UserBody = req.body;
    await userService.addUser({ req, res, next }, body);
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    // await imageService.getAllImages({ req, res, next });
    const body: LoginBody = req.body;
    await userService.login({ req, res, next }, body);
  }

  async getUnLabelImageList(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const body: QueryImageListBody = req.body;
    await userService.getUnLabelImageList({ req, res, next }, body);
  }
  async addLabelImage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const body: QueryImageBody = req.body;
    await userService.addLabelImage({ req, res, next }, body);
  }
  async deleteLabelImage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const body: QueryImageBody = req.body;
    await userService.deleteLabelImage({ req, res, next }, body);
  }
  async addUnLabelImage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const body: QueryImageBody = req.body;
    await userService.addUnLabelImage({ req, res, next }, body);
  }
  async deleteUnLabelImage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const body: QueryImageBody = req.body;
    await userService.deleteUnLabelImage({ req, res, next }, body);
  }
  async addCredit(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const body: UpdateCreditBody = req.body;
    await userService.addCredit({ req, res, next }, body);
  }
  async addLabelCredit(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const body: UpdateLabelCreditBody = req.body;
    await userService.addLabelCredit({ req, res, next }, body);
  }
  async getUserScore(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const body: GetUserScoreBody = req.body;
    await userService.getUserScore({ req, res, next }, body);
  }
  async addBonusCredit(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const body: GetUserScoreBody = req.body;
    await userService.addBonusCredit({ req, res, next }, body);
  }
  async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    await userService.getAllUsers({ req, res, next });
  }

  // async updateImage(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   const body: UpdateImageBody = req.body;
  //   await userService.updateImage({ req, res, next }, body);
  // }
  // async addCreateCredit(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   const body: UpdateImageBody = req.body;
  //   await userService.addCreateCredit({ req, res, next }, body);
  // }
  // async addReviewCredit(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   const body: UpdateImageBody = req.body;
  //   await userService.addReviewCredit({ req, res, next }, body);
  // }
  // async addValidateCredit(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   const body: UpdateImageBody = req.body;
  //   await userService.addValidateCredit({ req, res, next }, body);
  // }
  // async addNumberByType(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   const body: UpdateUserLabelsBody = req.body;
  //   await userService.addNumberByType({ req, res, next }, body);
  // }
}