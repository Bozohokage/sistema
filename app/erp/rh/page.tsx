import MainLayout from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function RHPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Recursos Humanos</h1>
        <p className="text-muted-foreground">Gestão de colaboradores e processos de RH</p>

        <Card>
          <CardHeader>
            <CardTitle>Colaboradores</CardTitle>
            <CardDescription>Visualize e gerencie os colaboradores da empresa</CardDescription>
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

