import * as Popover from "@radix-ui/react-popover";

import { IoMdArrowDropdown } from "react-icons/io";
import { useUser } from "../../hooks/useUser";
import { FiLogOut } from "react-icons/fi";

export default function Header() {
  const { logout } = useUser();

  return (
    <nav className="flex items-center justify-between w-full fixed top-0 left-0 z-10 bg-white px-[4.444vw] h-[80px]">
      <span className="text-xl text-primary-blue font-bold">Product ACME</span>
      <Popover.Root>
        <Popover.Trigger asChild>
          <button className="flex items-center gap-1 hover:opacity-90">
            <div className="flex items-center justify-center rounded-full w-10 h-10 bg-primary-blue text-white text-lg font-bold">
              AD
            </div>
            <IoMdArrowDropdown />
          </button>
        </Popover.Trigger>
        <Popover.Content
          sideOffset={3}
          align="end"
          className="bg-white p-4 shadow-lg rounded-md border border-grey-400 border-opacity-30 z-20"
        >
          <button
            className="flex items-center gap-2 hover:opacity-70 cursor-pointer"
            onClick={logout}
          >
            <FiLogOut size={20} />
            <span>Sair</span>
          </button>
        </Popover.Content>
      </Popover.Root>
    </nav>
  );
}
