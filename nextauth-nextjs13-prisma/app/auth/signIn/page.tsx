"use client";
import { signIn } from "next-auth/react";
import React from "react";

export default function Login() {
  const email = React.useRef("");
  const pass = React.useRef("");

  const onSubmit = async () => {
    await signIn("credentials", {
      email: email.current,
      password: pass.current,
      redirect: true,
      callbackUrl: "/"
    });
  };

  return (
    <div>
      <div>
        <input onChange={(e) => (email.current = e.target.value)} type="text" />
        <input
          onChange={(e) => (pass.current = e.target.value)}
          type="password"
        />
        <button onClick={() => onSubmit()}>Login</button>
      </div>
    </div>
  );
}
