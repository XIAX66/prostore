"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Image
        src="/images/logo.svg"
        alt={`${APP_NAME} logo`}
        width={48}
        height={48}
        priority={true}
      />
      <div className="p-6 w-1/3 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold">Not Found</h1>
        <p className="text-destructive">您访问的网页地址不存在</p>
        <Button
          variant="outline"
          className="mt-4 ml-2"
          onClick={() => (window.location.href = "/")}
        >
          返回首页
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
