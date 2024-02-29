import { Button, Flex, FormControl, FormLabel, Stack, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { Navigate } from "react-router-dom";
import PasswordField from "src/components/common/forms/PasswordField";
import TextField from "src/components/common/forms/TextField";
import { ErrorResponse } from "@types";
import {
  useLoginUser,
  PostLoginRequestBody
} from "src/services/users";
import { login } from "src/store/actions/auth";
import useStateDispatch from "src/utils/useStateDispatch";
import * as Yup from "yup";
import axios, { AxiosError } from 'axios';

interface LoginFormProps {}

type LoginFormValues = {
  email: string;
  password: string;
};

function isAxiosError(error: unknown): error is AxiosError<ErrorResponse> {
  return axios.isAxiosError(error);
}

const LoginForm: React.FC<LoginFormProps> = () => {
  const dispatch = useStateDispatch();

  const toast = useToast();

  const { mutate: postLogin, isLoading, isSuccess } = useLoginUser();
  // const { mutate: postLogin, isLoading, isSuccess } = useLoginUser();

  const validationSchema = Yup.object({
    email: Yup.string().email().required("Please insert your email."),
    password: Yup.string().required("Please insert your password"),
  });

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: PostLoginRequestBody) => {
    await postLogin(values, {
      onSuccess: (userData) => {
        dispatch(login({ user: userData.data.data}))
      },
      onError: (error: unknown) => {
        if (isAxiosError(error)) {
          const errorMessage = error.response?.data?.errors || "Please try again.";
          toast({
            status: "error",
            title: "There has been an error!",
            description: error.response?.data?.errors || "Please try again.",
            position: "top",
          });
        } else {
          // Handle non-Axios errors or provide a generic error message
          console.error("An unexpected error occurred", error);
          toast({
            status: "error",
            title: "Unexpected error",
            description: "An unexpected error occurred. Please try again.",
            position: "top",
          });
        }
      }
    })
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
      {({}) => (
        <Form>
          <Stack spacing="6">
            <FormControl id="email">
              <TextField
                name="email"
                type="email"
                autoComplete="email"
                label="Email address"
                isRequired
              />
            </FormControl>
            <FormControl id="password">
              <Flex justify="space-between">
                <FormLabel>Password</FormLabel>
                {/* 
                TODO: password reset flow for the deadline.
                <Box
                  as="a"
                  color={linkColor}
                  fontWeight="semibold"
                  fontSize="sm"
                >
                  Forgot Password?
                </Box>
                */}
              </Flex>
              <PasswordField
                name="password"
                type="password"
                autoComplete="password"
                isRequired
              />
            </FormControl>
            <Button
              isLoading={isLoading}
              type="submit"
              colorScheme="purple"
              size="lg"
              fontSize="md"
            >
              Sign in
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
