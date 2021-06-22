import { useContext } from "react";
import { Form, Formik } from "formik";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";

import { loginSchema } from "../src/utils/validators";
import LoginFields from "../src/components/LoginFields";
import { AppContext } from "../src/utils";

const Login = () => {
  const router = useRouter();
  const { showToastMessage } = useContext(AppContext);

  const { redirect } = router.query;

  const handleSubmit = async (values, { setSubmitting }) => {
    const response = await signIn("credentials", {
      redirect: false,
      ...values
    });

    setSubmitting(false);

    if (!response.error) {
      router.replace(`/${redirect || ""}`);
    } else {
      showToastMessage({ message: response.error, status: "error" });
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
