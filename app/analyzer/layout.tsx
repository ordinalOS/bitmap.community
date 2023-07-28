import { Navbar } from "@/components/ui/navbar";

export default async function AnalyzerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col px-4 py-8 max-w-3xl mx-auto">
        <div className="flex gap-1 items-baseline">
          <div className="inline-flex bg-orange-500 w-4 h-4"></div>
          <div className="inline-flex bg-orange-400 w-4 h-4"></div>
          <div className="inline-flex bg-orange-300 w-4 h-4"></div>
        </div>
        <h1 className="text-4xl font-semibold mb-6 mr-2 ">Bitmap Analyzer</h1>
        {children}
      </main>
    </>
  );
}
