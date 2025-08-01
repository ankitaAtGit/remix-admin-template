import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";

import MenuIcon from "~/components/icons/Menu";
import ProfilePopup from "~/components/ProfilePopup";
import Sidebar from "~/components/Sidebar";
import { getSession } from "~/session.server";
import { getSupabaseClient } from "~/utils/getSupabaseClient";

// --------------------
// Server-side loader
// --------------------
export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("__session");

  if (!token) {
    return redirect("/login");
  }

  // ✅ Pass token to client so Supabase can auth server-side request
const supabase = getSupabaseClient(token);
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return redirect("/login");
  }

  const { id, email, role, user_metadata } = user;

  return json({
    user: { id, email, role, metadata: user_metadata },
  });
}

// --------------------
// Client component
// --------------------
type LoaderData = {
  user: {
    id: string;
    email: string;
    role: string;
    metadata?: Record<string, any>;
  };
};

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useLoaderData<LoaderData>();

  console.log('user', user);

  useEffect(() => {
  if (typeof window !== "undefined" && typeof window.uzera === "function") {
    uzera("identify", {
      id: user.id,
      userData: {
        email: user.email,
        role: user.role,
        ...user.metadata,
      },
    });
  }
}, [user]);

  return (
    <>
      <nav className="flex items-center justify-between gap-6 p-4 md:justify-end">
        <button
          className="flex items-center justify-center w-8 h-8 transition rounded-md cursor-pointer md:hidden text-slate-900 hover:bg-slate-200/80"
          onClick={() => setIsSidebarOpen(true)}
        >
          <MenuIcon />
        </button>
        <ProfilePopup />
      </nav>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className="py-8 grow md:ml-70 md:py-16">
        <div className="px-4 mx-auto max-w-7xl">
          <Outlet />
        </div>
      </main>
    </>
  );
}
