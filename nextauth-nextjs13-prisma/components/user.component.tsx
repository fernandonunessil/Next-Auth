"use client";
import React from "react";
import { useSession } from "next-auth/react";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/navigation";

export const User = () => {
  const { data: session, status } = useSession();

  

  const [user, setUser] = React.useState(
    session ? jwtDecode(session?.accessToken) : null
  );

  console.log(session);

  React.useEffect(() => {
    if (session) {
      setUser(jwtDecode(session?.accessToken));
    }
  }, [session, user]);

  return (
    <>
      <h1>Client Session</h1>
      <div className="grid">
        <pre>{status}</pre>
        <pre>{JSON.stringify(session)}</pre>
        <pre>{JSON.stringify(user)}</pre>

        {/* <pre>{jwtDecode(session?.accessToken)}</pre> */}
      </div>
    </>
  );
};
