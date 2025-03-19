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
import { ArrowUpDown, Check, Search, X } from "lucide-react"

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

export function AnaliseArquivos() {
  const { getPedidosPorStatus, atualizarStatusPedido } = usePedidos()
  const { toast } = useToast()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const handleAprovarArquivo = (id: string) => {
    atualizarStatusPedido(id, "Arquivos Aprovados")

    toast({
      title: "Arquivo aprovado",
      description: `O arquivo do pedido #${id} foi aprovado e movido para produção.`,
    })
  }

  const handleRejeitarArquivo = (id: string) => {
    atualizarStatusPedido(id, "Análise dos Arquivos")

    toast({
      title: "Arquivo rejeitado",
      description: `O arquivo do pedido #${id} foi rejeitado.`,
    })
  }

  // Definição das colunas
  const columns: ColumnDef<Pedido>[] = [
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
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-green-500 hover:bg-green-600 text-white"
              onClick={() => handleAprovarArquivo(row.getValue("id"))}
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-red-500 hover:bg-red-600 text-white"
              onClick={() => handleRejeitarArquivo(row.getValue("id"))}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data: getPedidosPorStatus("Análise dos Arquivos"),
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Filtrar pedidos..."
            value={(table.getColumn("cliente")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("cliente")?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
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
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Nenhum pedido para análise de arquivos.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Anterior
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Próximo
        </Button>
      </div>
    </div>
  )
}

