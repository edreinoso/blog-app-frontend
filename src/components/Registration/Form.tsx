import { Button, FormControl, Stack, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { Navigate } from "react-router-dom";
import PasswordField from "src/components/common/forms/PasswordField";
import TextField from "src/components/common/forms/TextField";
import {
  useCreateUser,
} from "src/services/users";
import * as Yup from "yup";

interface RegistrationFormProps {}

type RegistrationFormValues = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  confirmPassword: string;
};

const RegistrationForm: React.FC<RegistrationFormProps> = () => {
  const { mutate: post, isLoading, isSuccess } = useCreateUser();
  
  const toast = useToast();
  
  const validationSchema = Yup.object({
    email: Yup.string().email().required("Please insert your email."),
    password: Yup.string().required("Please insert your password"),
    confirmPassword: Yup.string()
      .oneOf(["", Yup.ref("password")], "Passwords don't match!")
      .required("Please confirm your password"),
  });

  const initialValues: RegistrationFormValues = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: RegistrationFormValues) => {
    const { confirmPassword: _, ...otherValues } = values;
    await post(otherValues, {
      onSuccess: () => {
        toast({
          status: "success",
          title: "User has been created!",
          position: "top",
        });
      }
    });
  };

  if (isSuccess) return <Navigate to="/login" />;

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
            <FormControl id="first_name">
              <TextField
                name="first_name"
                type="first_name"
                autoComplete="firstname"
                label="First name"
                isRequired
              />
            </FormControl>
            <FormControl id="last_name">
              <TextField
                name="last_name"
                type="last_name"
                autoComplete="lastname"
                label="Last name"
                isRequired
              />
            </FormControl>
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
              <PasswordField
                name="password"
                type="password"
                autoComplete="password"
                label="Password"
                isRequired
              />
            </FormControl>
            <FormControl id="confirmPassword">
              <PasswordField
                name="confirmPassword"
                type="confirmPassword"
                autoComplete="confirmPassword"
                label="Confirm Password"
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
              Sign up
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
export default RegistrationForm;
