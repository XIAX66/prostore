import Footer from "@/components/footer";
import Header from "@/components/shared/header";

export const metadata = {
  title: "Home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="main flex-1 wrapper">{children}</div>
      <Footer />
    </div>
  );
}
