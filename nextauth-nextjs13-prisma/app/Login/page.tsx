"use client";
import React from "react";
import { signIn } from "next-auth/react";

export default function Login() {
  const email = React.useRef("");
  const pass = React.useRef("");
  const onSubmit = async () => {
    await signIn("credentials", {
      cnpj: email.current,
      password: pass.current,
      redirect: true,
      callbackUrl: "/"
    });
  };
  return (
    <div className="w-full h-screen grid justify-center items-center bg-zinc-800">
      <div className="w-full max-w-xs ">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              onChange={(e) => (email.current = e.target.value)}
              placeholder="Username"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="text"
              onChange={(e) => (pass.current = e.target.value)}
              placeholder="******************"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => onSubmit()}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
