import Link from "next/link";
import { Button } from "@/components/ui/button";
import Toggle from "./mode-toggle";
import { EllipsisVertical, ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import UserButton from "./user-button";
import Search from "./search";

const Menu = () => {
  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        <Toggle />
        <Button asChild variant="ghost">
          <Link href="/cart">
            <ShoppingCart /> 购物车
          </Link>
        </Button>
        <UserButton />
      </nav>
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle">
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start">
            <div className="mt-10">
              <Search />
            </div>
            <SheetTitle>菜单</SheetTitle>
            <Toggle />
            <Button asChild variant="ghost">
              <Link href="/cart">
                <ShoppingCart /> 购物车
              </Link>
            </Button>
            <UserButton />
            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
