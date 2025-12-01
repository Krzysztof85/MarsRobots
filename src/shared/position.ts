export enum Directions {
  North = "N",
  East = "E",
  South = "S",
  West = "W",
}

export type Position = Readonly<{
  x: number;
  y: number;
}>;

export type DirectedPosition = Readonly<{
  position: Position;
  direction: Directions;
}>;
