import MainLayout from "@/components/layout/main-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AberturaPedido } from "@/components/abertura-pedido"
import { TabelaPedidos } from "@/components/tabela-pedidos"
import { AnaliseArquivos } from "@/components/analise-arquivos"
import { Producao } from "@/components/producao"
import { Expedicao } from "@/components/expedicao"
import { PedidosEntregues } from "@/components/pedidos-entregues"

export default function PedidosPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-primary">Gestão de Pedidos</h1>

        <Tabs defaultValue="abertura" className="w-full">
          <TabsList className="grid grid-cols-6 mb-8">
            <TabsTrigger value="abertura">Abertura</TabsTrigger>
            <TabsTrigger value="pedidos">Pedidos</TabsTrigger>
            <TabsTrigger value="analise">Análise</TabsTrigger>
            <TabsTrigger value="producao">Produção</TabsTrigger>
            <TabsTrigger value="expedicao">Expedição</TabsTrigger>
            <TabsTrigger value="entregues">Entregues</TabsTrigger>
          </TabsList>

          <TabsContent value="abertura">
            <AberturaPedido />
          </TabsContent>

          <TabsContent value="pedidos">
            <TabelaPedidos />
          </TabsContent>

          <TabsContent value="analise">
            <AnaliseArquivos />
          </TabsContent>

          <TabsContent value="producao">
            <Producao />
          </TabsContent>

          <TabsContent value="expedicao">
            <Expedicao />
          </TabsContent>

          <TabsContent value="entregues">
            <PedidosEntregues />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}

