import { useEffect, createContext, useState } from "react";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { toast } from "react-hot-toast";
import Spinner from "@/components/Spinner";

export const MainContext = createContext(null);

function Context({ children }) {
  const [user, setUser] = useState();
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsUserLoading(true);
      try {
        const data = await http().get(endpoints.profile);
        setUser(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsUserLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isUserLoading) return <Spinner />;

  return (
    <MainContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export default Context;
