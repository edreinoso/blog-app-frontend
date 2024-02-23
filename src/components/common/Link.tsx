import { chakra, HTMLChakraProps, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

interface LinkProps extends Omit<HTMLChakraProps<"a">, "href"> {
  to: string;
}

const Link: React.FC<LinkProps> = (props) => {
  return (
    <chakra.a
      as={RouterLink}
      marginStart={0.5}
      href="#"
      color={useColorModeValue("purple.500", "purple.200")}
      _hover={{ color: useColorModeValue("purple.600", "purple.300") }}
      {...props}
    />
  );
};

export default Link;
