export const createFilled2DArray = <T extends any = any>(
  width: number,
  height: number,
  fillWith: (x: number, y: number) => T
): T[][] => {
  const arr: T[][] = [];

  for (let y = 0; y < width; y += 1) {
    arr.push([]);

    for (let x = 0; x < height; x += 1) {
      arr[y].push(fillWith(x, y));
    }
  }

  return arr;
};
