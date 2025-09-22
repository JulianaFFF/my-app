import Header from "@/shared/ui/Header";
import Footer from "@/shared/ui/Footer";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const routesHome = [
     { name: "Autores", path: "/autor" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header routes={routesHome} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}