import { Formik, Form } from "formik";

import { signupSchema } from "../utils/validators";
import SignUpFields from "../src/components/SignupFields";

const SignUp = () => {
  const handleSubmit = async (values, { setSubmitting }) => {
    const body = {
      ...values
    };
    try {
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      const res = await response.json();

      console.log(res);
    } catch (error) {
      console.log(error);
    }

    setSubmitting(false);
  };
  return (
    <Formik
      initialValues={{ emailId: "", password: "", firstName: "", lastName: "" }}
      onSubmit={handleSubmit}
      validationSchema={signupSchema}
    >
      {({ isSubmitting }) => (
        <Form>
          <SignUpFields isSubmitting={isSubmitting} />
        </Form>
      )}
    </Formik>
  );
};

export default SignUp;
