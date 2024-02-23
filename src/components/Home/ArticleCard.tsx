import { Flex, Text } from "@chakra-ui/react";
import { BlogPost, User } from "@types";
import React from "react";
import { HiCalendar } from "react-icons/hi";
import Card from "src/components/common/Card";
import Link from "src/components/common/Link";

interface ArticleCardProps {
  data: BlogPost;
  user: User;
}

// NOTE: we are just mocking the truncated data
// coming from the server due to time constraints
// as we actually receive the entire article from the API.
const PREVIEW_CONTENT_LENGTH = 65;

const ArticleCard: React.FC<ArticleCardProps> = ({ data, user }) => {
  return (
    <Card px={{ base: "4", md: "6" }} py={6}>
      <Text fontWeight="semibold" fontSize="md">
        {data.title}
      </Text>
      <Text color="gray.700" fontSize="md" mt={2}>
        {data.content.slice(0, PREVIEW_CONTENT_LENGTH)}...
      </Text>
      <Flex mt={3} justifyContent="space-between">
        <Text color="gray.700" fontSize="sm">
          By{" "}
          <Link to={`/users/${user.id}`}>
            {user.first_name} {user.last_name}
          </Link>
        </Text>

        <Flex>
          <Text color="gray.400">
            <HiCalendar display="inline" />
          </Text>
          <Text ml={1} color="gray.500" fontSize="xs">
            {new Date(data.created_at).toLocaleDateString()}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
};

export default ArticleCard;
