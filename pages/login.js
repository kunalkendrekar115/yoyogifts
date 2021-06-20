import { Form, Formik } from "formik";
import { signIn } from "next-auth/client";

import { loginSchema } from "../utils/validators";
import LoginFields from "../src/components/LoginFields";

const Login = () => {
  const handleSubmit = async (values, { setSubmitting }) => {
    const body = {
      ...values
    };

    const response = await signIn("credentials", { redirect: false, ...body });

    console.log(response);

    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ emailId: "", password: "" }}
      onSubmit={handleSubmit}
      validationSchema={loginSchema}
    >
      {({ isSubmitting }) => (
        <Form>
          <LoginFields isSubmitting={isSubmitting} />
        </Form>
      )}
    </Formik>
  );
};

export default Login;
