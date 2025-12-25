"use client";

import { Button } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-y-4 flex-auto">
      <Image
        src="/assets/images/not-found-img.svg"
        alt="not-found"
        width={300}
        height={300}
        loading="eager"
      />
      <div className="text-light-black-primary text-sm flex flex-col items-center">
        <h2 className="text-2xl font-medium text-heading">
          Destination Not Found.
        </h2>
        <p className="font-normal text-sub-heading">
          It looks like this journey didn’t go as planned. Let’s set the right
          route.
        </p>
      </div>

      <Button
        className={"cursor-pointer h-[2.8rem] rounded-sm font-normal"}
        onClick={() => router.push("/")}
        size="lg"
      >
        Back to Home
      </Button>
    </div>
  );
}
