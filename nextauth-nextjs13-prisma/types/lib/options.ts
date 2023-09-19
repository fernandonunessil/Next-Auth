import { Session } from "inspector";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";

export interface SessionProps {
  session: Session;
  token: JWT;
  user: AdapterUser;
}
