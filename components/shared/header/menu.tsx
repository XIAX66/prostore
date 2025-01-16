import Link from "next/link";
import { Button } from "@/components/ui/button";
import Toggle from "./mode-toggle";
import { EllipsisVertical, ShoppingCart, UserIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
        <Button asChild>
          <Link href="/sign-in">
            <UserIcon /> 登录
          </Link>
        </Button>
      </nav>
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle">
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start">
            <SheetTitle>菜单</SheetTitle>
            <Toggle />
            <Button asChild variant="ghost">
              <Link href="/cart">
                <ShoppingCart /> 购物车
              </Link>
            </Button>
            <Button asChild>
              <Link href="/sign-in">
                <UserIcon /> 登录
              </Link>
            </Button>
            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
