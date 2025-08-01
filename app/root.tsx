import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import styles from "~/styles/tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "stylesheet", href: styles },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <script
  dangerouslySetInnerHTML={{
    __html: `
      var uzeraq = [];
      function uzera(method, args) {
        (!!uzeraMethods && uzeraMethods[method])
          ? uzeraMethods[method](args)
          : uzeraq.push({ method: method, args: args });
      }
      (function (u, z, e, r, a) {
        if (u["a_id"]) { return; }
        u["a_id"] = a;
        u["dm"] = u.location.hostname;
        u[r] = u[r] || [];
        u[e] = {};
        var s = z.createElement("script");
        s.async = true;
        s.src = "https://assets.gainserv.in/wrapper.dev.js?v=" + Date.now();
        var t = z.getElementsByTagName("script")[0];
        t.parentNode.insertBefore(s, t);
      })(window, document, "uzeraMethods", "uzeraDL", "I84N7SQKE7");
    `,
  }}
/>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col min-h-screen text-slate-700 bg-slate-100">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
