"use client"

import type React from "react"
import { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { useToast } from "@/hooks/use-toast"
import { usePedidos } from "@/contexts/PedidoContext"

// Dados de exemplo
const produtos = [
  { id: 1, nome: "Banner 440g", preco: 45.0 },
  { id: 2, nome: "Adesivo Vinil", preco: 65.0 },
  { id: 3, nome: "Lona 280g", preco: 38.0 },
  { id: 4, nome: "Adesivo Perfurado", preco: 75.0 },
  { id: 5, nome: "Papel Fotográfico", preco: 55.0 },
]

const vendedores = [
  { id: 1, nome: "Carlos Silva" },
  { id: 2, nome: "Maria Oliveira" },
  { id: 3, nome: "João Santos" },
  { id: 4, nome: "Ana Pereira" },
]

const clientes = [
  { id: 1, nome: "Empresa ABC Ltda", telefone: "(11) 98765-4321", email: "contato@abc.com" },
  { id: 2, nome: "Comércio XYZ", telefone: "(11) 91234-5678", email: "vendas@xyz.com" },
  { id: 3, nome: "Indústria 123", telefone: "(11) 97777-8888", email: "compras@123.ind.br" },
  { id: 4, nome: "Loja Central", telefone: "(11) 96666-3333", email: "atendimento@central.com" },
]

// Verificação de estoque (simulação)
const verificarEstoque = (produtoId: number, quantidade: number) => {
  const estoqueDisponivel = {
    1: 500, // Banner 440g - 500 metros disponíveis
    2: 300, // Adesivo Vinil - 300 metros disponíveis
    3: 800, // Lona 280g - 800 metros disponíveis
    4: 200, // Adesivo Perfurado - 200 metros disponíveis
    5: 150, // Papel Fotográfico - 150 metros disponíveis
  }

  return estoqueDisponivel[produtoId as keyof typeof estoqueDisponivel] >= quantidade
}

export function AberturaPedido() {
  const { toast } = useToast()
  const { adicionarPedido } = usePedidos()
  const [cliente, setCliente] = useState("")
  const [clienteAberto, setClienteAberto] = useState(false)
  const [produto, setProduto] = useState("")
  const [produtoAberto, setProdutoAberto] = useState(false)
  const [quantidade, setQuantidade] = useState("")
  const [precoVenda, setPrecoVenda] = useState("")
  const [dataEntrega, setDataEntrega] = useState<Date>()
  const [vendedor, setVendedor] = useState("")
  const [formaPagamento, setFormaPagamento] = useState("pix")

  // Atualiza o preço de venda quando o produto é selecionado
  const handleProdutoChange = (produtoId: string) => {
    setProduto(produtoId)
    const produtoSelecionado = produtos.find((p) => p.id.toString() === produtoId)
    if (produtoSelecionado) {
      setPrecoVenda(produtoSelecionado.preco.toString())
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validação básica
    if (!cliente || !produto || !quantidade || !dataEntrega || !vendedor) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    // Verificar estoque
    const produtoId = Number.parseInt(produto)
    const qtd = Number.parseFloat(quantidade)

    if (!verificarEstoque(produtoId, qtd)) {
      toast({
        title: "Estoque insuficiente",
        description: "Não há insumos suficientes para atender este pedido.",
        variant: "destructive",
      })
      return
    }

    // Criar novo pedido
    const novoPedido = {
      cliente: clientes.find((c) => c.id.toString() === cliente)?.nome || "",
      dataAbertura: new Date(),
      horaAbertura: format(new Date(), "HH:mm"),
      produto: produtos.find((p) => p.id.toString() === produto)?.nome || "",
      quantidade: qtd,
      dataEntrega,
      vendedor: vendedores.find((v) => v.id.toString() === vendedor)?.nome || "",
      precoVenda: Number.parseFloat(precoVenda),
      formaPagamento,
    }

    adicionarPedido(novoPedido)

    // Notificar usuário
    toast({
      title: "Pedido criado com sucesso!",
      description: `O pedido foi criado e adicionado à lista de análise de arquivos.`,
    })

    // Limpar formulário
    setCliente("")
    setProduto("")
    setQuantidade("")
    setPrecoVenda("")
    setDataEntrega(undefined)
    setVendedor("")
    setFormaPagamento("pix")
  }

  return (
    <Card className="w-full max-w-4xl mx-auto border-primary/20">
      <CardHeader className="bg-primary/5">
        <CardTitle className="text-primary">Abertura de Pedido</CardTitle>
        <CardDescription>Preencha os dados para criar um novo pedido</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cliente */}
            <div className="space-y-2">
              <Label htmlFor="cliente">Cliente</Label>
              <Popover open={clienteAberto} onOpenChange={setClienteAberto}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={clienteAberto}
                    className="w-full justify-between border-primary/20"
                  >
                    {cliente ? clientes.find((c) => c.id.toString() === cliente)?.nome : "Selecione o cliente..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0">
                  <Command>
                    <CommandInput placeholder="Buscar cliente..." />
                    <CommandList>
                      <CommandEmpty>Nenhum cliente encontrado.</CommandEmpty>
                      <CommandGroup>
                        {clientes.map((c) => (
                          <CommandItem
                            key={c.id}
                            value={c.id.toString()}
                            onSelect={(currentValue) => {
                              setCliente(currentValue === cliente ? "" : currentValue)
                              setClienteAberto(false)
                            }}
                          >
                            <Check
                              className={cn("mr-2 h-4 w-4", cliente === c.id.toString() ? "opacity-100" : "opacity-0")}
                            />
                            <div className="flex flex-col">
                              <span>{c.nome}</span>
                              <span className="text-xs text-muted-foreground">
                                {c.telefone} | {c.email}
                              </span>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Produto */}
            <div className="space-y-2">
              <Label htmlFor="produto">Produto</Label>
              <Popover open={produtoAberto} onOpenChange={setProdutoAberto}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={produtoAberto}
                    className="w-full justify-between border-primary/20"
                  >
                    {produto ? produtos.find((p) => p.id.toString() === produto)?.nome : "Selecione o produto..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0">
                  <Command>
                    <CommandInput placeholder="Buscar produto..." />
                    <CommandList>
                      <CommandEmpty>Nenhum produto encontrado.</CommandEmpty>
                      <CommandGroup>
                        {produtos.map((p) => (
                          <CommandItem
                            key={p.id}
                            value={p.id.toString()}
                            onSelect={(currentValue) => {
                              handleProdutoChange(currentValue)
                              setProdutoAberto(false)
                            }}
                          >
                            <Check
                              className={cn("mr-2 h-4 w-4", produto === p.id.toString() ? "opacity-100" : "opacity-0")}
                            />
                            <div className="flex flex-col">
                              <span>{p.nome}</span>
                              <span className="text-xs text-muted-foreground">R$ {p.preco.toFixed(2)}/m²</span>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Quantidade */}
            <div className="space-y-2">
              <Label htmlFor="quantidade">Quantidade (m²)</Label>
              <Input
                id="quantidade"
                type="number"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                min="0.1"
                step="0.1"
                className="border-primary/20"
              />
            </div>

            {/* Preço de Venda */}
            <div className="space-y-2">
              <Label htmlFor="precoVenda">Preço de Venda (R$/m²)</Label>
              <Input
                id="precoVenda"
                type="number"
                value={precoVenda}
                onChange={(e) => setPrecoVenda(e.target.value)}
                min="0.01"
                step="0.01"
                className="border-primary/20"
              />
            </div>

            {/* Data de Entrega */}
            <div className="space-y-2">
              <Label htmlFor="dataEntrega">Data de Entrega</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal border-primary/20",
                      !dataEntrega && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dataEntrega ? format(dataEntrega, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={dataEntrega} onSelect={setDataEntrega} initialFocus locale={ptBR} />
                </PopoverContent>
              </Popover>
            </div>

            {/* Vendedor */}
            <div className="space-y-2">
              <Label htmlFor="vendedor">Vendedor</Label>
              <Select value={vendedor} onValueChange={setVendedor}>
                <SelectTrigger className="border-primary/20">
                  <SelectValue placeholder="Selecione o vendedor" />
                </SelectTrigger>
                <SelectContent>
                  {vendedores.map((v) => (
                    <SelectItem key={v.id} value={v.id.toString()}>
                      {v.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Forma de Pagamento */}
            <div className="space-y-2 col-span-full">
              <Label>Forma de Pagamento</Label>
              <RadioGroup value={formaPagamento} onValueChange={setFormaPagamento} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pix" id="pix" />
                  <Label htmlFor="pix">Pix</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="credito" id="credito" />
                  <Label htmlFor="credito">Crédito</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dinheiro" id="dinheiro" />
                  <Label htmlFor="dinheiro">Dinheiro</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between bg-primary/5">
        <Button variant="outline" className="border-primary/20 hover:bg-primary/10">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90">
          Abrir Pedido
        </Button>
      </CardFooter>
    </Card>
  )
}

