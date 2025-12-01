import { DirectedPosition } from "../shared/position";

export type RobotResult = Readonly<{
  position: DirectedPosition;
  lost: boolean;
}>;

export const robotLostAt = (
  lastKnownPosition: DirectedPosition,
): RobotResult => ({
  position: lastKnownPosition,
  lost: true,
});

export const robotSafeAt = (
  currentPosition: DirectedPosition,
): RobotResult => ({
  position: currentPosition,
  lost: false,
});
