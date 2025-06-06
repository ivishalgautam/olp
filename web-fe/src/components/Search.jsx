import { useContext, useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Input } from "./ui/input";
import { searchProducts } from "@/hooks/useSearchProducts";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { usePathname, useSearchParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { MainContext } from "@/store/context";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { H6 } from "./ui/typography";
import { cn } from "@/lib/utils";

const addToCart = (data) => {
  return http().post(`${endpoints.cart.getAll}/temp-cart`, data);
};

export default function Search() {
  const params = useSearchParams();
  const query = params.get("q") ?? "";
  const [searchResults, setSearchResults] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const throttleTimeoutRef = useRef(null);
  const containerRef = useRef(null);
  const pathname = usePathname();
  const { user } = useContext(MainContext);
  const queryClient = useQueryClient();

  const createMutation = useMutation(addToCart, {
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries("cart-items");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleAddTocart = async (id) => {
    if (!user) return toast.warning("Please login first");
    if (!user.is_verified) return toast.warning("You are not verified!");
    createMutation.mutate({ product_id: id });
  };

  const handleSearch = async (value) => {
    if (!value.trim()) return setSearchResults([]);
    const searchQuery = value.replace(/\s+/g, "-");
    const results = await searchProducts(searchQuery);
    setSearchResults(results);
  };

  useEffect(() => {
    const throttledInputChange = (value) => {
      if (throttleTimeoutRef.current !== null) {
        clearTimeout(throttleTimeoutRef.current);
      }
      throttleTimeoutRef.current = setTimeout(() => {
        throttleTimeoutRef.current = null;
        handleSearch(value);
      }, 300);
    };

    throttledInputChange(inputVal);

    return () => {
      if (throttleTimeoutRef.current !== null) {
        clearTimeout(throttleTimeoutRef.current);
      }
    };
  }, [inputVal]);

  useEffect(() => {
    return () => {
      if (throttleTimeoutRef.current !== null) {
        clearTimeout(throttleTimeoutRef.current);
      }
      setSearchResults([]);
      setInputVal("");
    };
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsResultsVisible(false);
      } else {
        setIsResultsVisible(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  useEffect(() => {
    if (query) {
      setInputVal(query);
    }
  }, [query]);

  return (
    <div className="relative h-full w-full">
      <div className="relative flex h-8 max-w-xs items-center justify-start rounded-full bg-white/60">
        <Link
          href={`/products/search?q=${inputVal}`}
          className="rounded-full p-2 transition-colors hover:bg-white"
        >
          <FiSearch size={15} />
        </Link>

        <Input
          placeholder="Search for items"
          className={cn(
            "h-full w-full rounded-full border-none bg-transparent outline-none focus-within:border-none focus-within:outline-none focus:border-none focus:outline-none",
            {
              "relative z-50": inputVal,
            },
          )}
          onChange={(e) => setInputVal(e.target.value)}
          value={inputVal}
        />
      </div>
      {inputVal && searchResults.length > 0 && (
        <div className="relative z-50" ref={containerRef}>
          {inputVal && isResultsVisible && searchResults.length > 0 ? (
            <ul className="absolute left-1/2 max-h-80 w-full -translate-x-1/2 divide-y divide-gray-200 overflow-y-scroll rounded-md bg-white">
              {searchResults.map((result) => (
                <li
                  key={result.id}
                  className="flex items-center justify-between gap-2 p-3"
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${result.pictures[0]}`}
                    width={50}
                    height={50}
                    alt={result.title}
                    className="rounded-lg"
                  />
                  <H6 className="mr-auto text-sm capitalize">
                    <Link
                      href={`/products/${result.slug}`}
                      className="hover:text-primary"
                    >
                      {result.title}
                    </Link>
                  </H6>
                  <Button
                    href={`/products/${result.slug}`}
                    variant={"primary"}
                    onClick={() => handleAddTocart(result.id)}
                  >
                    Add to cart
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
}
