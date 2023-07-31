import Link from "next/link";
import { Button } from "./button";
import { Book, Boxes, Globe, Home } from "lucide-react";

const links = [
  {
    name: "Home",
    href: "/",
    target_blank: false,
    icon: <Home className="h-5 w-5 md:mr-2" />,
  },
  {
    name: "Analyzer",
    href: "/analyzer",
    target_blank: false,
    icon: <Boxes className="h-5 w-5 md:mr-2" />,
  },
  {
    name: "Browser",
    href: "/browser",
    target_blank: false,
    icon: <Globe className="h-5 w-5 md:mr-2" />,
  },
  {
    name: "Gitbook",
    href: "https://docs.bitmap.community",
    target_blank: true,
    icon: <Book className="h-5 w-5 md:mr-2" />,
  },
];

export function Navbar() {
  return (
    <div className="flex gap-10 mt-10 mx-auto max-w-4xl justify-center px-4">
      {links.map(({ name, href, icon, target_blank }) => (
        <Link href={href} key={name} target={target_blank ? "_blank" : ""}>
          <Button
            variant="link"
            className="text-base px-0 flex flex-col md:flex-row"
          >
            {icon}
            {name}
          </Button>
        </Link>
      ))}
    </div>
  );
}
