import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  FormHelperText
} from "@chakra-ui/form-control";
import { Select } from "@chakra-ui/react";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/input";
import { useField } from "formik";

const FormField = (props) => {
  const [field, meta] = useField(props);

  const { name, label, mode } = props;

  if (mode === "select")
    return (
      <FormControl isInvalid={meta.error && meta.touched}>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <Select {...field} {...props} borderColor="grey" placeholder={label}>
          {props.items.map((item) => (
            <option value={item}>{props.leftAddon + " " + item}</option>
          ))}
        </Select>
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      </FormControl>
    );

  return (
    <FormControl isInvalid={meta.error && meta.touched}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <InputGroup>
        {props.leftAddon && (
          <InputLeftAddon
            borderColor="grey"
            pointerEvents="none"
            children={props.leftAddon}
          />
        )}
        <Input {...field} {...props} borderColor="grey" />
      </InputGroup>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
      <FormHelperText>{props.helperText}</FormHelperText>
    </FormControl>
  );
};

export default FormField;
