import { DirectedPosition } from "../shared/position";
import { GridBounds } from "../mars/gridBounds";
import { ScentChecker } from "../mars/scentMap";
import { RobotResult } from "./robotResult";
import { forwardMove } from "./move/forwardMove";
import { turnLeft, turnRight } from "./move/rotationMove";

export enum Moves {
  Forward = "F",
  TurnLeft = "L",
  TurnRight = "R",
}

export type MoveHandler = (
  position: DirectedPosition,
  boundary: GridBounds,
  scents: ScentChecker,
) => RobotResult;

export const robotMoves: Record<Moves, MoveHandler> = {
  [Moves.Forward]: (position, boundary, scents) =>
    forwardMove(position, boundary, scents),
  [Moves.TurnLeft]: (position) => turnLeft(position),
  [Moves.TurnRight]: (position) => turnRight(position),
};
