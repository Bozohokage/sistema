"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, Play, Search, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { usePedidos, type Pedido } from "@/contexts/PedidoContext"

// Função para abrir a pasta do pedido
const abrirPastaPedido = (id: string) => {
  console.log(`Abrindo pasta do pedido ${id}`)
  // Na implementação real, isso abriria a pasta no sistema de arquivos
  alert(`Abrindo pasta do pedido ${id}`)
}

export function Producao() {
  const { getPedidosPorStatus, atualizarStatusPedido } = usePedidos()
  const { toast } = useToast()
  const [sortingAguardando, setSortingAguardando] = useState<SortingState>([])
  const [columnFiltersAguardando, setColumnFiltersAguardando] = useState<ColumnFiltersState>([])

  const [sortingEmProducao, setSortingEmProducao] = useState<SortingState>([])
  const [columnFiltersEmProducao, setColumnFiltersEmProducao] = useState<ColumnFiltersState>([])

  const handleAbrirOrdemProducao = (id: string) => {
    atualizarStatusPedido(id, "Ordem de Produção Aberta")

    // Descontar insumos do estoque (simulação)
    console.log(`Descontando insumos para o pedido ${id}`)

    toast({
      title: "Ordem de produção aberta",
      description: `A ordem de produção para o pedido #${id} foi aberta com sucesso.`,
    })
  }

  const handleFinalizarProducao = (id: string) => {
    atualizarStatusPedido(id, "Expedição")

    toast({
      title: "Produção finalizada",
      description: `A produção do pedido #${id} foi finalizada e movida para expedição.`,
    })
  }

  // Definição das colunas para Aguardando Ordem de Produção
  const columnsAguardando: ColumnDef<Pedido>[] = [
    {
      accessorKey: "id",
      header: "Número do Pedido",
      cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "cliente",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Cliente
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "dataAbertura",
      header: "Data de Abertura",
      cell: ({ row }) => format(new Date(row.getValue("dataAbertura")), "dd/MM/yyyy", { locale: ptBR }),
    },
    {
      accessorKey: "horaAbertura",
      header: "Hora da Abertura",
    },
    {
      accessorKey: "produto",
      header: "Produto",
    },
    {
      accessorKey: "quantidade",
      header: "Quantidade (m²)",
      cell: ({ row }) => <div className="text-right">{row.getValue("quantidade")}</div>,
    },
    {
      accessorKey: "dataEntrega",
      header: "Data de Entrega",
      cell: ({ row }) => format(new Date(row.getValue("dataEntrega")), "dd/MM/yyyy", { locale: ptBR }),
    },
    {
      accessorKey: "vendedor",
      header: "Vendedor",
    },
    {
      id: "acoes",
      header: "Ações",
      cell: ({ row }) => {
        return (
          <Button
            variant="outline"
            size="sm"
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => handleAbrirOrdemProducao(row.getValue("id"))}
          >
            <Play className="h-4 w-4 mr-2" />
            Abrir Ordem
          </Button>
        )
      },
    },
  ]

  // Definição das colunas para Em Produção
  const columnsEmProducao: ColumnDef<Pedido>[] = [
    {
      accessorKey: "id",
      header: "Número do Pedido",
      cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "cliente",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Cliente
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "dataAbertura",
      header: "Data de Abertura",
      cell: ({ row }) => format(new Date(row.getValue("dataAbertura")), "dd/MM/yyyy", { locale: ptBR }),
    },
    {
      accessorKey: "horaAbertura",
      header: "Hora da Abertura",
    },
    {
      accessorKey: "produto",
      header: "Produto",
    },
    {
      accessorKey: "quantidade",
      header: "Quantidade (m²)",
      cell: ({ row }) => <div className="text-right">{row.getValue("quantidade")}</div>,
    },
    {
      accessorKey: "dataEntrega",
      header: "Data de Entrega",
      cell: ({ row }) => format(new Date(row.getValue("dataEntrega")), "dd/MM/yyyy", { locale: ptBR }),
    },
    {
      accessorKey: "vendedor",
      header: "Vendedor",
    },
    {
      id: "acoes",
      header: "Ações",
      cell: ({ row }) => {
        return (
          <Button
            variant="outline"
            size="sm"
            className="bg-green-500 hover:bg-green-600 text-white"
            onClick={() => handleFinalizarProducao(row.getValue("id"))}
          >
            <Check className="h-4 w-4 mr-2" />
            Finalizar
          </Button>
        )
      },
    },
  ]

  const tableAguardando = useReactTable({
    data: getPedidosPorStatus("Arquivos Aprovados"),
    columns: columnsAguardando,
    onSortingChange: setSortingAguardando,
    onColumnFiltersChange: setColumnFiltersAguardando,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sortingAguardando,
      columnFilters: columnFiltersAguardando,
    },
  })

  const tableEmProducao = useReactTable({
    data: getPedidosPorStatus("Ordem de Produção Aberta"),
    columns: columnsEmProducao,
    onSortingChange: setSortingEmProducao,
    onColumnFiltersChange: setColumnFiltersEmProducao,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sortingEmProducao,
      columnFilters: columnFiltersEmProducao,
    },
  })

  return (
    <div className="space-y-8">
      {/* Tabela Aguardando Ordem de Produção */}
      <div>
        <h2 className="text-xl font-bold mb-4">Aguardando Ordem de Produção</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Filtrar pedidos..."
              value={(tableAguardando.getColumn("cliente")?.getFilterValue() as string) ?? ""}
              onChange={(event) => tableAguardando.getColumn("cliente")?.setFilterValue(event.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {tableAguardando.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {tableAguardando.getRowModel().rows?.length ? (
                  tableAguardando.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      onDoubleClick={() => abrirPastaPedido(row.getValue("id"))}
                      className="cursor-pointer"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columnsAguardando.length} className="h-24 text-center">
                      Nenhum pedido aguardando ordem de produção.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Tabela Em Produção */}
      <div>
        <h2 className="text-xl font-bold mb-4">Em Produção</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Filtrar pedidos..."
              value={(tableEmProducao.getColumn("cliente")?.getFilterValue() as string) ?? ""}
              onChange={(event) => tableEmProducao.getColumn("cliente")?.setFilterValue(event.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {tableEmProducao.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {tableEmProducao.getRowModel().rows?.length ? (
                  tableEmProducao.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      onDoubleClick={() => abrirPastaPedido(row.getValue("id"))}
                      className="cursor-pointer"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columnsEmProducao.length} className="h-24 text-center">
                      Nenhum pedido em produção.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}

