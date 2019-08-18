declare module "sudoku-umd" {
  function generate(level: string): string;
  function solve(boardString: string): string;
  function board_string_to_grid(boardString: string): string[][];
  function board_grid_to_string(grid: string[][]): string;
  function print_board(board: string);
}
