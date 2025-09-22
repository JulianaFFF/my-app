import Header from "@/components/Header";
import Footer from "@/components/Footer";

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