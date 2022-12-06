import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  HostListener
} from '@angular/core';
import {
  COLS,
  BLOCK_SIZE,
  ROWS,
  COLORS,
  COLORSLIGHTER,
  LINES_PER_LEVEL,
  LEVEL,
  POINTS,
  KEY,
  COLORSDARKER
} from './constants';
import { Piece, IPiece } from './piece.component';
import { GameService } from './game.service';
import { Router } from '@angular/router';
import { RandomSeedService } from './random-seed.service';

@Component({
  selector: 'game-board',
  templateUrl: 'board.component.html'
})
export class BoardComponent implements OnInit {
  @ViewChild('board', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('next', { static: true })
  canvasNext: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  ctxNext: CanvasRenderingContext2D;
  board: number[][];
  piece: Piece;
  next: Piece;
  requestId: number;
  paused: boolean;
  levelCal: number = 0;
  seed = new RandomSeedService;

  gameStarted: boolean;
  time: { start: number; elapsed: number; level: number };
  points: number;
  highScore: number;
  lines: number;
  level: number;
  moves = {
    [KEY.LEFT]: (p: IPiece): IPiece => ({ ...p, x: p.x - 1 }),
    [KEY.RIGHT]: (p: IPiece): IPiece => ({ ...p, x: p.x + 1 }),
    [KEY.DOWN]: (p: IPiece): IPiece => ({ ...p, y: p.y + 1 }),
    [KEY.SPACE]: (p: IPiece): IPiece => ({ ...p, y: p.y + 1 }),
    [KEY.UP]: (p: IPiece): IPiece => this.service.rotate(p)
  };
  playSoundFn: Function;
  initGame: boolean;
  storedData: any = [];
  downClicks: number = 0;
  upClicks: number = 0;
  leftClicks: number = 0;
  rightClicks: number = 0;
  spacebarClicks: number = 0;
  lastPage: string;
  audio: HTMLAudioElement;
  currentMode: string;
  modes: any = [];
  showContinue: boolean;
  isTutorial: string;
  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    this.storeGameData();
    event.preventDefault();
  }
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.storeGameData();
    event.preventDefault();
    this.audio.pause();

  }
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY.ESC) {
      this.gameOver();
    } else if (this.moves[event.keyCode]) {
      event.preventDefault();
      // Get new state
      let p = this.moves[event.keyCode](this.piece);
      if (event.keyCode === KEY.SPACE) {
        // Hard drop
        while (this.service.valid(p, this.board)) {
          //this.points += POINTS.HARD_DROP;
          this.piece.move(p);
          p = this.moves[KEY.DOWN](this.piece);
        }
      } else if (this.service.valid(p, this.board)) {
        this.piece.move(p);
        if (event.keyCode === KEY.DOWN) {
          //this.points += POINTS.SOFT_DROP;
        }
      }
    }
    //To count key strokes
    if (event.key == "ArrowDown") {
      this.downClicks = this.downClicks + 1;

    } else if (event.key == "ArrowUp") {
      this.upClicks = this.upClicks + 1;
    }
    else if (event.key == "ArrowLeft") {
      this.leftClicks = this.leftClicks + 1;
    }
    else if (event.key == "ArrowRight") {
      this.rightClicks = this.rightClicks + 1;
    }
    else if (event.key == " ") {
      this.spacebarClicks = this.spacebarClicks + 1;
    }

  }

  constructor(private service: GameService, private router: Router) {
    // this.pause()
    this.lastPage = localStorage.getItem("currentPage")
    let isTutorial = localStorage.getItem("isTutorial")
    if (((this.lastPage == "tutInstructions" && isTutorial != 'true') || (this.lastPage == "instructions" && isTutorial != 'false'))) {
      this.router.navigate([this.lastPage]);
    }
    if (this.lastPage != "tutInstructions") {
      if (this.lastPage != "instructions") {
        this.router.navigate([this.lastPage]);
      }
    }
  }

  ngOnInit() {
    // this.pause()
    this.isTutorial = this.lastPage = localStorage.getItem("isTutorial")
    this.selectGameMode();
    localStorage.setItem("currentPage", "tetris")
    localStorage.getItem("score") == null ? localStorage.setItem("score", JSON.stringify([])) : '';

  }
  getOccurrence(array, value) {
    var count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
  }
  //To select game mode randomly 
  //need to toggle isModeSelected after feedback submitted
  selectGameMode() {
    let isModeSelected = localStorage.getItem("isModeSelected")
    if (isModeSelected == 'false' || isModeSelected == null) {
      this.modes = JSON.parse(localStorage.getItem("modes"))
      var selectMode;
      if (this.isTutorial == "true") {
        selectMode = "tutorial"
        localStorage.setItem("times", "1")
      }
      else {
        selectMode = this.modes.indexOf(localStorage.getItem("currentMode")) == -1 ? this.modes[Math.floor(Math.random() * this.modes.length)] : localStorage.getItem("currentMode");
        //to know repeated or not
        (this.getOccurrence(this.modes, localStorage.getItem("currentMode")) == 1 && localStorage.getItem("currentMode") != "tutorial") ? localStorage.setItem("times", "2") : localStorage.setItem("times", "1")
        this.modes.splice(this.modes.indexOf(selectMode), 1)
      };
      // isTutorial!="true"?this.modes.splice(this.modes.indexOf(selectMode), 1):null;
      localStorage.setItem("modes", JSON.stringify(this.modes))
      localStorage.setItem("currentMode", selectMode)
      localStorage.setItem("isModeSelected", "true")
    }
    this.initBoard();
    // this.initSound();
    this.initNext();
    this.resetGame();
    this.highScore = 0;
    this.initMusic();
    this.initSeed();
  }
  //for adding random seeding based on given conditions
  initSeed() {
    this.currentMode = localStorage.getItem("currentMode");
    let remainingModes=localStorage.getItem("modes");    
    if (this.currentMode == "tutorial") {
      this.seed.seedString = "Saarbrücken"
      this.seed.setString()
    } else if (this.currentMode != "tutorial" && remainingModes.includes(this.currentMode)) {
      this.seed.seedString = "Neunkirchen"
      this.seed.setString()
    }
    else {
      this.seed.seedString = "Frankfurt"
      this.seed.setString()
    }    
  }
  //for Initializing music
  initMusic() {
    this.currentMode = localStorage.getItem("currentMode");
    if (this.currentMode != null) {
      // localStorage.getItem("modes");
      // this.audio = new Audio();
      // this.audio.src = "../assets/music1.mp3";
      // this.audio.load();
      if (this.currentMode != "withoutMusic") {
        this.audio = new Audio();
        this.audio.src = `../assets/${this.currentMode}.mp3`;
        this.audio.loop = true;
        this.audio.load();
      }
    }

  }
  initBoard() {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    // Calculate size of canvas from constants.
    this.ctx.canvas.width = COLS * BLOCK_SIZE;
    this.ctx.canvas.height = ROWS * BLOCK_SIZE;

    // Scale so we don't need to give size on every draw.
    this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
  }

  initNext() {
    this.ctxNext = this.canvasNext.nativeElement.getContext('2d');

    // Calculate size of canvas from constants.
    // The + 2 is to allow for space to add the drop shadow to
    // the "next piece"
    this.ctxNext.canvas.width = 4 * BLOCK_SIZE + 2;
    this.ctxNext.canvas.height = 4 * BLOCK_SIZE;

    this.ctxNext.scale(BLOCK_SIZE, BLOCK_SIZE);
  }

  play() {

    if (!this.initGame) {
      this.gameStarted = true;
      this.initGame = true;
      this.resetGame();
      this.next = new Piece(this.ctx, this.seed.randomSeed());
      this.piece = new Piece(this.ctx, this.seed.randomSeed());
      this.next.drawNext(this.ctxNext);
      this.time.start = performance.now();

      // If we have an old game running a game then cancel the old
      if (this.requestId) {
        cancelAnimationFrame(this.requestId);
      }

      this.animate();
    } else {
      this.pause()
    }

  }

  resetGame() {
    this.points = 0;
    this.lines = 0;
    this.level = 0;
    this.board = this.getEmptyBoard();
    this.time = { start: 0, elapsed: 0, level: LEVEL[this.level] };
    this.paused = false;
    this.addOutlines();
  }

  animate(now = 0) {
    this.time.elapsed = now - this.time.start;
    if (this.time.elapsed > this.time.level) {
      this.time.start = now;
      if (!this.drop()) {
        this.gameOver();
        return;
      }
    }
    this.draw();
    this.requestId = requestAnimationFrame(this.animate.bind(this));
  }

  draw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.piece.draw();
    this.drawBoard();
  }

  drop(): boolean {
    let p = this.moves[KEY.DOWN](this.piece);
    if (this.service.valid(p, this.board)) {
      this.piece.move(p);
    } else {
      this.freeze();
      this.clearLines();
      if (this.piece.y === 0) {
        // Game over
        return false;
      }
      // this.playSoundFn([, , 224, .02, .02, .08, 1, 1.7, -13.9, , , , , , 6.7]);
      this.piece = this.next;
      this.next = new Piece(this.ctx, this.seed.randomSeed());
      this.next.drawNext(this.ctxNext);
    }
    return true;
  }

  clearLines() {
    let lines = 0;
    this.board.forEach((row, y) => {
      if (row.every(value => value !== 0)) {
        lines++;
        this.board.splice(y, 1);
        this.board.unshift(Array(COLS).fill(0));
      }
    });
    if (lines > 0) {
      this.points += this.service.getLinesClearedPoints(lines, this.level);
      this.lines += lines;
      if (this.lines >= 1) {
        this.level++;
        //To get level for each 3 lines clear level will increase
        this.levelCal = Math.floor(this.level / 3)
        this.lines -= 1;
        if (this.levelCal >= 1) {
          this.time.level = LEVEL[this.levelCal] / 2;
        }
      }
    }
  }

  freeze() {
    this.piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.board[y + this.piece.y][x + this.piece.x] = value;
        }
      });
    });
  }

  private add3D(x: number, y: number, color: number): void {
    //Darker Color
    this.ctx.fillStyle = COLORSDARKER[color];
    // Vertical
    this.ctx.fillRect(x + .9, y, .1, 1);
    // Horizontal
    this.ctx.fillRect(x, y + .9, 1, .1);

    //Darker Color - Inner 
    // Vertical
    this.ctx.fillRect(x + .65, y + .3, .05, .3);
    // Horizontal
    this.ctx.fillRect(x + .3, y + .6, .4, .05);

    // Lighter Color - Outer
    this.ctx.fillStyle = COLORSLIGHTER[color];

    // Lighter Color - Inner 
    // Vertical
    this.ctx.fillRect(x + .3, y + .3, .05, .3);
    // Horizontal
    this.ctx.fillRect(x + .3, y + .3, .4, .05);

    // Lighter Color - Outer
    // Vertical
    this.ctx.fillRect(x, y, .05, 1);
    this.ctx.fillRect(x, y, .1, .95);
    // Horizontal
    this.ctx.fillRect(x, y, 1, .05);
    this.ctx.fillRect(x, y, .95, .1);
  }

  private addOutlines() {
    for (let index = 1; index < COLS; index++) {
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(index, 0, .025, this.ctx.canvas.height);
    }

    for (let index = 1; index < ROWS; index++) {
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(0, index, this.ctx.canvas.width, .025);
    }
  }

  drawBoard() {
    this.board.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillStyle = COLORS[value];
          this.ctx.fillRect(x, y, 1, 1);
          this.add3D(x, y, value);
        }
      });
    });
    this.addOutlines();
  }

  pause() {
    this.gameStarted = !this.gameStarted;

    if (this.paused) {
      this.animate();
    } else {
      this.ctx.font = '1px Arial';
      this.ctx.fillStyle = 'black';
      this.ctx.fillText('GAME PAUSED', 1.4, 4);
      cancelAnimationFrame(this.requestId);
    }

    this.paused = !this.paused;
  }

  gameOver() {
    this.gameStarted = false;
    cancelAnimationFrame(this.requestId);
    this.highScore = this.points > this.highScore ? this.points : this.highScore;
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(1, 3, 8, 1.2);
    this.ctx.font = '1px Arial';
    this.ctx.fillStyle = 'red';
    this.ctx.fillText('GAME OVER', 1.8, 4, 8);
    if (this.currentMode != "withoutMusic") {
      this.audio.pause()
    }
    this.showContinue = true;
  }

  getEmptyBoard(): number[][] {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }
  //To store game data in local storage on page refresh
  storeGameData() {
    this.storedData = JSON.parse(localStorage.getItem("score"));
    this.storedData.push({
      "level": this.levelCal, "score": this.level * 15, "lines": this.level,
      "rightClicks": this.rightClicks, "downClicks": this.downClicks, "upClicks": this.upClicks, "leftClicks": this.leftClicks, "spacebarClicks": this.spacebarClicks, "mode": this.currentMode, "times": localStorage.getItem("times")
    });
    localStorage.setItem("score", JSON.stringify(this.storedData))
  }
  music() {
    if (this.currentMode != "withoutMusic") {
      if (this.gameStarted) {
        this.audio.play();
      }
      // audio.pause()
      else {
        this.audio.pause()
      }
    }

  }
  //to go to next page
  nextPage() {
    this.isTutorial = localStorage.getItem("isTutorial")
    if (this.isTutorial != "true") {
      if (localStorage.getItem("times") == "2") {
        this.storeGameData()
        this.router.navigate(['feedback'])
      } else {
        location.reload()
        localStorage.setItem("isModeSelected", "false");

      }
    } else {
      this.storeGameData()
      this.router.navigate(['instructions']);
    }
    // localStorage.setItem("isTutorial","false")
  }
}
