"use client";

import { onUnBlock } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface UnblockButtonProps {
  userId: string;
}

export const UnblockButton = ({ userId }: UnblockButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      onUnBlock(userId)
        .then((result) => {
          toast.success(`User ${result.blocked.username} unblocked`);
        })
        .catch((error) => {
          toast.error("Something went wrong");
        });
    });
  };

  return (
    <Button
      onClick={onClick}
      variant={"link"}
      disabled={isPending}
      size={"sm"}
      className="text-blue-500 w-full"
    >
      Unblock
    </Button>
  );
};
