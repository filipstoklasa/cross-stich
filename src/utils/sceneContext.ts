export const getScene = () =>
  document.getElementById("scene") as HTMLCanvasElement;

export const getSceneContext = () => getScene().getContext("2d")!;
