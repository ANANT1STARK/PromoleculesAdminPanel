"use client";

import { memo } from "react";
import { Package, Users, ShoppingCart, IndianRupee, TrendingUp, TrendingDown } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ICONS = {
  package: Package,
  users: Users,
  cart: ShoppingCart,
  rupee: IndianRupee,
};

function StatCard({ label, formattedValue, deltaLabel, trend, icon, sparkline, isLoading }) {
  const Icon = ICONS[icon] ?? Package;
  const isUp = trend === "up";
  const sparkData = sparkline.map((value, index) => ({ index, value }));
  const sparkColor = isUp ? "hsl(142 71% 45%)" : "hsl(0 84% 60%)";

  if (isLoading) {
    return (
      <Card className="border-border/60">
        <CardContent className="space-y-3 pt-6">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group border-border/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-black/10">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary transition-colors duration-200 group-hover:bg-primary/25">
              <Icon className="h-5 w-5" strokeWidth={2} />
            </div>
            <div>
              <p className="text-2xl font-semibold leading-tight tracking-tight text-foreground">
                {formattedValue}
              </p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          </div>

          <span
            className={`flex shrink-0 items-center gap-0.5 rounded-full px-2 py-1 text-xs font-medium ${
              isUp
                ? "bg-emerald-500/15 text-emerald-500 dark:text-emerald-400"
                : "bg-red-500/15 text-red-500 dark:text-red-400"
            }`}
          >
            {isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {deltaLabel}
          </span>
        </div>

        <div className="mt-3 h-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparkData} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id={`spark-${label}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={sparkColor} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={sparkColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke={sparkColor}
                strokeWidth={1.75}
                fill={`url(#spark-${label})`}
                isAnimationActive
                animationDuration={800}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(StatCard);