import { Button } from "@/components/ui/button";
import { Boxes, Globe, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Analyzer() {
  return (
    <main className="relative grid md:grid-cols-2 min-h-screen mx-auto">
      <div className="flex flex-col justify-center px-6 md:px-24 py-10">
        <section className="my-auto">
          <div className="w-10 h-10 bg-[#FF4200] mb-4"></div>
          <h1 className="text-5xl font-bold">Bitmap.Community</h1>
          <span className="text-muted-foreground mb-6 text-lg max-w-prose">
            Built for bitmappers, by bitmappers
          </span>
          <div className="flex gap-10 mt-10">
            <Link href="/analyzer">
              <Button variant="link" className="text-base px-0  ">
                <Boxes className="h-5 w-5 mr-2" />
                Analyzer
              </Button>
            </Link>
            <Link href="/browser">
              <Button variant="link" className="text-base px-0">
                <Globe className="h-5 w-5 mr-2" />
                Browser
              </Button>
            </Link>
          </div>
        </section>
        <div>
          <Link
            href="https://github.com/bitmapers/bitmap.community"
            target="_blank"
          >
            <Github className="h-5 w-5 hover:text-orange-500 transition-colors" />
          </Link>
          <p className="text-lg mt-4">
            <span className="text-orange-500">Powered by</span> Bitcoin
          </p>
          <div className="flex gap-2 text-sm">
            <span>made by</span>
            <Link
              href="https://twitter.com/nft_wizop"
              className="flex hover:bg-orange-500 transition-colors"
            >
              @nft_wizop
            </Link>
            /
            <Link
              href="https://twitter.com/dartmole"
              className="flex hover:bg-orange-500 transition-colors"
            >
              @moledart
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden md:block relative w-full flex-1">
        <Image
          src="/wizopmin.webp"
          alt="Bitmap hero image"
          fill={true}
          className="object-cover object-center "
        />
      </div>
    </main>
  );
}
