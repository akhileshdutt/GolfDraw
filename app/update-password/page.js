"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function UpdatePassword() {
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleUpdate = async () => {
    if (!password) {
      alert("Enter new password")
      return
    }

    const { error } = await supabase.auth.updateUser({
      password: password,
    })

    if (error) {
      alert(error.message)
    } else {
      alert("Password updated successfully!")
      router.push("/login")
    }
  }

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h2>Set New Password</h2>

      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleUpdate}>
        Update Password
      </button>
    </div>
  )
}