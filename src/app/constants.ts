export const COLS = 10;
export const ROWS = 20;
export const BLOCK_SIZE = 30;
export const LINES_PER_LEVEL = 10;
export const COLORS = [
  'none',
  'rgba(0, 255, 255)',
  'rgba(0, 0, 255)',
  'rgba(255, 132, 0)',
  'rgba(255, 255, 0)',
  'rgba(0, 255, 0)',
  'rgba(255, 0, 255)',
  'rgba(255, 0, 0)',
];
export const COLORSLIGHTER= [
  'none',
  'rgba(132, 255, 255)',
  'rgba(132, 132, 255)',
  'rgba(255, 195, 132)',
  'rgba(255, 255, 132)',
  'rgba(132, 255, 132)',
  'rgba(255, 132, 255)',
  'rgba(255, 132, 132)',
];
export const COLORSDARKER= [
  'none',
  'rgba(0, 132, 132)',
  'rgba(0, 0, 132)',
  'rgba(132, 65, 0)',
  'rgba(132, 132, 0)',
  'rgba(0, 132, 0)',
  'rgba(132, 0, 132)',
  'rgba(132, 0, 0)',
];
export const SHAPES = [
  [],
  [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
  [[2, 0, 0], [2, 2, 2], [0, 0, 0]],
  [[0, 0, 3], [3, 3, 3], [0, 0, 0]],
  [[4, 4], [4, 4]],
  [[0, 5, 5], [5, 5, 0], [0, 0, 0]],
  [[0, 6, 0], [6, 6, 6], [0, 0, 0]],
  [[7, 7, 0], [0, 7, 7], [0, 0, 0]]
];

export class KEY {
  static readonly ESC = 27;
  static readonly SPACE = 32;
  static readonly LEFT = 37;
  static readonly UP = 38;
  static readonly RIGHT = 39;
  static readonly DOWN = 40;
}

export class POINTS {
  static readonly SINGLE = 100;
  static readonly DOUBLE = 300;
  static readonly TRIPLE = 500;
  static readonly TETRIS = 800;
  static readonly SOFT_DROP = 1;
  static readonly HARD_DROP = 2;
}

export class LEVEL {
  static readonly 0 = 800;
  static readonly 1 = 680;
  static readonly 2 = 578;
  static readonly 3 = 489;
  static readonly 4 = 417;
  static readonly 5 = 357;
  static readonly 6 = 305;
  static readonly 7 = 261;
  static readonly 8 = 222;
  static readonly 9 = 189;
  static readonly 10 = 162;
  static readonly 11 = 138;
  static readonly 12 = 117;
  static readonly 13 = 100;
  static readonly 14 = 85;
  static readonly 15 = 73;
  static readonly 16 = 73;
  static readonly 17 = 73;
  static readonly 18 = 73;
  static readonly 19 = 50;
  static readonly 20 = 50;
  // 29+ is 20ms
}