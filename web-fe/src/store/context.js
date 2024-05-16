"use client";
import { useEffect, createContext, useState } from "react";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { usePathname } from "next/navigation";
import Spinner from "@/components/Spinner";

export const MainContext = createContext(null);

function Context({ children }) {
  const [user, setUser] = useState();
  const [isUserLoading, setIsUserLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setIsUserLoading(true);
    async function fetchData() {
      try {
        const response = await http().get(endpoints.profile);
        setUser(response);
      } catch (error) {
        console.log(error);
      } finally {
        setIsUserLoading(false);
      }
    }
    if (!["/login", "/signup"].includes(pathname)) {
      fetchData();
    } else {
      setIsUserLoading(false);
    }
  }, [pathname]);

  if (isUserLoading) return <Spinner />;

  return (
    <MainContext.Provider
      value={{
        user,
        setUser,
        isUserLoading,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export default Context;
