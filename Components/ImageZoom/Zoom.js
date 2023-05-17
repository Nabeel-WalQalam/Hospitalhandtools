import React, { useState } from "react";
import { Box, Image } from "@chakra-ui/react";

const Zoom = ({ src, alt, zoomSrc, ...rest }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const handleZoomIn = () => setIsZoomed(true);
  const handleZoomOut = () => setIsZoomed(false);
  return (
    <>
      <Box position="relative" {...rest}>
        <Image
          //   overflow={"none"}
          src={src}
          alt={alt}
          onMouseEnter={handleZoomIn}
          onMouseLeave={handleZoomOut}
          transition="transform 0.3s"
          transform={isZoomed ? "scale(1.3)" : "scale(1)"}
          zIndex={1}
          //   border={"1px"}
          //   display={isZoomed ? "none" : "block"}
        />
        {isZoomed && (
          <Box
            // display={isZoomed ? "block" : "none"}
            position="absolute"
            top={0}
            left={0}
            zIndex={2}
            width="inherit"
            height="inherit"
            border={"1px"}
            backgroundColor="white"
            backgroundImage={`url(${zoomSrc || src})`}
            backgroundSize="cover"
            backgroundRepeat="no-repeat"
            backgroundPosition="center"
            onMouseLeave={handleZoomOut}
          />
        )}
      </Box>
    </>
  );
};

export default Zoom;
