/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react"

import LinkedList               from "./LinkedList"
import DoublyLinkedList         from "./DoubleLinkedList"
import CircularList             from "./CircularList"
import CircularDoublyLinkedList from "./CircularDoublyLinkedList"


const VEHICULOS_INICIALES = [
  { id: 1, modelo: "Toyota Prius",    tipo: "Híbrido",   placa: "ABC-123", tarifa: 25000 },
  { id: 2, modelo: "Renault Zoe",     tipo: "Eléctrico", placa: "XYZ-456", tarifa: 30000 },
  { id: 3, modelo: "Chevrolet Spark", tipo: "Gasolina",  placa: "DEF-789", tarifa: 18000 },
  { id: 4, modelo: "Nissan Leaf",     tipo: "Eléctrico", placa: "GHI-012", tarifa: 28000 },
]

const DESTACADOS_INICIALES = [
  { id: 10, modelo: "Tesla Model 3",  tipo: "Eléctrico", emoji: "⚡" },
  { id: 11, modelo: "BMW i3",         tipo: "Eléctrico", emoji: "🏎️" },
  { id: 12, modelo: "Porsche Taycan", tipo: "Eléctrico", emoji: "🚀" },
]

const INVERSIONISTAS_INICIALES = [
  { id: 1, nombre: "Carlos Mendoza", aporte: 50000000, activo: true },
  { id: 2, nombre: "Lucía Vargas",   aporte: 30000000, activo: true },
  { id: 3, nombre: "Roberto Kim",    aporte: 75000000, activo: true },
]

let idContador = 100

const fmt = (n: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n)

// ─── componentes exportados ───────────────────────────────────

