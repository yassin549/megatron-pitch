import { handlers } from "@/auth"

// NextAuth relies on Node APIs; ensure Node runtime.
export const runtime = "nodejs"
export const { GET, POST } = handlers
