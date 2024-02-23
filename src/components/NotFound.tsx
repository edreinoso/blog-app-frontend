import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import Link from "./common/Link";
import LogoHeader from "./common/LogoHeader";

interface NotFoundProps {}

const NotFound: React.FC<NotFoundProps> = () => {
  return (
    <Box bg="gray.50" minH="100vh" py="12" px={{ base: "4", lg: "8" }}>
      <Box maxW="md" mx="auto">
        <LogoHeader />
        <Heading textAlign="center" size="xl" fontWeight="extrabold">
          404 - Nothing here
        </Heading>
        <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
          <Text as="span">Are you lost?</Text>
          <Link to="/">Go back home</Link>
        </Text>
      </Box>
    </Box>
  );
};

export default NotFound;
