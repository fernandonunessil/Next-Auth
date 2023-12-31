import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton
} from "@/components/buttons.component";
import { User } from "@/components/user.component";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="bg-zinc-800 text-white h-screen w-full">
      <div>
        <h1>Server Session</h1>
        <pre>{JSON.stringify(session)}</pre>

        <User />
      </div>
      <div className="w-full max-w-xs">
        <LoginButton />
        <RegisterButton />
        <LogoutButton />
        <ProfileButton />
      </div>
      <Link href={"/userInfo"}>
        <div className="p-2 bg-orange-400 text-white text-center">
          Ir para a pagina admin
        </div>
      </Link>
    </main>
  );
}
