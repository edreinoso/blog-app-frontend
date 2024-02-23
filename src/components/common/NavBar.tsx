import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { logout } from "src/store/actions/auth";
import useStateDispatch from "src/utils/useStateDispatch";
import useStateSelector from "src/utils/useStateSelector";
import Logo from "./Logo";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const dispatch = useStateDispatch();

  const { isAuthenticated, user } = useStateSelector((state) => state.auth);

  return (
    <Box position="sticky" bg="white" top={0} shadow="sm" py={4} zIndex={999}>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        maxW="5xl"
        mx="auto"
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          as={RouterLink}
          to="/"
          _hover={{ opacity: 0.9 }}
        >
          <Logo h={10} w={10} />
          <Text ml={4} fontSize="2xl" fontWeight="black" color="purple.500">
            SC Blog
          </Text>
        </Flex>

        <Box flex={1} />

        {isAuthenticated && user ? (
          <Flex alignItems="center">
            <Text mr={1}>Logged in as </Text>
            <Text fontWeight="bold">
              {user.first_name} {user.last_name}
            </Text>
            <Text mx={2}>|</Text>
            <button onClick={() => dispatch(logout())}>
              <Text color="purple.500">Logout</Text>
            </button>
          </Flex>
        ) : (
          <Flex alignItems="center">
            <Button
              as={RouterLink}
              to="/login"
              type="button"
              colorScheme="gray"
              variant="ghost"
              size="md"
            >
              Sign In
            </Button>
            <Button
              as={RouterLink}
              to="/signup"
              type="button"
              colorScheme="purple"
              size="md"
              ml={4}
            >
              Sign Up
            </Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default NavBar;
