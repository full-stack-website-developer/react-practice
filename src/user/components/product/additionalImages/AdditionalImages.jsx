import { useRef, useEffect, useState } from "react";
import { Box, Icon } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import styles from "./css/AdditionalImages.module.scss";

const AdditionalImages = ({ additionalImages, handleMainImage, featuredImage, mainImage }) => {
  const containerRef = useRef();
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

  const images = featuredImage
    ? [featuredImage, ...additionalImages.filter(img => img !== featuredImage)]
    : additionalImages;

  const currentIndex = images.findIndex(img => img === mainImage);

  // Check scroll position and update arrow visibility
  const checkScroll = () => {
    const el = containerRef.current;
    if (!el) return;

    setCanScrollUp(el.scrollTop > 0);
    setCanScrollDown(el.scrollTop + el.clientHeight < el.scrollHeight);
  };

  useEffect(() => {
    checkScroll();
  }, [images]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkScroll);
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  // Scroll and select previous image
  const handlePrevImage = () => {
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) prevIndex = images.length - 1; // cycle to last

    handleMainImage(images[prevIndex]);
    scrollToImage(prevIndex);
  };

  // Scroll and select next image
  const handleNextImage = () => {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= images.length) nextIndex = 0; // cycle to first

    handleMainImage(images[nextIndex]);
    scrollToImage(nextIndex);
  };

  // Scroll container to make image visible smoothly
  const scrollToImage = (index) => {
    const container = containerRef.current;
    if (!container) return;
    const child = container.children[index];
    if (child) {
      child.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  return (
    <Box position="relative" width="5vw">
      {/* Scroll Up Arrow */}
      {canScrollUp && (
        <Icon
          as={ChevronUpIcon}
          boxSize={9}
          color="black"
          position="absolute"
          top={2}
          left="50%"
          transform="translateX(-50%)"
          cursor="pointer"
          onClick={handlePrevImage}
          title="Select previous image"
          aria-label="Select previous image"
          animation="bounce 1.5s infinite"
          zIndex={10}
          bg="white"
          borderRadius="full"
          _hover={{ bg: "red.100" }}
        />
      )}

      <Box
        ref={containerRef}
        className={`${styles["images-conatiner"]} d-flex flex-column`}
        overflowY="auto"
        maxHeight="60vh"
      >
        {images.map((image, i) => (
          <Box
            key={image}
            className={`${mainImage === image ? styles.border : ""} ${styles.img}`}
            onClick={() => handleMainImage(image)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === "Enter" && handleMainImage(image)}
          >
            <img src={image} alt="product additional" />
          </Box>
        ))}
      </Box>

      {/* Scroll Down Arrow */}
      {canScrollDown && (
        <Icon
          as={ChevronDownIcon}
          boxSize={9}
          color="black"
          position="absolute"
          bottom={2}
          left="50%"
          transform="translateX(-50%)"
          cursor="pointer"
          onClick={handleNextImage}
          title="Select next image"
          aria-label="Select next image"
          animation="bounce 1.5s infinite"
          zIndex={10}
          bg="white"
          borderRadius="full"
          _hover={{ bg: "red.100" }}
        />
      )}
    </Box>
  );
};

export default AdditionalImages;
