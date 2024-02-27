import { Button, Flex, FormControl, FormLabel, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { Navigate } from "react-router-dom";
import PasswordField from "src/components/common/forms/PasswordField";
import TextField from "src/components/common/forms/TextField";
import {
  useLoginUser,
  PostLoginRequestBody
} from "src/services/users";
import { login } from "src/store/actions/auth";
import useStateDispatch from "src/utils/useStateDispatch";
import * as Yup from "yup";

interface LoginFormProps {}

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginForm: React.FC<LoginFormProps> = () => {
  const dispatch = useStateDispatch();

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
      onSuccess: (data) => {
        dispatch(login({ user: data.data}))
      },
      onError: (error) => {
        console.log('Oh oh, theres been an error', error)
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
