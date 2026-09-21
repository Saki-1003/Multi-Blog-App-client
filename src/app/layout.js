import { AuthProvider } from "@/context/authContext";
import { BlogSiteProvider } from "@/context/blogSiteContext";
import "./globals.css";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata = {
  title: "Folio",
  description: "Multi blog app ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <BlogSiteProvider>
          <body className={nunito.className}>{children}</body>
        </BlogSiteProvider>
      </AuthProvider>
    </html>
  );
}
