"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export const LoginButton = () => {
  return (
    <button
      style={{ marginRight: 10 }}
      onClick={() => signIn()}
      className="bg-yellow-500 rounded p-4 w-full"
    >
      Entrar
    </button>
  );
};

export const RegisterButton = () => {
  return (
    <Link style={{ marginRight: 10 }} href="/register">
      Registrar-se
    </Link>
  );
};

export const LogoutButton = () => {
  return (
    <button
      style={{ marginRight: 10 }}
      onClick={() => signOut()}
      className="bg-yellow-500 rounded p-4 w-full"
    >
      Sair
    </button>
  );
};

export const ProfileButton = () => {
  return <Link href="/profile">Profile</Link>;
};
