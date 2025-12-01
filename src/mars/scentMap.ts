import { DirectedPosition } from "../shared/position";

export interface ScentChecker {
  has(position: DirectedPosition): boolean;
}

export class ScentMap implements ScentChecker {
  private scents = new Set<string>();

  public add(position: DirectedPosition): void {
    this.scents.add(this.key(position));
  }

  public has(position: DirectedPosition): boolean {
    return this.scents.has(this.key(position));
  }

  private key(position: DirectedPosition): string {
    return `${position.position.x}:${position.position.y}:${position.direction}`;
  }
}
