"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { getAvatarColor } from "@/lib/avatarColor";

export default function CustomerTable({ customers, onView, onEdit, onDelete }) {
  return (
    <Table className="table-fixed w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[8%]">ID</TableHead>
          <TableHead className="w-[10%]">Avatar</TableHead>
          <TableHead className="w-[22%]">Name</TableHead>
          <TableHead className="w-[15%]">Phone</TableHead>
          <TableHead className="w-[13%]">Created</TableHead>
          <TableHead className="w-[12%]">Status</TableHead>
   
          <TableHead className="w-[10%] text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {customers.length === 0 && (
          <TableRow>
            <TableCell colSpan={8} className="text-center text-slate-400 py-8">
              No customers yet.
            </TableCell>
          </TableRow>
        )}

        {customers.map((c) => (
          <TableRow key={c.id}>
            <TableCell className="text-sm font-medium">{c.id}</TableCell>

            <TableCell>
              <div
                className={`w-8 h-8 rounded text-white flex items-center justify-center font-semibold text-sm ${getAvatarColor(
                  c.name
                )}`}
              >
                {c.name.charAt(0).toUpperCase()}
              </div>
            </TableCell>

            <TableCell className="text-sm text-blue-600">{c.name}</TableCell>
            <TableCell className="text-sm">{c.phone || "—"}</TableCell>
            <TableCell className="text-sm">{c.createdAt.slice(0,10)}</TableCell>

            <TableCell>
              <Badge
                variant="outline"
                className={
                  c.status
                    ? "bg-green-100 text-green-700 border-green-200"
                    : "bg-red-100 text-red-700 border-red-200"
                }
              >
                {c.status ? "Activated" : "Deactivated"}
              </Badge>
            </TableCell>

      

            <TableCell className="text-right">
              <Button size="icon" variant="ghost" onClick={() => onView(c)}>
                <Eye size={16} />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => onEdit(c)}>
                <Pencil size={16} />
              </Button>
              {/* <Button size="icon" variant="ghost" onClick={() => onDelete(c.id)}>
                <Trash2 size={16} className="text-red-500" />
              </Button> */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}