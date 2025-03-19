"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Factory, LayoutDashboard, Package, Settings, Users, Moon, Sun, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/",
      active: pathname === "/",
    },
    {
      label: "MRP",
      icon: Factory,
      items: [
        {
          label: "Pedidos",
          href: "/mrp/pedidos",
          active: pathname === "/mrp/pedidos",
        },
        {
          label: "Produção",
          href: "/mrp/producao",
          active: pathname === "/mrp/producao",
        },
        {
          label: "Estoque",
          href: "/mrp/estoque",
          active: pathname === "/mrp/estoque",
        },
        {
          label: "Materiais",
          href: "/mrp/materiais",
          active: pathname === "/mrp/materiais",
        },
      ],
    },
    {
      label: "ERP",
      icon: BarChart3,
      items: [
        {
          label: "Finanças",
          href: "/erp/financas",
          active: pathname === "/erp/financas",
        },
        {
          label: "Recursos Humanos",
          href: "/erp/rh",
          active: pathname === "/erp/rh",
        },
        {
          label: "Compras",
          href: "/erp/compras",
          active: pathname === "/erp/compras",
        },
      ],
    },
    {
      label: "CRM",
      icon: Users,
      items: [
        {
          label: "Clientes",
          href: "/crm/clientes",
          active: pathname === "/crm/clientes",
        },
        {
          label: "Vendas",
          href: "/crm/vendas",
          active: pathname === "/crm/vendas",
        },
        {
          label: "Marketing",
          href: "/crm/marketing",
          active: pathname === "/crm/marketing",
        },
      ],
    },
    {
      label: "Configurações",
      icon: Settings,
      href: "/configuracoes",
      active: pathname === "/configuracoes",
    },
  ]

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen bg-background">
        <Sidebar className="border-r">
          <SidebarHeader className="flex h-14 items-center border-b px-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package className="h-6 w-6 text-primary" />
              <span>Business Suite</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            {routes.map((route, i) => (
              <SidebarMenuItem key={i}>
                {route.items ? (
                  <SidebarGroup>
                    <SidebarGroupLabel className="flex items-center gap-2">
                      <route.icon className="h-5 w-5 text-primary" />
                      <span>{route.label}</span>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {route.items.map((item, j) => (
                          <SidebarMenuItem key={j}>
                            <Link href={item.href} passHref legacyBehavior>
                              <SidebarMenuButton asChild isActive={item.active}>
                                <a className="flex items-center gap-2">
                                  <ChevronRight className="h-4 w-4" />
                                  <span>{item.label}</span>
                                </a>
                              </SidebarMenuButton>
                            </Link>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                ) : (
                  <Link href={route.href} passHref legacyBehavior>
                    <SidebarMenuButton asChild isActive={route.active}>
                      <a className="flex items-center gap-2">
                        <route.icon className="h-5 w-5" />
                        <span>{route.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </Link>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">v1.0.0</span>
              </div>
              {mounted && (
                <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  <span className="sr-only">Alternar tema</span>
                </Button>
              )}
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 overflow-auto">
          <div className="flex h-14 items-center border-b px-4">
            <SidebarTrigger />
            <div className="ml-4 font-medium">Sistema Integrado de Gestão</div>
          </div>
          <div className="p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}

