import { GridBounds } from "./mars/gridBounds";
import { ScentMap } from "./mars/scentMap";
import { Robot } from "./robot/robot";

import { RobotResult } from "./robot/robotResult";

export class MarsMissionControl {
  private readonly boundary: GridBounds;
  private readonly scents = new ScentMap();

  constructor(maxCoordinates: string) {
    this.boundary = GridBounds.from(maxCoordinates);
  }

  public moveRobot(initialPosition: string, instructions: string): string {
    const robot = Robot.from(initialPosition, this.boundary, this.scents);
    const result: RobotResult = robot.execute(instructions);
    if (result.lost) {
      this.scents.add(result.position);
      return this.formatLostPosition(result);
    }

    return this.formatPosition(result);
  }

  private formatLostPosition(result: RobotResult): string {
    return `${this.formatPosition(result)} LOST`;
  }

  private formatPosition(result: RobotResult): string {
    const { position, direction } = result.position;
    return `${position.x} ${position.y} ${direction}`;
  }
}
