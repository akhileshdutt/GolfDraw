
// // "use client"

// // import { useState } from "react"
// // import { supabase } from "@/lib/supabaseClient"
// // import { useRouter } from "next/navigation"

// // export default function Login() {
// //   const router = useRouter()
// //   const [email, setEmail] = useState("")
// //   const [password, setPassword] = useState("")
// //   const [loading, setLoading] = useState(false)
  

// //   const handleLogin = async () => {
// //     if (!email || !password) {
// //       alert("Enter email and password")
// //       return
// //     }

// //     setLoading(true)

// //     const { error } = await supabase.auth.signInWithPassword({
// //       email,
// //       password,
// //     })

// //     setLoading(false)

// //     if (error) {
// //       alert(error.message)
// //     } else {
// //       router.push("/dashboard")
// //     }
// //   }

// //   return (
// //     <div style={pageStyle}>
// //       <div style={cardStyle}>
// //         <h2 style={{ marginBottom: "20px" }}>Welcome Back</h2>

// //         <input
// //           type="email"
// //           placeholder="Email"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //           style={inputStyle}
// //         />

// //         <input
// //           type="password"
// //           placeholder="Password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           style={inputStyle}
// //         />

// //         <button onClick={handleLogin} style={buttonStyle}>
// //           {loading ? "Logging in..." : "Login"}
// //         </button>

// //         <p style={{ marginTop: "10px", color: "#aaa" }}>
// //           Don’t have an account?{" "}
// //           <a href="/signup" style={{ color: "#38bdf8" }}>
// //             Signup
// //           </a>
// //         </p>
// //         <p style={{ color: "#aaa", cursor: "pointer", marginBottom: "10px" }}
// //           onClick={() => setShowReset(true)}>
// //           Forgot Password?
// //         </p>
// //       </div>
// //     </div>
// //   )
// // }

// // /* reuse same styles */
// // const pageStyle = {
// //   minHeight: "100vh",
// //   display: "flex",
// //   justifyContent: "center",
// //   alignItems: "center",
// //   background: "linear-gradient(135deg, #0f172a, #020617)",
// // }

// // const cardStyle = {
// //   background: "rgba(255,255,255,0.05)",
// //   padding: "30px",
// //   borderRadius: "12px",
// //   backdropFilter: "blur(10px)",
// //   width: "300px",
// //   textAlign: "center",
// //   color: "white",
// // }

// // const inputStyle = {
// //   width: "100%",
// //   padding: "10px",
// //   marginBottom: "10px",
// //   borderRadius: "6px",
// //   border: "none",
// // }

// // const buttonStyle = {
// //   width: "100%",
// //   padding: "10px",
// //   background: "#38bdf8",
// //   border: "none",
// //   borderRadius: "6px",
// //   fontWeight: "bold",
// //   cursor: "pointer",
// // }

// "use client"

// import { useState } from "react"
// import { supabase } from "@/lib/supabaseClient"
// import { useRouter } from "next/navigation"

// export default function Login() {
//   const router = useRouter()

//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [loading, setLoading] = useState(false)

//   const [showReset, setShowReset] = useState(false)
//   const [resetEmail, setResetEmail] = useState("")
//   const [resetLoading, setResetLoading] = useState(false)

//   // 🔹 LOGIN
//   const handleLogin = async () => {
//     if (!email || !password) {
//       alert("Enter email and password")
//       return
//     }

//     setLoading(true)

//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     })

//     setLoading(false)

//     if (error) {
//       alert(error.message)
//     } else {
//       router.push("/dashboard")
//     }
//   }

//   // 🔹 RESET PASSWORD
//   const handleResetPassword = async () => {
//     if (!resetEmail) {
//       alert("Enter your email")
//       return
//     }

//     setResetLoading(true)

//     const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
//       redirectTo: "http://localhost:3000/update-password",
//     })

//     setResetLoading(false)

//     if (error) {
//       alert(error.message)
//     } else {
//       alert("Password reset email sent!")
//       setShowReset(false)
//       setResetEmail("")
//     }
//   }

//   return (
//     <div style={pageStyle}>
//       <div style={cardStyle}>
//         <h2 style={{ marginBottom: "20px" }}>Welcome Back</h2>

//         {/* LOGIN INPUTS */}
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           style={inputStyle}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           style={inputStyle}
//         />

//         <button onClick={handleLogin} style={buttonStyle}>
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         {/* FORGOT PASSWORD */}
//         <p
//           style={{ color: "#aaa", cursor: "pointer", marginTop: "10px" }}
//           onClick={() => setShowReset(!showReset)}
//         >
//           Forgot Password?
//         </p>

//         {/* RESET SECTION */}
//         {showReset && (
//           <div style={{ marginTop: "10px" }}>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={resetEmail}
//               onChange={(e) => setResetEmail(e.target.value)}
//               style={inputStyle}
//             />

//             <button onClick={handleResetPassword} style={buttonStyle}>
//               {resetLoading ? "Sending..." : "Send Reset Link"}
//             </button>
//           </div>
//         )}

