import Link from "next/link";
import { Button } from "./button";
import { Boxes, Globe } from "lucide-react";

export function Navbar() {
  return (
    <div className="flex gap-10 mt-10 mx-auto max-w-4xl justify-center">
      <Link href="/analyzer">
        <Button variant="link" className="text-base px-0  ">
          <Boxes className="h-5 w-5 mr-2" />
          Block analyzer
        </Button>
      </Link>
      <Link href="/browser">
        <Button variant="link" className="text-base px-0">
          <Globe className="h-5 w-5 mr-2" />
          Bitmap Browser
        </Button>
      </Link>
    </div>
  );
}