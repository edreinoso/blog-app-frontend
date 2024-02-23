import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Navigate } from "react-router-dom";
import Card from "src/components/common/Card";
import Link from "src/components/common/Link";
import useStateSelector from "src/utils/useStateSelector";
import LoginForm from "./Form";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const { isAuthenticated } = useStateSelector((state) => state.auth);

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <Box bg="gray.50" minH="100vh" py="12" px={{ base: "4", lg: "8" }}>
      <Box maxW="md" mx="auto">
        <Heading textAlign="center" size="xl" fontWeight="extrabold">
          Sign in to your account
        </Heading>
        <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
          <Text as="span">Don&apos;t have an account?</Text>
          <Link to="/signup">Sign up now</Link>
        </Text>
        <Card>
          <LoginForm />
        </Card>
      </Box>
    </Box>
  );
};

export default Login;
