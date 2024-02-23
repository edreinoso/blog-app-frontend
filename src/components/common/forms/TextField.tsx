import { FormLabel, Input, InputProps } from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";
import FieldItem from "./FieldItem";

interface TextFieldProps extends InputProps {
  name: string;
  label?: string;
}

const TextField: React.FC<TextFieldProps> = ({ name, label, ...props }) => {
  const [field, { error, touched }] = useField(name);

  return (
    <FieldItem {...{ error, touched }}>
      {label && <FormLabel htmlFor={field.name}>{label}</FormLabel>}
      <Input
        {...field}
        {...props}
        id={field.name}
        isInvalid={!!error && touched}
      />
    </FieldItem>
  );
};

export default TextField;
