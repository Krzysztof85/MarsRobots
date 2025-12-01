import { DirectedPosition, Directions } from "../../shared/position";
import { RobotResult, robotSafeAt } from "../robotResult";

const CompassDirections = [
  Directions.North,
  Directions.East,
  Directions.South,
  Directions.West,
];

export function turnLeft(position: DirectedPosition): RobotResult {
  return rotationMove(position, -1);
}

export function turnRight(position: DirectedPosition): RobotResult {
  return rotationMove(position, 1);
}

function rotationMove(position: DirectedPosition, turns: number): RobotResult {
  const index = CompassDirections.indexOf(position.direction);
  return robotSafeAt({
    ...position,
    direction:
      CompassDirections[
        (index + CompassDirections.length + turns) % CompassDirections.length
      ],
  });
}
