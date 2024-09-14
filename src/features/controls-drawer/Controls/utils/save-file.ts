export const saveFile = (file: string, fileName: string) => {
  const a = document.createElement("a");

  a.href = file;
  a.download = fileName;
  a.click();
};
