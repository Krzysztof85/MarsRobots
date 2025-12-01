import { DirectedPosition } from "../../shared/position";
import { GridBounds } from "../../mars/gridBounds";
import { ScentChecker } from "../../mars/scentMap";
import { robotLostAt, RobotResult, robotSafeAt } from "../robotResult";

export function forwardMove(
  directedPosition: DirectedPosition,
  boundary: GridBounds,
  scents: ScentChecker,
): RobotResult {
  if (scents.has(directedPosition)) return robotSafeAt(directedPosition);
  const next = computeNextPosition(directedPosition);
  return boundary.isOutside(next.position)
    ? robotLostAt(directedPosition)
    : robotSafeAt(next);
}

function computeNextPosition(
  directedPosition: DirectedPosition,
): DirectedPosition {
  const { direction, position: position } = directedPosition;
  const nextPositions = {
    N: { x: position.x, y: position.y + 1 },
    E: { x: position.x + 1, y: position.y },
    S: { x: position.x, y: position.y - 1 },
    W: { x: position.x - 1, y: position.y },
  };
  return { ...directedPosition, position: nextPositions[direction] };
}
