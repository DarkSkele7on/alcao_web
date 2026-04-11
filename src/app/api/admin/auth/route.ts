import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "alcao2024";
const SESSION_SECRET = process.env.SESSION_SECRET || "alcao-admin-secret-key";

function generateToken(password: string): string {
  // Simple token: base64 of password + secret
  const raw = `${password}:${SESSION_SECRET}:admin-session`;
  return btoa(raw);
}

function validateToken(token: string): boolean {
  const expected = generateToken(ADMIN_PASSWORD);
  return token === expected;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (password !== ADMIN_PASSWORD) {
      return Response.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    const token = generateToken(password);

    const cookieStore = await cookies();
    cookieStore.set("admin_session", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
    });

    return Response.json({ success: true });
  } catch {
    return Response.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (!session || !validateToken(session.value)) {
      return Response.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    return Response.json({ authenticated: true });
  } catch {
    return Response.json(
      { authenticated: false },
      { status: 401 }
    );
  }
}
