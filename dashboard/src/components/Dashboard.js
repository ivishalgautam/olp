"use client";
import StatCard from "@/components/cards/stat-card";
import Chart from "@/components/Chart";
import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./Spinner";
import Link from "next/link";

async function fetchRecords() {
  const { data } = await http().get(endpoints.dashboard.getAll);
  return data;
}

export default function Dashboard() {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: fetchRecords,
    queryKey: ["dashboard"],
  });

  if (isLoading) return <Spinner />;
  if (isError) return error?.message ?? "error";
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-4">
        {data &&
          Object.keys(data?.products)?.map((status, ind) => (
            <Link key={ind} href={"/products"}>
              <StatCard
                status={`${status} products`}
                count={data?.products[status]}
              />
            </Link>
          ))}
        {data && (
          <>
            <Link href={"/enquiries"}>
              <StatCard
                status={"total enquiries"}
                count={data.total_enquiries}
              />
            </Link>
            <Link href={"/orders"}>
              <StatCard status={"total orders"} count={data.total_orders} />
            </Link>
          </>
        )}
      </div>
      <div>
        <Chart />
      </div>
    </div>
  );
}
