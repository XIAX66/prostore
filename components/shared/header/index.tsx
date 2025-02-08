import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import Menu from "./menu";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.svg"
            alt={`${APP_NAME} logo`}
            width={48}
            height={48}
            priority={true}
          />
          <span className="hidden font-bold text-2xl ml-3 lg:block">
            {APP_NAME}
          </span>
        </Link>
        <Menu />
      </div>
    </header>
  );
};

export default Header;
