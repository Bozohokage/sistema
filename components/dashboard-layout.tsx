"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Box,
  ClipboardList,
  CreditCard,
  Factory,
  Layers,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/",
      color: "text-sky-500",
    },
    {
      label: "MRP",
      icon: Factory,
      color: "text-violet-500",
      subItems: [
        {
          label: "Inventory",
          icon: Box,
          href: "/mrp/inventory",
        },
        {
          label: "Production",
          icon: ClipboardList,
          href: "/mrp/production",
        },
        {
          label: "Materials",
          icon: Layers,
          href: "/mrp/materials",
        },
      ],
    },
    {
      label: "ERP",
      icon: BarChart3,
      color: "text-pink-700",
      subItems: [
        {
          label: "Finance",
          icon: CreditCard,
          href: "/erp/finance",
        },
        {
          label: "HR",
          icon: Users,
          href: "/erp/hr",
        },
        {
          label: "Supply Chain",
          icon: Package,
          href: "/erp/supply-chain",
        },
      ],
    },
    {
      label: "CRM",
      icon: Users,
      color: "text-orange-500",
      subItems: [
        {
          label: "Customers",
          icon: Users,
          href: "/crm/customers",
        },
        {
          label: "Sales",
          icon: ShoppingCart,
          href: "/crm/sales",
        },
        {
          label: "Marketing",
          icon: BarChart3,
          href: "/crm/marketing",
        },
      ],
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ]

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      {/* Sidebar for desktop */}
      <aside className="hidden lg:flex h-screen w-64 flex-col fixed inset-y-0 z-50">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package className="h-6 w-6" />
            <span>Business Suite</span>
          </Link>
        </div>
        <nav className="grid items-start px-2 py-4 lg:px-4">
          {routes.map((route, index) => (
            <div key={index} className="mb-4">
              {route.subItems ? (
                <div>
                  <div className={cn("flex items-center gap-3 rounded-lg px-3 py-2 mb-1", route.color)}>
                    <route.icon className="h-5 w-5" />
                    <span className="font-medium">{route.label}</span>
                  </div>
                  <div className="ml-4 space-y-1">
                    {route.subItems.map((item, subIndex) => (
                      <Link
                        key={subIndex}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                          pathname === item.href ? "bg-muted font-medium text-primary" : "text-muted-foreground",
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  href={route.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                    pathname === route.href ? "bg-muted font-medium text-primary" : "text-muted-foreground",
                    route.color,
                  )}
                >
                  <route.icon className="h-5 w-5" />
                  <span className="font-medium">{route.label}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden fixed top-4 left-4 z-40">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-14 items-center border-b px-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package className="h-6 w-6" />
              <span>Business Suite</span>
            </Link>
          </div>
          <nav className="grid items-start px-2 py-4">
            {routes.map((route, index) => (
              <div key={index} className="mb-4">
                {route.subItems ? (
                  <div>
                    <div className={cn("flex items-center gap-3 rounded-lg px-3 py-2 mb-1", route.color)}>
                      <route.icon className="h-5 w-5" />
                      <span className="font-medium">{route.label}</span>
                    </div>
                    <div className="ml-4 space-y-1">
                      {route.subItems.map((item, subIndex) => (
                        <Link
                          key={subIndex}
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                            pathname === item.href ? "bg-muted font-medium text-primary" : "text-muted-foreground",
                          )}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={route.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                      pathname === route.href ? "bg-muted font-medium text-primary" : "text-muted-foreground",
                      route.color,
                    )}
                  >
                    <route.icon className="h-5 w-5" />
                    <span className="font-medium">{route.label}</span>
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <main className="flex-1 lg:pl-64">{children}</main>
    </div>
  )
}

function Menu(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}

