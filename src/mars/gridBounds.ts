import { Position } from "../shared/position";

export class GridBounds {
  private static readonly LIMIT = 50;
  private readonly max: Position;

  private constructor(position: Position) {
    this.max = position;
  }

  public static from(input: string): GridBounds {
    const position: Position = GridBounds.parseBoundary(input);
    this.validateBoundary(position);
    return new GridBounds(position);
  }

  isOutside(position: Position): boolean {
    return (
      position.x < 0 ||
      position.x > this.max.x ||
      position.y < 0 ||
      position.y > this.max.y
    );
  }

  private static validateBoundary(position: Position) {
    if (position.x > GridBounds.LIMIT || position.y > GridBounds.LIMIT)
      throw new Error(`Coordinates must be lower than ${GridBounds.LIMIT}`);
  }

  private static parseBoundary(boundary: string): Position {
    const dataBoundary = boundary.split(" ");
    return {
      x: Number(dataBoundary[0]),
      y: Number(dataBoundary[1]),
    };
  }
}
