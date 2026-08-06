"use client";

import { useState } from "react";
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

  return (
    <div className="space-y-6">
      <DashboardHeader periodOptions={periodOptions} period={period} onPeriodChange={setPeriod} />

      <DashboardStats stats={statsData} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <RevenueChart data={revenueData} />
        <CustomerChart data={customerSplitData} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <StockReport items={stockReportData} />
        <TopProducts products={topProductsData} />
      </div>
    </div>
  );
}