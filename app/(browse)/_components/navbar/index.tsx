import { Search } from "./search";
import Actions from "./actions";
import { Logo } from "./logo";
import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="fixed top-0 w-full h-20 z-[49] bg-[#252731] px-2 lg:px-4 flex justify-between items-center shadow-sm">
      <Logo />
      <Search />
      <Actions />
    </nav>
  );
};

export default Navbar;
