export const getText = (
  file: File,
  callback: (source: string | ArrayBuffer | null) => void
) => {
  const reader = new FileReader();

  reader.onload = () => {
    callback(reader.result);
  };

  reader.readAsText(file);
};
