import MainLayout from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts"

// Dados de exemplo
const salesData = [
  { name: "Jan", sales: 4000, target: 2400 },
  { name: "Fev", sales: 3000, target: 2500 },
  { name: "Mar", sales: 2000, target: 2600 },
  { name: "Abr", sales: 2780, target: 2700 },
  { name: "Mai", sales: 1890, target: 2800 },
  { name: "Jun", sales: 2390, target: 2900 },
]

const inventoryData = [
  { name: "Matéria-prima", value: 400 },
  { name: "Em produção", value: 300 },
  { name: "Produtos acabados", value: 300 },
]

const COLORS = ["#e11d48", "#f43f5e", "#fb7185"]

const productionData = [
  { name: "Semana 1", planned: 400, actual: 380 },
  { name: "Semana 2", planned: 420, actual: 400 },
  { name: "Semana 3", planned: 450, actual: 420 },
  { name: "Semana 4", planned: 470, actual: 460 },
]

export default function Home() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-primary">Dashboard</h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-primary"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 45.231,89</div>
              <p className="text-xs text-muted-foreground">+20.1% em relação ao mês anterior</p>
            </CardContent>
          </Card>
          <Card className="border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor do Estoque</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-primary"
              >
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 12.234,00</div>
              <p className="text-xs text-muted-foreground">+4.3% em relação ao mês anterior</p>
            </CardContent>
          </Card>
          <Card className="border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-primary"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">+12.4% em relação ao mês anterior</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="mrp">MRP</TabsTrigger>
            <TabsTrigger value="erp">ERP</TabsTrigger>
            <TabsTrigger value="crm">CRM</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 border-primary/20">
                <CardHeader>
                  <CardTitle>Visão Geral de Vendas</CardTitle>
                  <CardDescription>Desempenho mensal de vendas vs metas</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div style={{ width: "100%", height: 350 }}>
                    <ResponsiveContainer>
                      <BarChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="sales" name="Vendas" fill="#e11d48" />
                        <Bar dataKey="target" name="Meta" fill="#f43f5e" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3 border-primary/20">
                <CardHeader>
                  <CardTitle>Distribuição do Estoque</CardTitle>
                  <CardDescription>Estoque atual por categoria</CardDescription>
                </CardHeader>
                <CardContent>
                  <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={inventoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {inventoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="mrp" className="space-y-4">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Planejamento de Produção</CardTitle>
                <CardDescription>Produção Planejada vs. Real</CardDescription>
              </CardHeader>
              <CardContent>
                <div style={{ width: "100%", height: 350 }}>
                  <ResponsiveContainer>
                    <LineChart data={productionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="planned" name="Planejado" stroke="#e11d48" strokeWidth={2} />
                      <Line type="monotone" dataKey="actual" name="Real" stroke="#f43f5e" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="erp" className="space-y-4">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Visão Financeira</CardTitle>
                <CardDescription>Receita, Despesas e Lucro</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full flex items-center justify-center">
                  <p className="text-muted-foreground">Visualização de dados financeiros</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="crm" className="space-y-4">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Pipeline de Vendas</CardTitle>
                <CardDescription>Oportunidades atuais por estágio</CardDescription>
              </CardHeader>
              <CardContent>
                <div style={{ width: "100%", height: 350 }}>
                  <ResponsiveContainer>
                    <BarChart
                      data={[
                        { name: "Lead", value: 45000 },
                        { name: "Qualificado", value: 32000 },
                        { name: "Proposta", value: 28000 },
                        { name: "Negociação", value: 16000 },
                        { name: "Fechado", value: 12000 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="Valor" fill="#e11d48" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}

