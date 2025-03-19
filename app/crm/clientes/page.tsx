import MainLayout from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MoreHorizontal, Filter, Download, UserPlus, Mail, Phone } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Dados de exemplo
const clientes = [
  {
    id: 1,
    nome: "Empresa ABC Ltda",
    contato: "João Silva",
    email: "contato@abc.com",
    telefone: "(11) 98765-4321",
    cidade: "São Paulo",
    ultimaCompra: "15/03/2023",
    status: "Ativo",
    valor: 12500.0,
  },
  {
    id: 2,
    nome: "Comércio XYZ",
    contato: "Maria Oliveira",
    email: "vendas@xyz.com",
    telefone: "(11) 91234-5678",
    cidade: "Rio de Janeiro",
    ultimaCompra: "22/04/2023",
    status: "Ativo",
    valor: 8750.0,
  },
  {
    id: 3,
    nome: "Indústria 123",
    contato: "Carlos Santos",
    email: "compras@123.ind.br",
    telefone: "(11) 97777-8888",
    cidade: "Belo Horizonte",
    ultimaCompra: "10/02/2023",
    status: "Inativo",
    valor: 5200.0,
  },
  {
    id: 4,
    nome: "Loja Central",
    contato: "Ana Pereira",
    email: "atendimento@central.com",
    telefone: "(11) 96666-3333",
    cidade: "Curitiba",
    ultimaCompra: "05/05/2023",
    status: "Ativo",
    valor: 15800.0,
  },
  {
    id: 5,
    nome: "Distribuidora Norte",
    contato: "Roberto Almeida",
    email: "roberto@distnorte.com",
    telefone: "(11) 95555-4444",
    cidade: "Manaus",
    ultimaCompra: "18/04/2023",
    status: "Ativo",
    valor: 22300.0,
  },
  {
    id: 6,
    nome: "Supermercado Bom Preço",
    contato: "Fernanda Lima",
    email: "compras@bompreco.com",
    telefone: "(11) 94444-5555",
    cidade: "Salvador",
    ultimaCompra: "30/03/2023",
    status: "Ativo",
    valor: 9600.0,
  },
  {
    id: 7,
    nome: "Tech Solutions",
    contato: "Ricardo Gomes",
    email: "ricardo@techsolutions.com",
    telefone: "(11) 93333-6666",
    cidade: "Recife",
    ultimaCompra: "12/01/2023",
    status: "Inativo",
    valor: 7400.0,
  },
]

// Dados de leads
const leads = [
  {
    id: 1,
    nome: "Empresa Potencial",
    contato: "Marcos Silva",
    email: "marcos@potencial.com",
    telefone: "(11) 92222-7777",
    origem: "Site",
    status: "Quente",
    dataCriacao: "10/05/2023",
  },
  {
    id: 2,
    nome: "Comércio Regional",
    contato: "Juliana Costa",
    email: "juliana@regional.com",
    telefone: "(11) 91111-8888",
    origem: "Indicação",
    status: "Morno",
    dataCriacao: "05/05/2023",
  },
  {
    id: 3,
    nome: "Indústria Futuro",
    contato: "Pedro Mendes",
    email: "pedro@futuro.ind.br",
    telefone: "(11) 90000-9999",
    origem: "Feira",
    status: "Frio",
    dataCriacao: "01/05/2023",
  },
]

export default function ClientesPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Clientes</h1>
            <p className="text-muted-foreground">Gerencie seus clientes e leads</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Exportar
            </Button>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" /> Novo Cliente
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar clientes..." className="pl-8" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="clientes" className="space-y-4">
          <TabsList>
            <TabsTrigger value="clientes">Clientes</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="segmentacao">Segmentação</TabsTrigger>
          </TabsList>

          <TabsContent value="clientes">
            <Card>
              <CardHeader>
                <CardTitle>Lista de Clientes</CardTitle>
                <CardDescription>Visualize e gerencie todos os seus clientes ativos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Contato</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Telefone</TableHead>
                        <TableHead>Cidade</TableHead>
                        <TableHead>Última Compra</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[80px]">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clientes.map((cliente) => (
                        <TableRow key={cliente.id}>
                          <TableCell className="font-medium">{cliente.nome}</TableCell>
                          <TableCell>{cliente.contato}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              <span>{cliente.email}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              <span>{cliente.telefone}</span>
                            </div>
                          </TableCell>
                          <TableCell>{cliente.cidade}</TableCell>
                          <TableCell>{cliente.ultimaCompra}</TableCell>
                          <TableCell>
                            R$ {cliente.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`${
                                cliente.status === "Ativo"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                              }`}
                            >
                              {cliente.status}
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
                  Mostrando {clientes.length} de {clientes.length} clientes
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

          <TabsContent value="leads">
            <Card>
              <CardHeader>
                <CardTitle>Leads</CardTitle>
                <CardDescription>Potenciais clientes e oportunidades de negócio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Contato</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Telefone</TableHead>
                        <TableHead>Origem</TableHead>
                        <TableHead>Data de Criação</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[80px]">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leads.map((lead) => (
                        <TableRow key={lead.id}>
                          <TableCell className="font-medium">{lead.nome}</TableCell>
                          <TableCell>{lead.contato}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              <span>{lead.email}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              <span>{lead.telefone}</span>
                            </div>
                          </TableCell>
                          <TableCell>{lead.origem}</TableCell>
                          <TableCell>{lead.dataCriacao}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`${
                                lead.status === "Quente"
                                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                  : lead.status === "Morno"
                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                    : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                              }`}
                            >
                              {lead.status}
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
                  Mostrando {leads.length} de {leads.length} leads
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

          <TabsContent value="segmentacao">
            <Card>
              <CardHeader>
                <CardTitle>Segmentação de Clientes</CardTitle>
                <CardDescription>Analise seus clientes por categorias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Por Região</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>São Paulo</span>
                          <span className="font-medium">25%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rio de Janeiro</span>
                          <span className="font-medium">20%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Belo Horizonte</span>
                          <span className="font-medium">15%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Outras</span>
                          <span className="font-medium">40%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Por Valor</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Premium (&gt;R$20.000)</span>
                          <span className="font-medium">15%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Médio (R$10.000-R$20.000)</span>
                          <span className="font-medium">35%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Básico (&lt;R$10.000)</span>
                          <span className="font-medium">50%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Por Frequência</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Recorrentes</span>
                          <span className="font-medium">45%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Ocasionais</span>
                          <span className="font-medium">30%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Únicos</span>
                          <span className="font-medium">25%</span>
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

