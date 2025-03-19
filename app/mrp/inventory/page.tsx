import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import { InventoryTable } from "@/components/inventory-table"

export const metadata: Metadata = {
  title: "MRP - Inventory",
  description: "Inventory management in the MRP system",
}

export default function InventoryPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 p-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
          <p className="text-muted-foreground">View and manage your inventory levels</p>
        </div>
        <InventoryTable />
      </div>
    </DashboardLayout>
  )
}

