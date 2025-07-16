import Footer from "@/components/Footer/Footer";
import MainNavbar from "@/components/Navbar/MainNavbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col gap-4">
      <MainNavbar />
      {children}
      <Footer />
    </div>
  );
}
