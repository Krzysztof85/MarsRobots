import { ScentChecker } from "../mars/scentMap";
import { GridBounds } from "../mars/gridBounds";
import { Moves, robotMoves } from "./robotMoves";
import { DirectedPosition, Directions } from "../shared/position";
import { RobotResult, robotSafeAt } from "./robotResult";

export class Robot {
  private static readonly MAX_INSTRUCTIONS = 100;
  private readonly initialPosition: DirectedPosition;
  private readonly boundary: GridBounds;
  private readonly scents: ScentChecker;

  private constructor(
    initialPosition: DirectedPosition,
    boundary: GridBounds,
    scents: ScentChecker,
  ) {
    this.scents = scents;
    this.initialPosition = initialPosition;
    this.boundary = boundary;
  }

  public static from(
    initialPosition: string,
    boundary: GridBounds,
    scents: ScentChecker,
  ) {
    const position = Robot.parseInitialPosition(initialPosition);
    return new Robot(position, boundary, scents);
  }

  public execute(instructions: string): RobotResult {
    this.validate(instructions);
    let currentPosition: DirectedPosition = this.initialPosition;
    for (const command of instructions) {
      const handler = robotMoves[command as Moves];
      const outcome = handler(currentPosition, this.boundary, this.scents);
      if (outcome.lost) return outcome;
      currentPosition = outcome.position;
    }
    return robotSafeAt(currentPosition);
  }

  private validate(instructions: string) {
    if (instructions.length > Robot.MAX_INSTRUCTIONS)
      throw new Error("Instruction is too long");
  }

  private static parseInitialPosition(position: string): DirectedPosition {
    const [initialX, initialY, initialDirection] = position.split(" ");
    return {
      position: {
        x: Number(initialX),
        y: Number(initialY),
      },
      direction: initialDirection as Directions,
    };
  }
}