export function Header({ totalDisponibles, totalHistorial, totalInversionistas }: any) {
  return (
    <div style={{ background: "#1a1a1a", color: "#fff", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h1 style={{ fontSize: 20, margin: 0 }}>🚗 Movilidad Urbana</h1>
      <span style={{ fontSize: 13, color: "#aaa" }}>
        Disponibles: {totalDisponibles} | Alquileres: {totalHistorial} | Inversionistas: {totalInversionistas}
      </span>
    </div>
  )
}

export function BannerDestacado({ destacado }: any) {
  return (
    <div style={{ background: "#e67e22", color: "#fff", padding: "10px 20px", fontSize: 14 }}>
      ⭐ Destacado: {destacado.emoji} {destacado.modelo} — {destacado.tipo} (rota cada 5s)
    </div>
  )
}

export function Tabs({ tabActiva, onChange }: any) {
  const tabs = [
    { key: "disponibles",    label: "Disponibles" },
    { key: "historial",      label: "Historial" },
    { key: "inversionistas", label: "Inversionistas" },
  ]
  return (
    <div style={{ display: "flex", borderBottom: "2px solid #ddd", padding: "0 20px" }}>
      {tabs.map(t => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          style={{ padding: "10px 20px", border: "none", background: "none", cursor: "pointer", fontWeight: tabActiva === t.key ? "bold" : "normal", borderBottom: tabActiva === t.key ? "2px solid #e67e22" : "none", marginBottom: -2 }}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}

export function PanelDisponibles({ vehiculos, onAgregar, onAlquilar }: any) {
  const [form, setForm] = useState({ modelo: "", tipo: "Gasolina", placa: "", tarifa: "" })

  const handleAgregar = () => {
    if (!form.modelo || !form.placa || !form.tarifa) return
    onAgregar({ id: idContador++, ...form, tarifa: parseInt(form.tarifa) })
    setForm({ modelo: "", tipo: "Gasolina", placa: "", tarifa: "" })
  }

  return (
    <div>
      <p style={{ fontSize: 12, color: "#888", marginBottom: 12 }}>LinkedList — {vehiculos.length} nodos</p>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        <input placeholder="Modelo"     value={form.modelo}  onChange={e => setForm({ ...form, modelo: e.target.value })}  style={inp} />
        <select                          value={form.tipo}    onChange={e => setForm({ ...form, tipo: e.target.value })}    style={inp}>
          <option>Gasolina</option>
          <option>Eléctrico</option>
          <option>Híbrido</option>
        </select>
        <input placeholder="Placa"      value={form.placa}   onChange={e => setForm({ ...form, placa: e.target.value })}   style={inp} />
        <input placeholder="Tarifa/hr"  value={form.tarifa}  onChange={e => setForm({ ...form, tarifa: e.target.value })}  style={inp} type="number" />
        <button onClick={handleAgregar} style={btn}>Agregar</button>
      </div>

      {vehiculos.length === 0 && <p>No hay vehículos disponibles.</p>}
      {vehiculos.map((v: any) => (
        <div key={v.id} style={fila}>
          <span><strong>{v.modelo}</strong> — {v.placa} — {v.tipo} — {fmt(v.tarifa)}/hr</span>
          <button onClick={() => onAlquilar(v)} style={{ ...btn, background: "#e67e22" }}>Alquilar</button>
        </div>
      ))}
    </div>
  )
}

export function PanelHistorial({ historial }: any) {
  return (
    <div>
      <p style={{ fontSize: 12, color: "#888", marginBottom: 12 }}>DoublyLinkedList — {historial.length} registros</p>
      {historial.length === 0 && <p>Sin alquileres registrados.</p>}
      {[...historial].reverse().map((a: any, i: number) => (
        <div key={i} style={fila}>
          <span><strong>{a.modelo}</strong> — {a.placa} — {a.cliente} — {a.fecha}</span>
          <span style={{ color: "#27ae60" }}>{fmt(a.tarifa)}/hr</span>
        </div>
      ))}
    </div>
  )
}

export function PanelInversionistas({ inversionistas, onAgregar, onEliminar }: any) {
  const [form, setForm] = useState({ nombre: "", aporte: "" })

  const handleAgregar = () => {
    if (!form.nombre || !form.aporte) return
    onAgregar({ id: idContador++, nombre: form.nombre, aporte: parseInt(form.aporte), activo: true })
    setForm({ nombre: "", aporte: "" })
  }

  return (
    <div>
      <p style={{ fontSize: 12, color: "#888", marginBottom: 12 }}>CircularDoublyLinkedList — {inversionistas.length} nodos</p>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input placeholder="Nombre"     value={form.nombre}  onChange={e => setForm({ ...form, nombre: e.target.value })} style={inp} />
        <input placeholder="Aporte COP" value={form.aporte}  onChange={e => setForm({ ...form, aporte: e.target.value })} style={inp} type="number" />
        <button onClick={handleAgregar} style={btn}>Agregar</button>
      </div>

      {inversionistas.length === 0 && <p>Sin inversionistas.</p>}
      {inversionistas.map((inv: any) => (
        <div key={inv.id} style={fila}>
          <span><strong>{inv.nombre}</strong> — {fmt(inv.aporte)}</span>
          <button onClick={() => onEliminar(inv.id)} style={{ ...btn, background: "#e74c3c" }}>Eliminar</button>
        </div>
      ))}
    </div>
  )
}

// ─── estilos simples ─────────────────────────────────────────
const inp: any = { padding: "8px 10px", border: "1px solid #ccc", borderRadius: 4, fontSize: 13, flex: 1, minWidth: 100 }
const btn: any = { padding: "8px 16px", background: "#1a1a1a", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer", fontSize: 13 }
const fila: any = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #eee" }

// ─── inicializar estructuras ─────────────────────────────────
function crearEstructuras() {
  const disponibles = new LinkedList()
  VEHICULOS_INICIALES.forEach(v => disponibles.append(v))

  const historial = new DoublyLinkedList()

  const destacados = new CircularList()
  DESTACADOS_INICIALES.forEach(v => destacados.append(v))

  const inversionistas = new CircularDoublyLinkedList()
  INVERSIONISTAS_INICIALES.forEach(i => inversionistas.append(i))

  return { disponibles, historial, destacados, inversionistas }
}

// ─── componente principal ────────────────────────────────────
export default function App() {
  const estructuras = useRef(crearEstructuras())

  const [disponibles,    setDisponibles]    = useState<any[]>(VEHICULOS_INICIALES)
  const [historial,      setHistorial]      = useState<any[]>([])
  const [destacado,      setDestacado]      = useState<any>(DESTACADOS_INICIALES[0])
  const [inversionistas, setInversionistas] = useState<any[]>(INVERSIONISTAS_INICIALES)
  const [tab,            setTab]            = useState("disponibles")

  useEffect(() => {
    const intervalo = setInterval(() => {
      const sig = estructuras.current.destacados.rotate()
      if (sig) setDestacado({ ...sig })
    }, 5000)
    return () => clearInterval(intervalo)
  }, [])

  const refrescar = () => {
    setDisponibles(estructuras.current.disponibles.toArray())
    setHistorial(estructuras.current.historial.toArray())
    setInversionistas(estructuras.current.inversionistas.toArray())
  }

  const handleAlquilar = (v: any) => {
    estructuras.current.disponibles.remove(v.id)
    estructuras.current.historial.append({
      ...v,
      fecha: new Date().toLocaleString("es-CO"),
      cliente: "CLI-" + Math.floor(Math.random() * 9000 + 1000),
    })
    refrescar()
  }

  const handleAgregarVehiculo = (v: any) => {
    estructuras.current.disponibles.append(v)
    refrescar()
  }

  const handleAgregarInversionista = (inv: any) => {
    estructuras.current.inversionistas.append(inv)
    refrescar()
  }

  const handleEliminarInversionista = (id: number) => {
    estructuras.current.inversionistas.remove(id)
    refrescar()
  }

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 900, margin: "0 auto" }}>
      <Header
        totalDisponibles={disponibles.length}
        totalHistorial={historial.length}
        totalInversionistas={inversionistas.length}
      />

      <BannerDestacado destacado={destacado} />

      <Tabs tabActiva={tab} onChange={setTab} />

      <div style={{ padding: "20px" }}>
        {tab === "disponibles" && (
          <PanelDisponibles
            vehiculos={disponibles}
            onAgregar={handleAgregarVehiculo}
            onAlquilar={handleAlquilar}
          />
        )}
        {tab === "historial" && (
          <PanelHistorial historial={historial} />
        )}
        {tab === "inversionistas" && (
          <PanelInversionistas
            inversionistas={inversionistas}
            onAgregar={handleAgregarInversionista}
            onEliminar={handleEliminarInversionista}
          />
        )}
      </div>
    </div>
  )
}