//         {/* SIGNUP LINK */}
//         <p style={{ marginTop: "10px", color: "#aaa" }}>
//           Don’t have an account?{" "}
//           <a href="/signup" style={{ color: "#38bdf8" }}>
//             Signup
//           </a>
//         </p>
//       </div>
//     </div>
//   )
// }

// /* STYLES */
// const pageStyle = {
//   minHeight: "100vh",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   background: "linear-gradient(135deg, #0f172a, #020617)",
// }

// const cardStyle = {
//   background: "rgba(255,255,255,0.05)",
//   padding: "30px",
//   borderRadius: "12px",
//   backdropFilter: "blur(10px)",
//   width: "300px",
//   textAlign: "center",
//   color: "white",
// }

// const inputStyle = {
//   width: "100%",
//   padding: "10px",
//   marginBottom: "10px",
//   borderRadius: "6px",
//   border: "none",
// }

// const buttonStyle = {
//   width: "100%",
//   padding: "10px",
//   background: "#38bdf8",
//   border: "none",
//   borderRadius: "6px",
//   fontWeight: "bold",
//   cursor: "pointer",
// }

// -------------------------

// "use client"

// import { useState } from "react"
// import { supabase } from "@/lib/supabaseClient"
// import { useRouter } from "next/navigation"
// import Link from "next/link"

// export default function Login() {
//   const router = useRouter()

//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [loading, setLoading] = useState(false)

//   // 🔹 LOGIN
//   const handleLogin = async () => {
//     if (!email || !password) {
//       alert("Enter email and password")
//       return
//     }

//     setLoading(true)

//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     })

//     setLoading(false)

//     if (error) {
//       alert(error.message)
//     } else {
//       router.push("/dashboard")
//     }
//   }

//   return (
//     <div style={pageStyle}>
//       <div style={cardStyle}>
//         <h2 style={{ marginBottom: "20px" }}>Welcome Back</h2>

//         {/* EMAIL */}
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           style={inputStyle}
//         />

//         {/* PASSWORD */}
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           style={inputStyle}
//         />

//         {/* LOGIN BUTTON */}
//         <button onClick={handleLogin} style={buttonStyle}>
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         {/* FORGOT PASSWORD LINK */}
//         <p style={{ marginTop: "10px" }}>
//           <Link href="/forgot-password" style={{ color: "#38bdf8" }}>
//             Forgot Password?
//           </Link>
//         </p>

//         {/* SIGNUP */}
//         <p style={{ marginTop: "10px", color: "#aaa" }}>
//           Don’t have an account?{" "}
//           <Link href="/signup" style={{ color: "#38bdf8" }}>
//             Signup
//           </Link>
//         </p>
//       </div>
//     </div>
//   )
// }

// /* STYLES */
// const pageStyle = {
//   minHeight: "100vh",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   background: "linear-gradient(135deg, #0f172a, #020617)",
// }

// const cardStyle = {
//   background: "rgba(255,255,255,0.05)",
//   padding: "30px",
//   borderRadius: "12px",
//   backdropFilter: "blur(10px)",
//   width: "300px",
//   textAlign: "center",
//   color: "white",
// }

// const inputStyle = {
//   width: "100%",
//   padding: "10px",
//   marginBottom: "10px",
//   borderRadius: "6px",
//   border: "none",
// }

// const buttonStyle = {
//   width: "100%",
//   padding: "10px",
//   background: "#38bdf8",
//   border: "none",
//   borderRadius: "6px",
//   fontWeight: "bold",
//   cursor: "pointer",
// }



// ----------------------------
"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function Login() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) return alert("Fill all fields")

    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      alert(error.message)
    } else {
      router.push("/")
    }
  }

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>

      {/* 🔥 BLURRED BACKGROUND */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: "url('/green.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "blur(10px)",
        zIndex: -2
      }} />

      {/* 🔥 DARK OVERLAY */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.4)",
        zIndex: -1
      }} />

      {/* 🔥 CONTENT */}
      <div style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        zIndex: 1
      }}>

        <div style={cardStyle}>
          <h2 style={{ marginBottom: "20px" }}>Welcome Back</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          <button onClick={handleLogin} style={buttonStyle}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p style={{ marginTop: "10px", color: "#ccc" }}>
            Don’t have an account?{" "}
            <a href="/signup" style={{ color: "#38bdf8" }}>
              Signup
            </a>
          </p>
        </div>

      </div>
    </div>
  )
}


const cardStyle = {
  width: "340px",
  padding: "35px",
  borderRadius: "20px",
  background: "rgba(255, 255, 255, 0.08)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
  textAlign: "center",
  color: "white",
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "10px",
  background: "rgba(255,255,255,0.1)",
  border: "1px solid rgba(255,255,255,0.2)",
  color: "white",
  outline: "none",
}

const buttonStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "12px",
  border: "none",
  background: "linear-gradient(135deg, #38bdf8, #0ea5e9)",
  color: "white",
  fontWeight: "600",
  cursor: "pointer",
  marginTop: "10px",
  boxShadow: "0 0 20px rgba(56,189,248,0.4)"
}