import Settings from "@/components/home/Settings";
import { SessionType } from "@/lib/auth/core/session";
import { getCurrentUser } from "@/lib/auth/nextjs/currentUser";

export default async function Page() {
  const user = await getCurrentUser() as SessionType
  return <Settings user={user} />
}