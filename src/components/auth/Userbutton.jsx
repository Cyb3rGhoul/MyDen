import { UserButton as ClerkUserButton } from "@clerk/clerk-react";

export const UserButton = () => (
  <ClerkUserButton
    appearance={{
      elements: {
        avatarBox: "w-10 h-10",
        userButtonPopoverCard: "bg-[#2E236C]",
        userButtonPopoverText: "text-[#C8ACD6]",
      },
    }}
  />
);