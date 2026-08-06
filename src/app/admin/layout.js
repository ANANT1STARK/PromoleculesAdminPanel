// import Sidebar from "@/app/components/ui/Sidebar";
// import Topbar from "@/app/components/ui/Topbar";

// export default function AdminLayout({ children }) {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1 flex flex-col min-h-screen">
//         <Topbar />
//         <main className="flex-1 bg-[--background] text-[--foreground] p-6">{children}</main>      </div>
//     </div>
//   );
// }
// fixed sidebar problem for not sticking 

import Sidebar from "@/app/components/ui/Sidebar";
import Topbar from "@/app/components/ui/Topbar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar className="h-screen w-64 shrink-0 overflow-y-auto" />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto bg-background p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
