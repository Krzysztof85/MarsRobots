import { MarsMissionControl } from "../src/marsMissionControl";

describe("Martian Robots should", () => {
  it.each`
    coordinates
    ${"51 3"}
    ${"50 51"}
  `("fail when coordinate is too high", ({ coordinates }) => {
    expect(() => new MarsMissionControl(coordinates)).toThrow(
      new Error("Coordinates must be lower than 50"),
    );
  });

  it("fail when instruction are too long", () => {
    const marsGrid = new MarsMissionControl("5 3");
    const tooLongInstruction = "R".repeat(101);
    expect(() => marsGrid.moveRobot("0 0 E", tooLongInstruction)).toThrow(
      new Error("Instruction is too long"),
    );
  });

  it.each`
    initialPosition | moves      | finalPosition
    ${"0 0 N"}      | ${"R"}     | ${"0 0 E"}
    ${"0 0 N"}      | ${"RR"}    | ${"0 0 S"}
    ${"0 0 N"}      | ${"RRR"}   | ${"0 0 W"}
    ${"0 0 N"}      | ${"RRRR"}  | ${"0 0 N"}
    ${"0 0 N"}      | ${"RRRRR"} | ${"0 0 E"}
    ${"0 0 E"}      | ${"R"}     | ${"0 0 S"}
    ${"0 0 S"}      | ${"R"}     | ${"0 0 W"}
    ${"0 0 W"}      | ${"R"}     | ${"0 0 N"}
    ${"0 0 S"}      | ${"RR"}    | ${"0 0 N"}
  `("turn right", ({ initialPosition, moves, finalPosition }) => {
    const marsGrid = new MarsMissionControl("1 1");
    const position = marsGrid.moveRobot(initialPosition, moves);
    expect(position).toBe(finalPosition);
  });

  it.each`
    initialPosition | moves     | finalPosition
    ${"0 0 N"}      | ${"L"}    | ${"0 0 W"}
    ${"0 0 N"}      | ${"LL"}   | ${"0 0 S"}
    ${"0 0 N"}      | ${"LLL"}  | ${"0 0 E"}
    ${"0 0 N"}      | ${"LLLL"} | ${"0 0 N"}
    ${"0 0 S"}      | ${"L"}    | ${"0 0 E"}
    ${"0 0 E"}      | ${"L"}    | ${"0 0 N"}
    ${"0 0 W"}      | ${"L"}    | ${"0 0 S"}
    ${"0 0 S"}      | ${"LL"}   | ${"0 0 N"}
  `("turn left", ({ initialPosition, moves, finalPosition }) => {
    const marsGrid = new MarsMissionControl("1 1");
    const position = marsGrid.moveRobot(initialPosition, moves);
    expect(position).toBe(finalPosition);
  });

  it.each`
    initialPosition | moves    | finalPosition
    ${"0 0 N"}      | ${"LR"}  | ${"0 0 N"}
    ${"0 0 N"}      | ${"LLR"} | ${"0 0 W"}
    ${"0 0 N"}      | ${"RRL"} | ${"0 0 E"}
    ${"0 0 N"}      | ${"RLR"} | ${"0 0 E"}
    ${"0 0 N"}      | ${"LRL"} | ${"0 0 W"}
  `("turn left and right", ({ initialPosition, moves, finalPosition }) => {
    const marsGrid = new MarsMissionControl("1 1");
    const position = marsGrid.moveRobot(initialPosition, moves);
    expect(position).toBe(finalPosition);
  });

  it.each`
    initialPosition | moves    | finalPosition
    ${"0 0 N"}      | ${"F"}   | ${"0 1 N"}
    ${"0 0 N"}      | ${"FF"}  | ${"0 2 N"}
    ${"0 0 N"}      | ${"FFF"} | ${"0 3 N"}
    ${"0 0 E"}      | ${"F"}   | ${"1 0 E"}
    ${"0 0 E"}      | ${"FF"}  | ${"2 0 E"}
    ${"0 0 E"}      | ${"FFF"} | ${"3 0 E"}
  `("move", ({ initialPosition, moves, finalPosition }) => {
    const marsGrid = new MarsMissionControl("5 5");
    const position = marsGrid.moveRobot(initialPosition, moves);

    expect(position).toBe(finalPosition);
  });

  it.each`
    initialPosition | moves        | finalPosition
    ${"0 0 N"}      | ${"RF"}      | ${"1 0 E"}
    ${"0 0 N"}      | ${"RFF"}     | ${"2 0 E"}
    ${"0 0 N"}      | ${"FRF"}     | ${"1 1 E"}
    ${"0 0 N"}      | ${"FRFRF"}   | ${"1 0 S"}
    ${"0 0 N"}      | ${"FRFRFRF"} | ${"0 0 W"}
    ${"0 1 S"}      | ${"F"}       | ${"0 0 S"}
    ${"1 0 W"}      | ${"F"}       | ${"0 0 W"}
  `("turn and move", ({ initialPosition, moves, finalPosition }) => {
    const marsGrid = new MarsMissionControl("10 10");
    const position = marsGrid.moveRobot(initialPosition, moves);

    expect(position).toBe(finalPosition);
  });

  it.each`
    initialPosition | moves     | boundary | finalPosition
    ${"0 0 N"}      | ${"F"}    | ${"0 0"} | ${"0 0 N LOST"}
    ${"0 0 N"}      | ${"RF"}   | ${"0 0"} | ${"0 0 E LOST"}
    ${"0 0 N"}      | ${"RRF"}  | ${"0 0"} | ${"0 0 S LOST"}
    ${"0 0 N"}      | ${"RRRF"} | ${"0 0"} | ${"0 0 W LOST"}
  `("move and lost", ({ initialPosition, moves, boundary, finalPosition }) => {
    const marsGrid = new MarsMissionControl(boundary);
    const position = marsGrid.moveRobot(initialPosition, moves);

    expect(position).toBe(finalPosition);
  });

  it.each`
    initialPosition | moves     | expectedPosition
    ${"4 4 N"}      | ${"FF"}   | ${"4 5 N"}
    ${"4 4 N"}      | ${"FFLF"} | ${"3 5 W"}
  `(
    "ignore move when the scent is approached",
    ({ initialPosition, moves, expectedPosition }) => {
      const marsGrid = new MarsMissionControl("5 5");
      marsGrid.moveRobot("4 5 N", "F");

      const position = marsGrid.moveRobot(initialPosition, moves);

      expect(position).toStrictEqual(expectedPosition);
    },
  );

  it("allow multiple robots to leave scents at different positions", () => {
    const marsGrid = new MarsMissionControl("5 5");
    marsGrid.moveRobot("5 5 N", "F");
    marsGrid.moveRobot("5 5 E", "F");

    expect(marsGrid.moveRobot("5 5 N", "F")).toBe("5 5 N");
    expect(marsGrid.moveRobot("5 5 E", "F")).toBe("5 5 E");
  });
});
