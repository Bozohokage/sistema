import MainLayout from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MoreHorizontal, Filter, Download, ShoppingCart } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Dados de exemplo
const oportunidades = [
  {
    id: 1,
    cliente: "Empresa ABC Ltda",
    produto: "Sistema ERP Completo",
    valor: 45000.0,
    probabilidade: 80,
    fase: "Proposta",
    responsavel: "João Silva",
    dataCriacao: "10/05/2023",
    dataFechamento: "30/06/2023",
  },
  {
    id: 2,
    cliente: "Comércio XYZ",
    produto: "Módulo Financeiro",
    valor: 15000.0,
    probabilidade: 60,
    fase: "Negociação",
    responsavel: "Maria Oliveira",
    dataCriacao: "05/05/2023",
    dataFechamento: "15/06/2023",
  },
  {
    id: 3,
    cliente: "Indústria 123",
    produto: "Módulo de Produção",
    valor: 25000.0,
    probabilidade: 40,
    fase: "Qualificação",
    responsavel: "Carlos Santos",
    dataCriacao: "01/05/2023",
    dataFechamento: "20/06/2023",
  },
  {
    id: 4,
    cliente: "Loja Central",
    produto: "Sistema de Vendas",
    valor: 18000.0,
    probabilidade: 90,
    fase: "Fechamento",
    responsavel: "Ana Pereira",
    dataCriacao: "15/04/2023",
    dataFechamento: "05/06/2023",
  },
  {
    id: 5,
    cliente: "Distribuidora Norte",
    produto: "Módulo Logística",
    valor: 22000.0,
    probabilidade: 70,
    fase: "Proposta",
    responsavel: "Roberto Almeida",
    dataCriacao: "20/04/2023",
    dataFechamento: "10/06/2023",
  },
]

// Dados de vendas fechadas
const vendasFechadas = [
  {
    id: 1,
    cliente: "Tech Solutions",
    produto: "Sistema ERP Completo",
    valor: 42000.0,
    responsavel: "João Silva",
    dataFechamento: "28/04/2023",
    status: "Pago",
  },
  {
    id: 2,
    cliente: "Supermercado Bom Preço",
    produto: "Módulo de Estoque",
    valor: 12000.0,
    responsavel: "Maria Oliveira",
    dataFechamento: "15/04/2023",
    status: "Pendente",
  },
  {
    id: 3,
    cliente: "Farmácia Saúde",
    produto: "Sistema de Vendas",
    valor: 15000.0,
    responsavel: "Carlos Santos",
    dataFechamento: "10/04/2023",
    status: "Pago",
  },
]

export default function VendasPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Gestão de Vendas</h1>
            <p className="text-muted-foreground">Acompanhe e gerencie suas oportunidades e vendas</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Exportar
            </Button>
            <Button>
              <ShoppingCart className="mr-2 h-4 w-4" /> Nova Oportunidade
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pipeline Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 125.000,00</div>
              <p className="text-xs text-muted-foreground">5 oportunidades ativas</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vendas do Mês</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 69.000,00</div>
              <p className="text-xs text-muted-foreground">+15% em relação ao mês anterior</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <p className="text-xs text-muted-foreground">+5% em relação ao mês anterior</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 23.000,00</div>
              <p className="text-xs text-muted-foreground">-2% em relação ao mês anterior</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar oportunidades..." className="pl-8" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="oportunidades" className="space-y-4">
          <TabsList>
            <TabsTrigger value="oportunidades">Oportunidades</TabsTrigger>
            <TabsTrigger value="vendas">Vendas Fechadas</TabsTrigger>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          </TabsList>

          <TabsContent value="oportunidades">
            <Card>
              <CardHeader>
                <CardTitle>Oportunidades de Venda</CardTitle>
                <CardDescription>Visualize e gerencie suas oportunidades ativas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Produto</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Fase</TableHead>
                        <TableHead>Probabilidade</TableHead>
                        <TableHead>Responsável</TableHead>
                        <TableHead>Data Fechamento</TableHead>
                        <TableHead className="w-[80px]">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {oportunidades.map((oportunidade) => (
                        <TableRow key={oportunidade.id}>
                          <TableCell className="font-medium">{oportunidade.cliente}</TableCell>
                          <TableCell>{oportunidade.produto}</TableCell>
                          <TableCell>
                            R$ {oportunidade.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`${
                                oportunidade.fase === "Fechamento"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                  : oportunidade.fase === "Negociação"
                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                    : oportunidade.fase === "Proposta"
                                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                      : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                              }`}
                            >
                              {oportunidade.fase}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={oportunidade.probabilidade} className="h-2 w-16" />
                              <span>{oportunidade.probabilidade}%</span>
                            </div>
                          </TableCell>
                          <TableCell>{oportunidade.responsavel}</TableCell>
                          <TableCell>{oportunidade.dataFechamento}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Mostrando {oportunidades.length} de {oportunidades.length} oportunidades
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Anterior
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Próximo
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="vendas">
            <Card>
              <CardHeader>
                <CardTitle>Vendas Fechadas</CardTitle>
                <CardDescription>Histórico de vendas concluídas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Produto</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Responsável</TableHead>
                        <TableHead>Data Fechamento</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[80px]">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vendasFechadas.map((venda) => (
                        <TableRow key={venda.id}>
                          <TableCell className="font-medium">{venda.cliente}</TableCell>
                          <TableCell>{venda.produto}</TableCell>
                          <TableCell>R$ {venda.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</TableCell>
                          <TableCell>{venda.responsavel}</TableCell>
                          <TableCell>{venda.dataFechamento}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`${
                                venda.status === "Pago"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                              }`}
                            >
                              {venda.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Mostrando {vendasFechadas.length} de {vendasFechadas.length} vendas
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Anterior
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Próximo
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="pipeline">
            <Card>
              <CardHeader>
                <CardTitle>Pipeline de Vendas</CardTitle>
                <CardDescription>Visualização do funil de vendas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Qualificação</h3>
                      <span className="text-sm text-muted-foreground">R$ 25.000,00</span>
                    </div>
                    <Progress value={20} className="h-3" />
                    <p className="text-sm text-muted-foreground">1 oportunidade</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Proposta</h3>
                      <span className="text-sm text-muted-foreground">R$ 67.000,00</span>
                    </div>
                    <Progress value={54} className="h-3" />
                    <p className="text-sm text-muted-foreground">2 oportunidades</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Negociação</h3>
                      <span className="text-sm text-muted-foreground">R$ 15.000,00</span>
                    </div>
                    <Progress value={12} className="h-3" />
                    <p className="text-sm text-muted-foreground">1 oportunidade</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Fechamento</h3>
                      <span className="text-sm text-muted-foreground">R$ 18.000,00</span>
                    </div>
                    <Progress value={14} className="h-3" />
                    <p className="text-sm text-muted-foreground">1 oportunidade</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}

