import { FormControl } from "@chakra-ui/react";
import React from "react";
import TextAreaField from "src/components/common/forms/TextAreaField";
import TextField from "src/components/common/forms/TextField";

interface BlogPostFieldsProps {}

const BlogPostFields: React.FC<BlogPostFieldsProps> = () => {
  return (
    <>
      <FormControl id="title">
        <TextField name="title" label="Title" />
      </FormControl>
      <FormControl id="content">
        <TextAreaField name="content" label="Content" rows={15} />
      </FormControl>
    </>
  );
};

export default BlogPostFields;
