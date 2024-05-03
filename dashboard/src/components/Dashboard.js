"use client";
import StatCard from "@/components/cards/stat-card";
import Chart from "@/components/Chart";
import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";
import { useQuery } from "@tanstack/react-query";

async function fetchRecords() {
  const { data } = await http().get(endpoints.dashboard.getAll);
  return data;
}

export default function Dashboard() {
  const { data } = useQuery({ queryFn: fetchRecords, queryKey: ["records"] });
  // console.log({ data });
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, ind) => (
          <StatCard key={ind} />
        ))}
      </div>
      <div>
        <Chart />
      </div>
    </div>
  );
}
