import MainLayout from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ComprasPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Gestão de Compras</h1>
        <p className="text-muted-foreground">Controle e planejamento de compras</p>

        <Card>
          <CardHeader>
            <CardTitle>Pedidos de Compra</CardTitle>
            <CardDescription>Visualize e gerencie os pedidos de compra</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full flex items-center justify-center">
              <p className="text-muted-foreground">Módulo em desenvolvimento</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}

