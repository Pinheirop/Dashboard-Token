"use client";
import { check_monthly_commission, authorizeAPI } from "@/utils/ws_functions";
import React, { useState, useEffect } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis,Tooltip } from "recharts";

export function Overview() {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    authorizeAPI().then(() => {
      check_monthly_commission().then((all_commissions) => {
        setData(all_commissions);
        setIsLoading(false);
      });
    });
  }, []);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip contentStyle={{ color: 'black' }}/>
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );;
}
