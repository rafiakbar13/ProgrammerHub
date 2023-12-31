import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type Props = {};

const NotFoundPage = (props: Props) => {
  return (
    <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
      <h1 className="text-4xl">404</h1>
      <p>We couldnt find the user you were looking for</p>
      <Button variant={"secondary"} asChild>
        <Link href={"/"}>Go Back Home</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
