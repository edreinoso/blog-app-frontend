import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

interface CardProps extends BoxProps {}

const Card: React.FC<CardProps> = (props) => {
  return (
    <Box
      bg="white"
      py="8"
      px={{ base: "4", md: "10" }}
      shadow="base"
      rounded={{ sm: "lg" }}
      {...props}
    />
  );
};

export default Card;
