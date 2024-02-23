import { Box, Button, Flex, Grid, Heading, Spinner } from "@chakra-ui/react";
import React from "react";
import { HiPlus } from "react-icons/hi";
import { Link as RouterLink } from "react-router-dom";
import BlogPostsAPI, {
  PostPaginateRequestBody,
  PostPaginateResponseBody,
} from "src/services/blogposts";
import { BlogPost, User } from "src/types";
import useApi from "src/utils/useApi";
import useStateSelector from "src/utils/useStateSelector";
import ArticleCard from "./ArticleCard";

interface HomeProps {}

const SEARCH_LIMIT = 6;

const Home: React.FC<HomeProps> = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [blogposts, setBlogposts] = React.useState<BlogPost[]>([]);
  const [hasMore, setHasMore] = React.useState<boolean>(false);

  const { isAuthenticated } = useStateSelector((state) => state.auth);

  const [{ isPending }, postPaginate] = useApi<
    PostPaginateRequestBody,
    PostPaginateResponseBody
  >(BlogPostsAPI.buildPostPaginate());

  const paginate = async () => {
    let res;

    if (blogposts.length === 0) {
      res = await postPaginate({
        cursor: Date.now(),
        limit: SEARCH_LIMIT,
      });
    } else {
      const oldestTimestamp = Math.min(...blogposts.map((bp) => bp.created_at));
      res = await postPaginate({
        cursor: oldestTimestamp,
        limit: SEARCH_LIMIT,
      });
    }

    if (res.isOk) {
      setUsers([...users, ...res.data.data.users]);
      setBlogposts([...blogposts, ...res.data.data.blogposts]);
      setHasMore(res.data.data.has_more);
    }
  };

  React.useEffect(() => {
    paginate();
  }, []);

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

        {isPending && (
          <Flex justifyContent="center" my={4}>
            <Spinner color="purple.500" />
          </Flex>
        )}

        {hasMore && (
          <Flex justifyContent="center" mt={5}>
            <Button
              isLoading={isPending}
              type="button"
              colorScheme="gray"
              size="lg"
              fontSize="md"
              onClick={paginate}
            >
              Load More
            </Button>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default Home;
