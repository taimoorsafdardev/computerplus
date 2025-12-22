import { SessionType } from "@/lib/auth/core/session"
import { getCurrentUser } from "@/lib/auth/nextjs/currentUser"
import HeaderClient from "./header-client"

export default async function Header() {
  const user = await getCurrentUser() as SessionType
  return <HeaderClient user={user} />
}
