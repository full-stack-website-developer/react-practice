import { ChakraProvider } from "@chakra-ui/react";
import AdditionalImages from "./AdditionalImages";

const AdditionalImagesWithChakra = (props) => {
  return (
    <ChakraProvider>
      <AdditionalImages {...props} />
    </ChakraProvider>
  );
};

export default AdditionalImagesWithChakra;
