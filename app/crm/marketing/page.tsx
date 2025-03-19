import MainLayout from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, MoreHorizontal, Filter, Download, Mail } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Dados de exemplo
const campanhas = [
  {
    id: 1,
    nome: "Lançamento Produto X",
    tipo: "Email",
    status: "Ativa",
    dataInicio: "10/05/2023",
    dataFim: "30/05/2023",
    orcamento: 5000.0,
    alcance: 15000,
    conversoes: 450,
    roi: 2.8,
  },
  {
    id: 2,
    nome: "Promoção Inverno",
    tipo: "Redes Sociais",
    status: "Planejada",
    dataInicio: "01/06/2023",
    dataFim: "30/06/2023",
    orcamento: 8000.0,
    alcance: 25000,
    conversoes: 0,
    roi: 0,
  },
  {
    id: 3,
    nome: "Webinar Soluções B2B",
    tipo: "Evento",
    status: "Concluída",
    dataInicio: "15/04/2023",
    dataFim: "15/04/2023",
    orcamento: 3000.0,
    alcance: 500,
    conversoes: 75,
    roi: 3.5,
  },
  {
    id: 4,
    nome: "Remarketing Clientes",
    tipo: "Google Ads",
    status: "Ativa",
    dataInicio: "01/05/2023",
    dataFim: "31/05/2023",
    orcamento: 4500.0,
    alcance: 10000,
    conversoes: 320,
    roi: 2.1,
  },
]

// Dados de emails
const emails = [
  {
    id: 1,
    assunto: "Lançamento Produto X - Oferta Exclusiva",
    status: "Enviado",
    dataEnvio: "12/05/2023",
    destinatarios: 5000,
    aberturas: 2250,
    cliques: 850,
    taxaAbertura: 45,
    taxaClique: 17,
  },
  {
    id: 2,
    nome: "Newsletter Maio 2023",
    status: "Rascunho",
    dataEnvio: "25/05/2023",
    destinatarios: 8500,
    aberturas: 0,
    cliques: 0,
    taxaAbertura: 0,
    taxaClique: 0,
  },
  {
    id: 3,
    nome: "Webinar Soluções B2B - Convite",
    status: "Enviado",
    dataEnvio: "10/04/2023",
    destinatarios: 1200,
    aberturas: 720,
    cliques: 360,
    taxaAbertura: 60,
    taxaClique: 30,
  },
]

export default function MarketingPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Marketing</h1>
            <p className="text-muted-foreground">Gerencie suas campanhas e ações de marketing</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Exportar
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Nova Campanha
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Campanhas Ativas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">+1 em relação ao mês anterior</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orçamento Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 20.500,00</div>
              <p className="text-xs text-muted-foreground">+15% em relação ao mês anterior</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leads Gerados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">845</div>
              <p className="text-xs text-muted-foreground">+28% em relação ao mês anterior</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ROI Médio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.8x</div>
              <p className="text-xs text-muted-foreground">+0.3x em relação ao mês anterior</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar campanhas..." className="pl-8" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="campanhas" className="space-y-4">
          <TabsList>
            <TabsTrigger value="campanhas">Campanhas</TabsTrigger>
            <TabsTrigger value="emails">Email Marketing</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="campanhas">
            <Card>
              <CardHeader>
                <CardTitle>Campanhas de Marketing</CardTitle>
                <CardDescription>Visualize e gerencie suas campanhas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Período</TableHead>
                        <TableHead>Orçamento</TableHead>
                        <TableHead>Alcance</TableHead>
                        <TableHead>Conversões</TableHead>
                        <TableHead>ROI</TableHead>
                        <TableHead className="w-[80px]">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {campanhas.map((campanha) => (
                        <TableRow key={campanha.id}>
                          <TableCell className="font-medium">{campanha.nome}</TableCell>
                          <TableCell>{campanha.tipo}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`${
                                campanha.status === "Ativa"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                  : campanha.status === "Planejada"
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                              }`}
                            >
                              {campanha.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {campanha.dataInicio} a {campanha.dataFim}
                          </TableCell>
                          <TableCell>
                            R$ {campanha.orcamento.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell>{campanha.alcance.toLocaleString("pt-BR")}</TableCell>
                          <TableCell>{campanha.conversoes.toLocaleString("pt-BR")}</TableCell>
                          <TableCell>{campanha.roi > 0 ? `${campanha.roi}x` : "-"}</TableCell>
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
                  Mostrando {campanhas.length} de {campanhas.length} campanhas
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

          <TabsContent value="emails">
            <Card>
              <CardHeader>
                <CardTitle>Email Marketing</CardTitle>
                <CardDescription>Gerencie suas campanhas de email</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end mb-4">
                  <Button>
                    <Mail className="mr-2 h-4 w-4" /> Novo Email
                  </Button>
                </div>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Assunto</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Data de Envio</TableHead>
                        <TableHead>Destinatários</TableHead>
                        <TableHead>Taxa de Abertura</TableHead>
                        <TableHead>Taxa de Clique</TableHead>
                        <TableHead className="w-[80px]">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {emails.map((email) => (
                        <TableRow key={email.id}>
                          <TableCell className="font-medium">{email.assunto || email.nome}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`${
                                email.status === "Enviado"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                  : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                              }`}
                            >
                              {email.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{email.dataEnvio}</TableCell>
                          <TableCell>{email.destinatarios.toLocaleString("pt-BR")}</TableCell>
                          <TableCell>
                            {email.taxaAbertura > 0 ? (
                              <div className="flex items-center gap-2">
                                <Progress value={email.taxaAbertura} className="h-2 w-16" />
                                <span>{email.taxaAbertura}%</span>
                              </div>
                            ) : (
                              "-"
                            )}
                          </TableCell>
                          <TableCell>
                            {email.taxaClique > 0 ? (
                              <div className="flex items-center gap-2">
                                <Progress value={email.taxaClique} className="h-2 w-16" />
                                <span>{email.taxaClique}%</span>
                              </div>
                            ) : (
                              "-"
                            )}
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
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics de Marketing</CardTitle>
                <CardDescription>Métricas e desempenho das campanhas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Desempenho por Canal</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span>Email Marketing</span>
                            <span className="font-medium">ROI: 3.2x</span>
                          </div>
                          <Progress value={80} className="h-2" />
                          <p className="text-xs text-muted-foreground">Taxa de conversão: 4.5%</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span>Redes Sociais</span>
                            <span className="font-medium">ROI: 2.1x</span>
                          </div>
                          <Progress value={52} className="h-2" />
                          <p className="text-xs text-muted-foreground">Taxa de conversão: 2.8%</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span>Google Ads</span>
                            <span className="font-medium">ROI: 2.8x</span>
                          </div>
                          <Progress value={70} className="h-2" />
                          <p className="text-xs text-muted-foreground">Taxa de conversão: 3.5%</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span>Eventos</span>
                            <span className="font-medium">ROI: 3.5x</span>
                          </div>
                          <Progress value={87} className="h-2" />
                          <p className="text-xs text-muted-foreground">Taxa de conversão: 15%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Origem dos Leads</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Orgânico</span>
                          <span className="font-medium">35%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Pago</span>
                          <span className="font-medium">45%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Referência</span>
                          <span className="font-medium">15%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Direto</span>
                          <span className="font-medium">5%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}

