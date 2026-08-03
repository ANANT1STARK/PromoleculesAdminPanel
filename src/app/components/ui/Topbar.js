export default function Topbar() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <div className="text-sm text-slate-500">Admin Panel</div>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-semibold">
          S
        </div>
        <div className="text-sm">
          <div className="font-medium">Sonu Seth</div>
          <div className="text-slate-400 text-xs">superadmin@gmail.com</div>
        </div>
      </div>
    </header>
  );
}