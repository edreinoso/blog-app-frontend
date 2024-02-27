import { Box, Button, Flex, Grid, Heading, Spinner } from "@chakra-ui/react";
import React from "react";
import { HiPlus } from "react-icons/hi";
import { Link as RouterLink } from "react-router-dom";
import {
  useRetrieveBlogPosts,
} from "src/services/blogposts";
import { BlogPost, User } from "src/types";
import useStateSelector from "src/utils/useStateSelector";
import ArticleCard from "./ArticleCard";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [blogposts, setBlogposts] = React.useState<BlogPost[]>([]);

  const { isAuthenticated } = useStateSelector((state) => state.auth);

  // Correctly destructure the object returned by useGetAllBlogPosts
  const { data: blogsdata, isLoading } = useRetrieveBlogPosts();

  // Directly use the data returned by the hook
  React.useEffect(() => {
    if (blogsdata) {
      // Assuming blogsData directly contains the array of blog posts and users
      setBlogposts(blogsdata.data.blogposts || []);
      setUsers(blogsdata.data.users || []);
    }
  }, [blogsdata]); // Dependency array ensures this effect runs only when blogsData changes
  
  return (
    <Box bg="gray.50" minH="100vh" py="12" px={{ base: "4", lg: "8" }}>
      <Box maxW="5xl" mx="auto">
        <Flex justifyContent="space-between">
          <Heading>Latest Articles</Heading>
          {isAuthenticated && (
            <Button
              type="button"
              colorScheme="purple"
              size="md"
              rightIcon={<HiPlus />}
              as={RouterLink}
              to="/posts/new"
            >
              Create Post
            </Button>
          )}
        </Flex>

        <Grid my={5} gap={4} gridTemplateColumns="1fr 1fr 1fr">
          {blogposts.map((data) => {
            const user = users.find((u) => u.id === data.user_id);
            if (!user) return null;
            return <ArticleCard key={data.id} data={data} user={user} />;
          })}
        </Grid>

        {isLoading && (
          <Flex justifyContent="center" my={4}>
            <Spinner color="purple.500" />
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default Home;
