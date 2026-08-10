"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  ClipboardList,
  Store,
  FileText,
  CreditCard,
  Rss,
  Megaphone,
  Phone,
  SlidersHorizontal,
  HelpCircle,
  Mail,
  MapPin,
  Image as ImageIcon,
  Palette,
  Puzzle,
  Wrench,
  Settings,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";

const ecommerceSubItems = [
  { label: "Report", href: "/admin/ecommerce/report" },
  { label: "Orders", href: "/admin/ecommerce/orders" },// functional
  { label: "Incomplete Orders", href: "/admin/ecommerce/incomplete-orders" },
  { label: "Order Returns", href: "/admin/ecommerce/order-returns" },
  { label: "Shipments", href: "/admin/ecommerce/shipments" },
  { label: "Invoices", href: "/admin/ecommerce/invoices" },
  { label: "Products", href: "/admin/ecommerce/products" }, // functional 
  { label: "Product Prices", href: "/admin/ecommerce/product-prices" },
  { label: "Product Inventory", href: "/admin/ecommerce/product-inventory" },
  { label: "Product Categories", href: "/admin/ecommerce/product-categories" },
  { label: "Product Tags", href: "/admin/ecommerce/product-tags" },
  { label: "Product Attributes", href: "/admin/ecommerce/product-attributes" },
  { label: "Product Options", href: "/admin/ecommerce/product-options" },
  { label: "Product Collections", href: "/admin/ecommerce/product-collections" },
  { label: "Product Labels", href: "/admin/ecommerce/product-labels" },
  { label: "Brands", href: "/admin/ecommerce/brands" },
  { label: "Reviews", href: "/admin/ecommerce/reviews" },
  { label: "Flash Sales", href: "/admin/ecommerce/flash-sales" },
  { label: "Coupons", href: "/admin/ecommerce/coupons" },
  { label: "Customers", href: "/admin/ecommerce/customers" },
];

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Ecommerce", icon: ShoppingCart, children: ecommerceSubItems },
  { label: "Product Specification", href: "/admin/product-specification", icon: ClipboardList },
  { label: "Marketplace", href: "/admin/marketplace", icon: Store },
  { label: "Pages", href: "/admin/pages", icon: FileText },
  { label: "Payments", href: "/admin/payments", icon: CreditCard },
  { label: "Blog", href: "/admin/blog", icon: Rss },
  { label: "Ads", href: "/admin/ads", icon: Megaphone },
  { label: "Contact", href: "/admin/contact", icon: Phone },
  { label: "Simple Sliders", href: "/admin/sliders", icon: SlidersHorizontal },
  { label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
  { label: "Newsletters", href: "/admin/newsletters", icon: Mail },
  { label: "Locations", href: "/admin/locations", icon: MapPin },
  { label: "Media", href: "/admin/media", icon: ImageIcon },
  { label: "Appearance", href: "/admin/appearance", icon: Palette },
  { label: "Plugins", href: "/admin/plugins", icon: Puzzle },
  { label: "Tools", href: "/admin/tools", icon: Wrench },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "Platform Administration", href: "/admin/platform", icon: ShieldCheck },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState("Ecommerce"); // start expanded since it's our main working section

  return (
    <aside className="w-64 h-screen bg-slate-950 text-slate-300 flex flex-col overflow-y-auto">
      <div className="h-16 flex items-center px-5 text-white font-bold text-lg border-b border-slate-800">
        Promolecules
      </div>

      <nav className="flex-1 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          // Item with a submenu (e.g. Ecommerce)
          if (item.children) {
            const isOpen = openMenu === item.label;
            const isChildActive = item.children.some((c) => pathname.startsWith(c.href));

            return (
              <div key={item.label}>
                <button
                  onClick={() => setOpenMenu(isOpen ? null : item.label)}
                  className={`w-full flex items-center justify-between gap-3 px-5 py-2.5 text-sm transition-colors ${
                    isChildActive ? "bg-blue-600 text-white" : "hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon size={18} />
                    {item.label}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isOpen && (
                  <div className="bg-slate-900">
                    {item.children.map((sub) => {
                      const isActive = pathname.startsWith(sub.href);
                      return (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={`block pl-12 pr-5 py-2 text-sm transition-colors ${
                            isActive
                              ? "text-blue-400 font-medium"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          {sub.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          // Regular single-link item
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                isActive ? "bg-blue-600 text-white" : "hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}