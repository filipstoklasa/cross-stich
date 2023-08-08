import { type ChangeEvent, type PropsWithChildren, useRef } from "react";
import { Button } from "@chakra-ui/react";

interface FileButtonProps {
  onChange: (file: File) => void;
  accept?: string;
}

export const FileButton = ({
  children,
  accept,
  onChange,
}: PropsWithChildren<FileButtonProps>) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onLoadPattern = () => {
    inputRef.current?.click();
  };

  const onInputChange = ({
    target: { files },
  }: ChangeEvent<HTMLInputElement>) => {
    files?.[0] && onChange(files[0]);
  };

  return (
    <>
      <Button onClick={onLoadPattern}>{children}</Button>
      <input
        ref={inputRef}
        hidden
        type="file"
        onChange={onInputChange}
        accept={accept}
      />
    </>
  );
};
