import { AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const STATUS_CONFIG = {
  out: { label: "Out of stock", badge: "destructive", bar: "[&>div]:bg-red-500" },
  low: { label: "Low stock", badge: "outline", bar: "[&>div]:bg-amber-500" },
  high: { label: "In stock", badge: "secondary", bar: "[&>div]:bg-emerald-500" },
};

const initials = (name) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

export default function StockReport({ items }) {
  return (
    <Card className="border-border/60">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-semibold">Stock Report</CardTitle>
        <a href="/admin/ecommerce/products" className="text-xs font-medium text-primary hover:underline">
          View All
        </a>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="w-full">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-6">Item</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="pr-6">Stock</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => {
                const status = STATUS_CONFIG[item.status];
                return (
                  <TableRow key={item.id} className="group">
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 shrink-0 border border-border/60">
                          <AvatarFallback className="bg-primary/10 text-[11px] font-semibold text-primary">
                            {initials(item.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex items-center gap-1.5">
                          {item.status === "out" && (
                            <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-red-500" />
                          )}
                          <div>
                            <p className="text-sm font-medium leading-tight text-foreground">
                              {item.name}
                            </p>
                            <p className="text-xs text-muted-foreground">{item.sku}</p>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{item.price}</TableCell>
                    <TableCell className="pr-6">
                      <div className="flex min-w-[140px] items-center gap-2.5">
                        <Progress value={item.stock} className={`h-1.5 flex-1 ${status.bar}`} />
                        <Badge variant={status.badge} className="whitespace-nowrap text-[10px]">
                          {status.label}
                        </Badge>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}