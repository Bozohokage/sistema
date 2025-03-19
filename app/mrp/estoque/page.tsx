import MainLayout from "@/components/layout/main-layout"
import { InventoryTable } from "@/components/inventory-table"

export default function EstoquePage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Gestão de Estoque</h1>
        <p className="text-muted-foreground">Visualize e gerencie seus níveis de estoque</p>

        <InventoryTable />
      </div>
    </MainLayout>
  )
}

