export const getBase64 = (
  file: File,
  callback: (source: string | ArrayBuffer | null) => void
) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = () => {
    callback(reader.result);
  };

  reader.onerror = () => {
    throw new Error("Error while loading file");
  };
};
