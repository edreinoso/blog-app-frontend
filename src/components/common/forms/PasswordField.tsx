import {
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import FieldItem from "./FieldItem";

interface PasswordFieldProps extends InputProps {
  name: string;
  label?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  name,
  label,
  ...props
}) => {
  const [field, { error, touched }] = useField(name);
  const [visible, setVisible] = React.useState<boolean>(false);

  return (
    <FieldItem {...{ error, touched }}>
      {label && <FormLabel htmlFor={field.name}>{label}</FormLabel>}
      <InputGroup>
        <InputRightElement>
          <IconButton
            bg="transparent !important"
            variant="ghost"
            aria-label={visible ? "Mask password" : "Reveal password"}
            icon={visible ? <HiEyeOff /> : <HiEye />}
            onClick={() => setVisible(!visible)}
          />
        </InputRightElement>
        <Input
          {...field}
          {...props}
          id={field.name}
          isInvalid={!!error && touched}
          type="password"
        />
      </InputGroup>
    </FieldItem>
  );
};

export default PasswordField;
