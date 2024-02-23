import { FormLabel, Textarea, TextareaProps } from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";
import FieldItem from "./FieldItem";

interface TextAreaFieldProps extends TextareaProps {
  name: string;
  label?: string;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  name,
  label,
  ...props
}) => {
  const [field, { error, touched }] = useField(name);

  return (
    <FieldItem {...{ error, touched }}>
      {label && <FormLabel htmlFor={field.name}>{label}</FormLabel>}
      <Textarea
        {...field}
        {...props}
        id={field.name}
        isInvalid={!!error && touched}
      />
    </FieldItem>
  );
};

export default TextAreaField;
