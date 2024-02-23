import { Button, Flex, FormControl, FormLabel, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import PasswordField from "src/components/common/forms/PasswordField";
import TextField from "src/components/common/forms/TextField";
import UsersAPI, {
  PostLoginRequestBody,
  PostLoginResponseBody,
} from "src/services/users";
import { login } from "src/store/actions/auth";
import useApi from "src/utils/useApi";
import useStateDispatch from "src/utils/useStateDispatch";
import * as Yup from "yup";

interface LoginFormProps {}

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginForm: React.FC<LoginFormProps> = () => {
  const dispatch = useStateDispatch();

  const [{ isPending }, postLogin] = useApi<
    PostLoginRequestBody,
    PostLoginResponseBody
  >(UsersAPI.buildPostLogin());

  const validationSchema = Yup.object({
    email: Yup.string().email().required("Please insert your email."),
    password: Yup.string().required("Please insert your password"),
  });

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: LoginFormValues) => {
    const res = await postLogin(values);
    if (res.isOk) dispatch(login({ user: res.data.data }));
  };

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
                TODO: we probably won't have time to implement 
                a password reset flow for the deadline.
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
              isLoading={isPending}
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
