import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import Card from "src/components/common/Card";
import NewBlogPostForm from "./Form";

interface NewBlogPostProps {}

const NewBlogPost: React.FC<NewBlogPostProps> = () => {
  return (
    <Box bg="gray.50" minH="100vh" py="12" px={{ base: "4", lg: "8" }}>
      <Box maxW="xl" mx="auto">
        <Heading textAlign="center" size="xl" fontWeight="extrabold">
          Write a new blog post!
        </Heading>
        <Text mt="4" mb="8" align="center" maxW="xl" fontWeight="medium">
          After you submit it, it will be visible in the Home page.
        </Text>
        <Card>
          <NewBlogPostForm />
        </Card>
      </Box>
    </Box>
  );
};

export default NewBlogPost;
