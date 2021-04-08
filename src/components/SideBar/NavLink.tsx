import { Icon, Link, Text } from "@chakra-ui/react";
import { ElementType, ReactNode } from "react";

interface NavLinkProps {
  icon: ElementType;
  children: ReactNode;
}

export function NavLink({ icon, children }: NavLinkProps) {
  return (
    <Link display="flex" align="center">
      <Icon as={icon} fontSize="20" />
      <Text ml="4" fontWeight="medium">
        {children}
      </Text>
    </Link>
  );
}
