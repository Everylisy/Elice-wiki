import is from "@sindresorhus/is";
import { commentService } from "../services/commentService";
import { userService } from "../services/userService";
import { headerError } from "../utils/errorMessages";

class commentController {
  static async addComment(req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(headerError);
      }
      const { userId } = req.currentUser;
      const user = await userService.findUser({ userId });
      const userName = user["name"];
      const { boardId, content } = req.body;
      console.log("userId", userId);
      console.log("userName", userName);
      console.log("boardId", boardId);
      console.log("content", content);
      await commentService.addComment({
        boardId,
        userId,
        userName,
        content,
      });

      res.status(201).json({ status: "success" });
    } catch (error) {
      next(error);
    }
  }

  static async addReComment(req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(headerError);
      }
      const { userId } = req.currentUser;
      const user = await userService.findUser({ userId });
      const userName = user["name"];
      const { target, content } = req.body;

      await commentService.addReComment({
        target,
        userId,
        userName,
        content,
      });

      res.status(201).json({ status: "success" });
    } catch (error) {
      next(error);
    }
  }

  static async getComment(req, res, next) {
    try {
      const { commentId } = req.params;
      const foundComment = await commentService.getComment({ commentId });

      res.status(200).json({ status: "success", payload: foundComment });
    } catch (error) {
      next(error);
    }
  }

  static async getCommentList(req, res, next) {
    try {
      const { boardId } = req.params;
      const foundList = await commentService.getCommentList({ boardId });

      res.status(200).json({ status: "success", payload: foundList });
    } catch (error) {
      next(error);
    }
  }

  static async setComment(req, res, next) {
    try {
      const { commentId } = req.params;

      const toUpdate = req.body;

      await commentService.setComment({
        commentId,
        toUpdate,
      });

      res.status(200).json({ status: "success" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteComment(req, res, next) {
    try {
      const { commentId } = req.params;
      await commentService.deleteComment({ commentId });

      res.status(200).json({ status: "success" });
    } catch (error) {
      next(error);
    }
  }
}
export { commentController };
