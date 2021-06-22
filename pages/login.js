import { Form, Formik } from "formik";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";

import { loginSchema } from "../src/utils/validators";
import LoginFields from "../src/components/LoginFields";

const Login = () => {
  const router = useRouter();

  const { redirect } = router.query;

  const handleSubmit = async (values, { setSubmitting }) => {
    const response = await signIn("credentials", {
      redirect: false,
      ...values
    });

    setSubmitting(false);

    if (!response.error) {
      router.replace(`/${redirect || ""}`);
    }
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
