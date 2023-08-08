export interface Marker {
  color: string;
  symbol: string;
}
export interface Dimensions {
  width: number;
  height: number;
  squareSize: number;
  marker: Marker;
}

export interface DrawRectParams {
  x: number;
  y: number;
  marker?: Marker;
}
