import { Formik, Form } from "formik";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";

import { signupSchema } from "../src/utils/validators";
import SignUpFields from "../src/components/SignupFields";

const SignUp = () => {
  const router = useRouter();
  const { redirect } = router.query;

  const handleSubmit = async (values, { setSubmitting }) => {
    const body = {
      ...values,
    };
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.status === 200) {
        await signIn("credentials", {
          redirect: `/${redirect || ""}`,
          ...values,
        });
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
