"use client";

import { useEffect, useState } from "react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RevenueChart from "@/components/dashboard/RevenueChart";
import CustomerChart from "@/components/dashboard/CustomerChart";
import StockReport from "@/components/dashboard/StockReport";
import TopProducts from "@/components/dashboard/TopProducts";

import {
  statsData,
  revenueData,
  customerSplitData,
  stockReportData,
  topProductsData,
  periodOptions,
} from "@/data/dashboardData";

export default function DashboardPage() {
  const [period, setPeriod] = useState("year");

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const token = sessionStorage.getItem("pm_admin_token");

        if (!token) {
          throw new Error("Authentication token not found");
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const data = await res.json();

        console.log(data);
      } catch (err) {
        console.error("Failed to fetch dashboard:", err);
      }
    }

    fetchDashboard();
  }, []);

  return (
    <div className="w-full space-y-5 sm:space-y-6">
      {/* Header */}
      <DashboardHeader
        periodOptions={periodOptions}
        period={period}
        onPeriodChange={setPeriod}
      />

      {/* KPI Stats */}
      <DashboardStats stats={statsData} />

      {/* Revenue + Customers */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <RevenueChart data={revenueData} />
        <CustomerChart data={customerSplitData} />
      </div>

      {/* Stock + Top Products */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <StockReport items={stockReportData} />
        <TopProducts products={topProductsData} />
      </div>
    </div>
  );
}