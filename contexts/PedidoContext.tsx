"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"

export type StatusPedido =
  | "Análise dos Arquivos"
  | "Arquivos Aprovados"
  | "Produção"
  | "Ordem de Produção Aberta"
  | "Expedição"
  | "Pedido Entregue"

export type Pedido = {
  id: string
  cliente: string
  dataAbertura: Date
  horaAbertura: string
  produto: string
  quantidade: number
  dataEntrega: Date
  vendedor: string
  status: StatusPedido
  precoVenda: number
  formaPagamento: string
}

type PedidoContextType = {
  pedidos: Pedido[]
  adicionarPedido: (pedido: Omit<Pedido, "id" | "status">) => void
  atualizarStatusPedido: (id: string, novoStatus: StatusPedido) => void
  getPedidosPorStatus: (status: StatusPedido) => Pedido[]
}

const PedidoContext = createContext<PedidoContextType | undefined>(undefined)

export const usePedidos = () => {
  const context = useContext(PedidoContext)
  if (!context) {
    throw new Error("usePedidos deve ser usado dentro de um PedidoProvider")
  }
  return context
}

export const PedidoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pedidos, setPedidos] = useState<Pedido[]>([])

  useEffect(() => {
    const pedidosSalvos = localStorage.getItem("pedidos")
    if (pedidosSalvos) {
      setPedidos(
        JSON.parse(pedidosSalvos).map((p: Pedido) => ({
          ...p,
          dataAbertura: new Date(p.dataAbertura),
          dataEntrega: new Date(p.dataEntrega),
        })),
      )
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("pedidos", JSON.stringify(pedidos))
  }, [pedidos])

  const adicionarPedido = (novoPedido: Omit<Pedido, "id" | "status">) => {
    const pedidoCompleto: Pedido = {
      ...novoPedido,
      id: uuidv4(),
      status: "Análise dos Arquivos",
    }
    setPedidos([...pedidos, pedidoCompleto])
  }

  const atualizarStatusPedido = (id: string, novoStatus: StatusPedido) => {
    setPedidos(pedidos.map((pedido) => (pedido.id === id ? { ...pedido, status: novoStatus } : pedido)))
  }

  const getPedidosPorStatus = (status: StatusPedido) => {
    return pedidos.filter((pedido) => pedido.status === status)
  }

  return (
    <PedidoContext.Provider value={{ pedidos, adicionarPedido, atualizarStatusPedido, getPedidosPorStatus }}>
      {children}
    </PedidoContext.Provider>
  )
}

