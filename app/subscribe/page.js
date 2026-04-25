

"use client"

import { useSearchParams } from "next/navigation"

export default function Subscribe() {
  const params = useSearchParams()
  const plan = params.get("plan")

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#020617",
      color: "white"
    }}>
      <div style={{
        padding: "40px",
        borderRadius: "20px",
        background: "rgba(255,255,255,0.05)"
      }}>
        <h2>You selected:</h2>
        <h1 style={{ color: "#4ade80" }}>{plan}</h1>

        <p style={{ marginTop: "20px" }}>
          Payment integration (Stripe) will come here.
        </p>
      </div>
    </div>
  )
}