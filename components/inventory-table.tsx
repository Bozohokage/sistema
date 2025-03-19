"use client"

import { useState } from "react"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Sample inventory data
const inventoryData = [
  {
    id: "INV001",
    name: "Aluminum Sheet",
    category: "Raw Material",
    quantity: 1500,
    unit: "kg",
    status: "In Stock",
    location: "Warehouse A",
    reorderPoint: 500,
  },
  {
    id: "INV002",
    name: "Steel Rod",
    category: "Raw Material",
    quantity: 800,
    unit: "pcs",
    status: "In Stock",
    location: "Warehouse B",
    reorderPoint: 200,
  },
  {
    id: "INV003",
    name: "Plastic Granules",
    category: "Raw Material",
    quantity: 350,
    unit: "kg",
    status: "Low Stock",
    location: "Warehouse A",
    reorderPoint: 400,
  },
  {
    id: "INV004",
    name: "Circuit Board",
    category: "Component",
    quantity: 2500,
    unit: "pcs",
    status: "In Stock",
    location: "Warehouse C",
    reorderPoint: 1000,
  },
  {
    id: "INV005",
    name: "Motor Assembly",
    category: "Component",
    quantity: 120,
    unit: "pcs",
    status: "Low Stock",
    location: "Warehouse B",
    reorderPoint: 150,
  },
  {
    id: "INV006",
    name: "Product X",
    category: "Finished Good",
    quantity: 75,
    unit: "pcs",
    status: "In Stock",
    location: "Warehouse D",
    reorderPoint: 50,
  },
  {
    id: "INV007",
    name: "Product Y",
    category: "Finished Good",
    quantity: 25,
    unit: "pcs",
    status: "Low Stock",
    location: "Warehouse D",
    reorderPoint: 30,
  },
  {
    id: "INV008",
    name: "Packaging Material",
    category: "Supplies",
    quantity: 5000,
    unit: "pcs",
    status: "In Stock",
    location: "Warehouse A",
    reorderPoint: 1500,
  },
]

export function InventoryTable() {
  const [sorting, setSorting] = useState<"asc" | "desc">("asc")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredData = inventoryData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedData = [...filteredData].sort((a, b) => {
    if (sorting === "asc") {
      return a.name.localeCompare(b.name)
    } else {
      return b.name.localeCompare(a.name)
    }
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[250px]"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Filter <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>Raw Material</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Component</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Finished Good</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Supplies</DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>In Stock</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Low Stock</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Out of Stock</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Item
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>
                <div className="flex items-center space-x-2">
                  <span>Name</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setSorting(sorting === "asc" ? "desc" : "asc")}
                  >
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell className="text-right">
                  {item.quantity} {item.unit}
                </TableCell>
                <TableCell>
                  <Badge variant={item.status === "In Stock" ? "default" : "destructive"}>{item.status}</Badge>
                </TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Edit item</DropdownMenuItem>
                      <DropdownMenuItem>Adjust quantity</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Delete item</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

