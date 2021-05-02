interface BirdData {
  x: number;
  y: number;
  angle: number;
  sprites?: HTMLImageElement[];
  width?: number;
  height?: number;
  state?: number;
  i?: number;
}

interface PlayerBirdData extends BirdData {
  score: number;
  highscore: number;
  collision: boolean;
  socket: SocketIOClient.Socket;
  controlsAdded: boolean;
}

interface CanvasProps {
  width: number;
  height: number;
}

interface ControlsPack {
  startGame: () => void;
  restartGame: () => void;
  isDeathScreenOn: boolean;
  gameTypeHook: [string, React.Dispatch<React.SetStateAction<string>>];
}

type toDraw = [
  Backgorund,
  PipesFactory,
  BaseFactory,
  PlayerBird,
  EnemyBirdsFactory
];

interface BaseData {
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
}

interface PipeData {
  width: number;
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
}
