import { Button, Stack, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { Navigate } from "react-router-dom";
import { PostRequestBody, useCreateBlogPost } from "src/services/blogposts";
import * as Yup from "yup";
import { useSelector } from 'react-redux';
import { RootState } from 'src/types';
import BlogPostFields from "../common/BlogPostFields";

interface NewBlogPostFormProps {}

type NewBlogPostFormValues = {
  title: string;
  content: string;
};

const NewBlogPostForm: React.FC<NewBlogPostFormProps> = () => {
  const { mutate: createBlogPost, isLoading, isSuccess } = useCreateBlogPost();
  const userId = useSelector((state: RootState) => state.auth.user.id);

  console.log('User ID', userId);

  const toast = useToast();

  const validationSchema = Yup.object({
    title: Yup.string().required("Please insert a title"),
    content: Yup.string().required("Plese write some content."),
  });

  const initialValues: NewBlogPostFormValues = {
    title: "",
    content: "",
  };

  const handleSubmit = async (values: NewBlogPostFormValues) => {
    if (!userId) {
      console.log("User ID is missing")
      return;
    }

    const postValues: PostRequestBody = {
     ...values,
      userId: userId,
    }
    
    await createBlogPost(postValues, {
      onSuccess: () => {
          toast({
            status: "success",
            title: "Blog post created!",
            description: "Your post is now visible in the home page.",
            position: "top",
          });
      }
    });
  };

  if (isSuccess) return <Navigate to="/" />;

  return (
    <Formik
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      initialValues={initialValues}
      validateOnChange={false}
      validateOnBlur={false}
      validateOnMount={false}
    >
      <Form>
        <Stack spacing="6">
          <BlogPostFields />
          <Button
            isLoading={isLoading}
            type="submit"
            colorScheme="purple"
            size="lg"
            fontSize="md"
          >
            Create post
          </Button>
        </Stack>
      </Form>
    </Formik>
  );
};

export default NewBlogPostForm;
