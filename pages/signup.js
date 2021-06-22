import { useContext } from "react";
import { Formik, Form } from "formik";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";

import { signupSchema } from "../src/utils/validators";
import SignUpFields from "../src/components/SignupFields";
import { AppContext } from "../src/utils";

const SignUp = () => {
  const router = useRouter();
  const { showToastMessage } = useContext(AppContext);
  const { redirect } = router.query;

  const handleSubmit = async (values, { setSubmitting }) => {
    const body = {
      ...values
    };

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      if (response.status === 200) {
        const loginResponse = await signIn("credentials", {
          redirect: false,
          ...values
        });

        if (loginResponse.status === 200) router.replace(`/${redirect || ""}`);
      } else {
        const { error } = await response.json();
        showToastMessage({ message: error, status: "error" });
      }
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
