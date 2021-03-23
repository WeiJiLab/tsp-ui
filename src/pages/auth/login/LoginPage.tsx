import React from "react";
import { AuthLayout } from "../../../components";
import { LoginForm } from "./LoginForm";

export const LoginPage: React.FC = () => {
  return (
      <AuthLayout>
        <LoginForm/>
      </AuthLayout>
  );
};
