import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { cloneElement, ReactElement } from "react";

interface ActiveLinkPros extends LinkProps {
  children: ReactElement;
  sholdMatchExactHref?: boolean;
}

export function ActiveLink({
  children,
  sholdMatchExactHref = false,
  ...rest
}: ActiveLinkPros) {
  const { asPath } = useRouter();
  let isActve = false;

  if (sholdMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
    isActve = true;
  }

  if (
    !sholdMatchExactHref &&
    (asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as)))
  ) {
    isActve = true;
  }

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isActve ? "pink.400" : "gray.50",
      })}
    </Link>
  );
}
