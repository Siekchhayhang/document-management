import React from "react";
import { signIn } from "@/auth";

const SignInPage = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button className="btn btn-primary" type="submit">
        Sign in with Google
      </button>
    </form>
  );
};

export default SignInPage;
