import Sidebar from "@/app/components/ui/Sidebar";
import Topbar from "@/app/components/ui/Topbar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Topbar />
        <main className="flex-1 bg-[--background] text-[--foreground] p-6">{children}</main>      </div>
    </div>
  );
}