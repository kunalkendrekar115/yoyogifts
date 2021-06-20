import * as Yup from "yup";

export const giftcardSchema = Yup.object().shape({
  denomination: Yup.string().required("Denomination is required"),
  recipientName: Yup.string().required("Required"),
  recipientEmail: Yup.string().email("Invalid email").required("Required")
});

export const loginSchema = Yup.object().shape({
  emailId: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("password is required")
});

export const signupSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is Required"),
  lastName: Yup.string().required("Last Name is required"),
  emailId: Yup.string().email("Invalid email").required("Email is Required"),
  password: Yup.string().required("password is required")
});
