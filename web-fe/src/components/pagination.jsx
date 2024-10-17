"use client";

import React, { useCallback } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

export default function PaginationControl({ page, paginationCount }) {
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      if (params.get(name)) {
        params.set(name, value);
      } else {
        params.append(name, value);
      }

      return params.toString();
    },
    [searchParams],
  );

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`?${createQueryString("page", Math.max(page - 1, 1))}`}
          />
        </PaginationItem>
        {Array.from({ length: paginationCount }).map((_, ind) => (
          <PaginationItem key={ind}>
            <PaginationLink
              href={`?${createQueryString("page", ind + 1)}`}
              isActive={page == ind + 1}
              className={"hover:bg-primary hover:text-white"}
            >
              {ind + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>{/* <PaginationEllipsis /> */}</PaginationItem>
        <PaginationItem>
          <PaginationNext
            href={`?${createQueryString("page", Math.min(page + 1, paginationCount))}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
