"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = ({
  text,
  backRoute,
}: {
  text?: string;
  backRoute?: string;
}) => {
  const router = useRouter();
  return (
    <Button
      className="mb-8 px-4 flex gap-2 w-fit hover:bg-transparent text-md"
      variant={"ghost"}
      onClick={() => {
        if (backRoute) {
          router.push(backRoute);
        } else {
          router.back();
        }
      }}
    >
      <ArrowLeft className="min-w-6 min-h-6 stroke-black" /> {text ?? "Volver"}
    </Button>
  );
};

export default BackButton;
