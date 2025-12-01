import { MarsMissionControl } from "../src/marsMissionControl";

describe("Martian Robots should", () => {
  it("execute their moves correctly", () => {
    const maxCoordinates = "5 3";
    const marsGrid = new MarsMissionControl(maxCoordinates);

    expect(marsGrid.moveRobot("1 1 E", "RFRFRFRF")).toBe("1 1 E");
    expect(marsGrid.moveRobot("3 2 N", "FRRFLLFFRRFLL")).toBe("3 3 N LOST");
    expect(marsGrid.moveRobot("0 3 W", "LLFFFLFLFL")).toBe("2 3 S");
  });
});
