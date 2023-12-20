import { Card, CardBody, CardHeader } from "@chakra-ui/react";
import {
  CloseButton,
  IconButton,
  Tooltip,
  useOutsideClick,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { BsImageFill } from "react-icons/bs";
import { Input } from "@/components/Input";
import { Slide } from "@chakra-ui/react";
import { getBase64 } from "@/features/Controls/utils/getBase64";
import { useConfig } from "@/context/Config";

export const Pattern = () => {
  const ref = useRef(null);
  const [zoom, setZoom] = useState(100);
  const [open, setMenuOpen] = useState(false);
  const [position, setPosition] = useState([50, 50]);

  const [background, setBackground] = useState<string | ArrayBuffer | null>(
    null
  );

  const {
    config: { width, height, pattern },
  } = useConfig();

  useOutsideClick({
    ref: ref,
    handler: () => setMenuOpen(false),
  });

  useEffect(() => {
    if (pattern) {
      getBase64(pattern, setBackground);
    }
  }, [pattern]);

  if (!background) {
    return null;
  }

  return (
    <>
      <Tooltip
        label="Configure position of the background pattern."
        placement="right"
      >
        <IconButton
          data-testid="pattern-button"
          aria-label="menu"
          position="fixed"
          onClick={() => setMenuOpen(() => true)}
          icon={<BsImageFill />}
          top={2}
          left={55}
          zIndex={100}
        />
      </Tooltip>
      <Slide in={open} direction="left" style={{ zIndex: 100, top: 55 }}>
        <Card ref={ref} maxW={220} variant="filled">
          <CardHeader display="flex" justifyContent="space-between">
            Pattern configuration
            <CloseButton onClick={() => setMenuOpen(false)} />
          </CardHeader>
          <CardBody display="flex" flexDirection="column" gap={2}>
            <Input
              label="Zoom %"
              value={zoom}
              type="number"
              onChange={({ target: { valueAsNumber } }) =>
                setZoom(valueAsNumber)
              }
            />
            <Input
              label="X axis %"
              value={position[0]}
              type="number"
              onChange={({ target: { valueAsNumber } }) =>
                setPosition((prev) => [valueAsNumber, prev[1]])
              }
            />
            <Input
              label="Y axis %"
              value={position[1]}
              type="number"
              onChange={({ target: { valueAsNumber } }) =>
                setPosition((prev) => [prev[0], valueAsNumber])
              }
            />
          </CardBody>
        </Card>
      </Slide>
      {background && (
        <div
          className="absolute bg-no-repeat"
          data-testid="pattern-layer"
          style={{
            width,
            height,
            backgroundPosition: position.map((item) => `${item}%`).join(" "),
            backgroundSize: `${zoom}%`,
            backgroundImage: `url('${background}')`,
          }}
        />
      )}
    </>
  );
};
