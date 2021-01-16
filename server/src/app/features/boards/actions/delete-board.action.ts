import { Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import { CommandBus } from "../../../../shared/command-bus";
import { DeleteBoardCommand } from "../commands/delete-board.command";

export interface DeleteBoardActionDependencies {
  commandBus: CommandBus;
}

export const deleteBoardActionValidation = celebrate(
  {
    headers: Joi.object(),
    body: Joi.object({
      boardId: Joi.string().uuid(),
    }),
  },
  { abortEarly: false },
);

const deleteBoardAction = ({ commandBus }: DeleteBoardActionDependencies) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  commandBus
    .execute(
      new DeleteBoardCommand({
        userId: req.userId,
        boardId: req.body.boardId,
      }),
    )
    .then((commandResult) => {
      res.json({ result: true });
    })
    .catch(next);
};
export default deleteBoardAction;
