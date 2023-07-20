import Link from "next/link";
import { Button } from "./button";
import { Boxes, Globe, Home } from "lucide-react";

export function Navbar() {
  return (
    <div className="flex gap-10 mt-10 mx-auto max-w-4xl justify-center px-4">
      <Link href="/">
        <Button
          variant="link"
          className="text-base px-0 flex flex-col md:flex-row"
        >
          <Home className="h-5 w-5 md:mr-2" />
          Home
        </Button>
      </Link>
      <Link href="/analyzer">
        <Button
          variant="link"
          className="text-base px-0 flex flex-col md:flex-row"
        >
          <Boxes className="h-5 w-5 md:mr-2" />
          Block analyzer
        </Button>
      </Link>
      <Link href="/browser">
        <Button
          variant="link"
          className="text-base px-0 flex flex-col md:flex-row"
        >
          <Globe className="h-5 w-5 md:mr-2" />
          Bitmap Browser
        </Button>
      </Link>
    </div>
  );
}
