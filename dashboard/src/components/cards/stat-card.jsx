import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card.jsx";
import { IoIosStats } from "react-icons/io";

export default function StatCard({ status, count }) {
  const numberFormat = new Intl.NumberFormat("en-IN");
  return (
    <Card className="hover:border-primary transition-colors group">
      <CardHeader>
        <div className="flex items-center justify-between">
          <span className="text-sm capitalize">{status}</span>
          <span>
            <IoIosStats />
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="group-hover:text-primary transition-colors">
          {numberFormat.format(count)}
        </CardTitle>
        {/* <CardDescription>+20.1% from last month</CardDescription> */}
      </CardContent>
    </Card>
  );
}
