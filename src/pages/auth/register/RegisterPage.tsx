import React from "react";

import { RegisterForm } from "./RegisterForm";
import { AuthLayout } from "../../../components";

export const RegisterPage: React.FC = () => {
  return <AuthLayout>
    <RegisterForm/>
  </AuthLayout>;
};
