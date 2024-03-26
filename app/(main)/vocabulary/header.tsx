"use client";
import { Input } from "@/components/ui/input";
import React, { useCallback, useRef, useState, useTransition } from "react";
import { SearchCheckIcon, XCircleIcon } from "lucide-react";
import { useKey } from "react-use";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Header = () => {
  const [pending, startTransition] = useTransition();
  const [query, setQuery] = useState<string>("");
  const ref = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const createSearchQuery = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );
  const onSearch = async () => {
    if (
      !ref.current ||
      ref.current.value === "" ||
      ref.current.value === "undefined" ||
      ref.current.value === undefined
    )
      return;
    startTransition(() => {
      router.push(
        pathname +
          "?" +
          createSearchQuery("query", ref.current?.value as string)
      );
    });
  };

  useKey("Enter", onSearch);
  const onRemove = () => {
    if (ref.current && typeof ref.current.value === "string") {
      ref.current.value = "";
    }
    setQuery("");
  };

  return (
    <div className=" sticky top-4 mx-2">
      <Input
        className="pl-10"
        placeholder="search"
        ref={ref}
        onChange={(e) => setQuery(e.target.value)}
      />
      <SearchCheckIcon className="absolute top-2 left-2" />
      {query !== "" && (
        <XCircleIcon
          className="absolute top-2 right-2 text-slate-400"
          onClick={() => onRemove()}
        />
      )}
    </div>
  );
};

export default Header;
