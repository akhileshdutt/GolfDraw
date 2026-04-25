"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Sora } from "next/font/google"


const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"]
})

export default function Home() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
        const { data } = await supabase.auth.getUser()
        setUser(data.user)
      }

      getUser()

      const { data: listener } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setUser(session?.user || null)
        }
      )

      return () => {
        listener.subscription.unsubscribe()
      }
    }, [])

  const handleNavigation = async (path) => {
    if (!user) return router.push("/login")

    const { data: profile } = await supabase
      .from("profiles")
      .select("subscription_status")
      .eq("id", user.id)
      .single()

    if (!profile || profile.subscription_status !== "active") {
      return router.push("/subscribe")
    }

    router.push(path)
  }

  const handleLogout = async () => {
      let userName = "User"

      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("name")
          .eq("id", user.id)
          .single()

        if (data?.name) userName = data.name
      }

      await supabase.auth.signOut()
      setUser(null)

      alert(`Goodbye, ${userName}!`)

      router.push("/")
}

  const features = [
  "Access to all premium features",
  "Participate in monthly prize draws",
  "Track last 5 scores",
  "Performance insights",
  "Priority entry in draws",
  "Secure data storage",
  "Charity contribution included",
  "Early access to features"
]

const pricingGrid = {
  display: "grid",
  // gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "30px",
  marginTop: "60px"
}

const priceCard = {
  padding: "40px 30px",   // 🔥 more vertical space
  borderRadius: "25px",
  minHeight: "520px",     // 🔥 forces taller cards
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

  background: "linear-gradient(145deg, rgba(16,185,129,0.1), rgba(0,0,0,0.6))",
  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(14px)",
}

const selectBtn = {
  marginTop: "20px",
  width: "100%",
  padding: "12px",
  borderRadius: "25px",
  border: "none",
  background: "linear-gradient(135deg, #67e8f9, #38bdf8)",
  color: "black",
  fontWeight: "600",
  cursor: "pointer"
}

const badge = {
  position: "absolute",
  top: "-12px",
  left: "50%",
  transform: "translateX(-50%)",
  background: "#22c55e",
  color: "black",
  padding: "5px 12px",
  borderRadius: "20px",
  fontSize: "12px"
}

const handleCheckout = async (plan) => {
  const res = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ plan }),
  })

  const data = await res.json()

  if (data.url) {
    window.location.href = data.url
  } else {
    alert("Payment failed")
  }
}
const handleFeatureAccess = async (path) => {
  // ❌ Not logged in
  if (!user) {
    alert("Please login first")
    router.push("/login")
    return
  }

  // 🔍 Check subscription
  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_status")
    .eq("id", user.id)
    .single()

  // ❌ Not premium
  if (!profile || profile.subscription_status !== "active") {
    alert("Upgrade to premium to access this feature")
    document.getElementById("pricing")?.scrollIntoView({
  behavior: "smooth"
})
    return
  }

  // ✅ Allowed
  router.push(path)
}

// -----------------------------------------------------------------------------------------------------------

  return (
    <div style={{
      minHeight: "100vh",
      background: `
        linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)),
        url('/dash.jpg')
      `,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      color: "white",
      padding: "20px"
    }}>

      {/* NAVBAR */}
      <div style={{
  position: "fixed",
  top: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "100%",
  maxWidth: "1200px",
  zIndex: 1000
}}>
  <div style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "3px 20px",
    borderRadius: "20px",
    background: "rgba(255, 255, 255, 0)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(14px)",
    boxShadow: "0 0 20px rgba(0,255,150,0.15)"
  }}>

    {/* LEFT: LOGO */}
    <div
  onClick={() => router.push("/")}
  style={{
    display: "flex",
    alignItems: "center",
    gap: "1px",
    cursor: "pointer"
  }}
>
  {/* FIXED BOX */}
  <div 
  onClick={() => window.location.href = "/"}style={{
    width: "50px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden" 
  }}>
    <img
      src="/logo.png"
      alt="logo"
      style={{
        maxWidth: "100%",
        maxHeight: "100%",
        objectFit: "contain"
      }}
    />
  </div>

  <span 
  onClick={() => window.location.href = "/"}style={{
    fontSize: "18px",
    fontWeight: "500"
  }}>
    Golf<span style={{ color: "#4ade80" }}>Draw</span>
  </span>
</div>

    {/* CENTER LINKS */}
    <div style={{
      display: "flex",
      gap: "30px",
      color: "#94a3b8",
      fontSize: "14px"
    }}>
      <span
        style={navLink}
        onClick={() => {
          document.getElementById("features")?.scrollIntoView({
            behavior: "smooth"
          })
        }}
      >
        Features
      </span>

      <span
          style={navLink}
          onClick={() => {
            document.getElementById("pricing")?.scrollIntoView({
              behavior: "smooth"
            })
          }}
        >
          Pricing
      </span>

      <span
      style={navLink}
      onClick={() => {
        document.getElementById("charity")?.scrollIntoView({
          behavior: "smooth"
          })
        }}
      >
        Charity
      </span>
    </div>

    {/* RIGHT */}
    <div style={{
  display: "flex",
  alignItems: "center",
  gap: "10px"
}}>
  {user ? (
    // ✅ LOGOUT BUTTON
    <span
      onClick={handleLogout}
      style={{
        padding: "6px 14px",
        borderRadius: "12px",
        background: "rgba(255,255,255,0.1)",
        color: "white",
        fontWeight: "500",
        cursor: "pointer",
        transition: "0.2s"
      }}
      onMouseEnter={(e) => {
        e.target.style.background = "rgba(255,255,255,0.2)"
      }}
      onMouseLeave={(e) => {
        e.target.style.background = "rgba(255,255,255,0.1)"
      }}
    >
      Logout
    </span>
  ) : (
    // ❌ LOGIN + SIGNUP
    <>
      <Link
        href="/login"
        style={{
          textDecoration: "none",
          color: "#94a3b8",
          padding: "6px 10px",
          borderRadius: "8px",
          transition: "0.2s"
        }}
        onMouseEnter={(e) => {
          e.target.style.color = "#fff"
          e.target.style.background = "rgba(255,255,255,0.05)"
        }}
        onMouseLeave={(e) => {
          e.target.style.color = "#94a3b8"
          e.target.style.background = "transparent"
        }}
      >
        Login
      </Link>

      <Link href="/signup" style={{ textDecoration: "none" }}>
        <span style={{
          padding: "6px 14px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #67e8f9, #e0f2fe)",
          color: "black",
          fontWeight: "600"
        }}>
          Sign up
        </span>
      </Link>
    </>
  )}
</div>

  </div>
</div>
<div style={{
  display: "flex",
  justifyContent: "center",
  marginTop: "90px" // adjust based on navbar height
}}>
  <div style={{
    topmargin: "20px",
    padding: "8px 18px",
    borderRadius: "30px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.15)",
    backdropFilter: "blur(12px)",
    color: "#cbd5f5",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: "0 0 20px rgba(0,255,150,0.1)"
  }}>
    
    <span style={{ color: "#4ade80" }}>✨</span>

    Stableford scoring · Monthly draws · Charity built-in

  </div>
</div>

      {/* HERO */}
      <section style={hero}>
        <h1 style={heroTitle}>
          Win While You <br />
          <span style={{ color: "#4ade80" }}>Play Golf</span>
        </h1>

        <p style={heroText}>
          Track your last 5 Stableford scores, enter exclusive monthly prize draws, and turn every round into giving - 10% of every subscription goes to charity.
        </p>

        <div style={{ marginTop: "30px" }}>
          <button onClick={() => handleNavigation("/dashboard")} style={primaryBtn}>
            Get Started →
          </button>
          <button
    onClick={() => {
      document.getElementById("pricing")?.scrollIntoView({
        behavior: "smooth"
      })
    }}
    style={secondaryBtn}
  >
    View Pricing
  </button>
        </div>
      </section>
      <section style={{
  marginTop: "50px",
  display: "flex",
  justifyContent: "center"
}}>
  <div style={{
    display: "flex",
    gap: "60px",
    color: "#cbd5f5",
    fontSize: "16px",
    textAlign: "center"
  }}>

    <div>
      <strong style={statNumber}>12,000+</strong>
      <p style={statLabel}>golfers</p>
    </div>

    <div>
      <strong style={statNumber}>₹4.2L</strong>
      <p style={statLabel}>donated</p>
    </div>

    <div>
      <strong style={statNumber}>240+</strong>
      <p style={statLabel}>monthly winners</p>
    </div>

  </div>
</section>
<section style={{
  marginTop: "80px",
  textAlign: "center"
}}>

  {/* small label */}
  <p style={{
    color: "#4ade80",
    letterSpacing: "3px",
    fontSize: "22px",
    marginBottom: "5px"
  }}>
    BUILT FOR GOLFERS
  </p>

  {/* main heading */}
  <h2 style={{
    fontSize: "clamp(25px, 5vw, 49px)",
    fontWeight: "600",
    lineHeight: "1.2",
    maxWidth: "1100px",
    margin: "0 auto",
    color: "#e5e7eb"
  }}>
    Everything you need, nothing you don't
  </h2>

</section>

      {/* FEATURES */}
      <section id="features" style={{...grid, scrollMarginTop: "120px"}}>

  {/* CARD 1 */}
  <div style={cardStyle}
  onClick={() => handleFeatureAccess("/track-scores")}
  onMouseEnter={(e) => {
  e.currentTarget.style.transform = "translateY(-6px)"
}}
onMouseLeave={(e) => {
  e.currentTarget.style.transform = "translateY(0)"
}}>
    <div style={iconBox}>📈</div>

    <h3 style={cardTitle}>Track Scores</h3>
    <p style={cardText}>
      Log and analyze your last 5 Stableford rounds with smart performance insights.
    </p>
  </div>

  {/* CARD 2 */}
  <div style={cardStyle}
  onClick={() => handleFeatureAccess("/dashboard")}
onMouseLeave={(e) => {
  e.currentTarget.style.transform = "translateY(0)"
}}>
    <div style={iconBox}>🏆</div>

    <h3 style={cardTitle}>Monthly Draws</h3>
    <p style={cardText}>
      Every active subscriber is auto-entered into our exclusive monthly prize pool.
    </p>
  </div>

  {/* CARD 3 */}
  <div style={cardStyle}
  onClick={() => router.push("charity")}
  onMouseEnter={(e) => {
  e.currentTarget.style.transform = "translateY(-6px)"
}}
onMouseLeave={(e) => {
  e.currentTarget.style.transform = "translateY(0)"
}}>
    <div style={iconBox}>❤️</div>

    <h3 style={cardTitle}>Support Charity</h3>
    <p style={cardText}>
      10% of your subscription goes directly to the charity of your choice.
    </p>
  </div>

</section>
<section id="charity" style={{
  marginTop: "200px",
  display: "flex",
  justifyContent: "center",
  marginBottom: "160px",
  scrollMarginTop: "120px"
}}>

  <div style={{
    maxWidth: "950px",
    width: "100%",
    padding: "60px 60px",
    borderRadius: "30px",

    // 🔥 gradient glass background
    background: "radial-gradient(circle at center, rgba(16,185,129,0.25), rgba(0,0,0,0.6))",

    border: "1px solid rgba(255,255,255,0.1)",
    backdropFilter: "blur(20px)",
    textAlign: "center",
    color: "white"
  }}>

    {/* ICON */}
    <div style={{
      width: "60px",
      height: "60px",
      margin: "0 auto 20px",
      borderRadius: "20px",
      background: "linear-gradient(135deg, #10b981, #34d399)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "24px",
      boxShadow: "0 0 30px rgba(16,185,129,0.5)"
    }}>
      ❤️
    </div>

    {/* MAIN TEXT */}
    <h2 style={{
      fontSize: "clamp(28px, 5vw, 48px)",
      fontWeight: "700",
      lineHeight: "1.2",
      marginBottom: "50px"
    }}>
      <span style={{ color: "#4ade80" }}>10%</span> of your subscription <br />
      goes to the charity of your choice
    </h2>


    {/* SUBTEXT */}
    <p style={{
      color: "#94a3b8",
      fontSize: "16px",
      lineHeight: "1.6",
      maxWidth: "600px",
      margin: "50px auto" 
    }}>
      Play the game you love, support the causes you care about. 
      Transparent giving, every single month.
    </p>

  </div>

</section>

      {/* WHY SECTION */}
      {/* <section style={{ textAlign: "center", marginTop: "80px" }}>
        <p style={{ color: "#4ade80" }}>WHY GOLFDRAW</p>
        <h2 style={{ fontSize: "40px" }}>Built on principles that matter</h2>

        <div style={grid}>
          <div style={card}>Fair Play System</div>
          <div style={card}>Performance Tracking</div>
          <div style={card}>Give Back to Society</div>
        </div>
      </section> */}

      {/* PRICING */}
      <section id="pricing" style={{ textAlign: "center", marginTop: "100px" }}>
        <p style={{ color: "#4ade80", fontSize: "21px" }}>PRICING</p>
        <h2 style={{ fontSize: "60px" }}>Choose your plan</h2>
        <p style={{
          textAlign: "center",
          color: "#94a3b8",
          fontSize: "20px",
          maxWidth: "600px",
          margin: "0 auto 40px",
          lineHeight: "1.6"
        }}>
          Same premium benefits across all plans. Pick the duration that fits your game.
        </p>

      </section>
      <section id="pricing" style={{ marginTop: "100px", padding: "20px" }}>

  <h2 style={{ textAlign: "center", fontSize: "36px" }}>
    Choose your plan
  </h2>

  <p style={{
    textAlign: "center",
    color: "#94a3b8",
    marginBottom: "40px"
  }}>
    Same premium benefits across all plans. Pick the duration that fits your game.
  </p>

  <div style={pricingGrid}>

    {/* 1 MONTH */}
    <div style={priceCard}>
      <h3>1 Month Plan</h3>
      <h2 style={price}>₹499</h2>
      <p style={{
  color: "#94a3b8",
  marginBottom: "20px",
  fontSize: "12px"
}}>
  per month
</p>

      {features.map((f, i) => (
        <p key={i}>✔ {f}</p>
      ))}

      <button
        style={selectBtn}
        onClick={() => {
        if (!user) {
          alert("Please login first")
          router.push("/login")
          return
        }

        handleCheckout("1month")
      }}
>
  Select
</button>
    </div>

    {/* 6 MONTH */}
    <div style={{ ...priceCard, transform: "scale(1.09)" }}>
      <div style={badge}>Most popular</div>

      <h3>6 Months Plan</h3>
      <h2 style={price}>₹2,499</h2>
      <p style={{
  color: "#94a3b8",
  marginBottom: "20px",
  fontSize: "12px"
}}>
  for 6 months
</p>

      {features.map((f, i) => (
        <p key={i}>✔ {f}</p>
      ))}

      <button
  style={selectBtn}
  onClick={() => {
    if (!user) {
      alert("Please login first")
      router.push("/login")
      return
    }
    handleCheckout("6month")
  }}
>
  Select
</button>
    </div>

    {/* 12 MONTH */}
    <div style={priceCard}>
      <h3>12 Months Plan</h3>
      <h2 style={price}>₹3,999</h2>
      <p style={{
  color: "#94a3b8",
  marginBottom: "20px",
  fontSize: "12px"
}}>
  for 12 months
</p>

      {features.map((f, i) => (
        <p key={i}>✔ {f}</p>
      ))}

      <button
  style={selectBtn}
  onClick={() => {
    if (!user) {
      alert("Please login first")
      router.push("/login")
      return
    }
    handleCheckout("12month")
  }}
>
  Select
</button>
    </div>

  </div>

</section>
    </div>
  )
}

/* STYLES */

const navLink = {
  cursor: "pointer",
  transition: "0.2s"
}

const loginBtn = {
  background: "transparent",
  border: "none",
  color: "#cbd5f5",
  fontSize: "13px",
  padding: "6px 10px",
  cursor: "pointer"
}

const signupBtn = {
  background: "linear-gradient(135deg, #67e8f9, #e0f2fe)",
  color: "#000",
  border: "none",
  borderRadius: "12px",
  padding: "6px 14px",
  fontSize: "13px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "0.2s"
}

// const logoutBtn = {
//   padding: "8px 18px",
//   borderRadius: "20px",
//   background: "transparent",
//   border: "1px solid rgba(255,255,255,0.3)",
//   color: "white",
//   cursor: "pointer"
// }

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "40px"
}

const logoStyle = {
  display: "flex",
  alignItems: "center",
  gap: "0px",
  cursor: "pointer"
}

const hero = {
  textAlign: "center",
  padding: "40px 20px"
  
}

const heroTitle = {
  fontSize: "100px",
  fontWeight: "700",
  lineHeight: "1.05",
  letterSpacing: "-1px",
}

const heroText = {
  marginTop: "40px",
  color: "#94a3b8",
  fontSize: "20px",
  maxWidth: "600px",
  marginLeft: "auto",
  marginRight: "auto"
}
const primaryBtn = {
  padding: "16px 32px",              // 🔥 bigger size
  borderRadius: "30px",
  border: "none",
  fontSize: "18px",                  // 🔥 bigger text
  fontWeight: "600",
  background: "linear-gradient(135deg, #67e8f9, #38bdf8)",
  color: "black",
  cursor: "pointer",

  // 🔥 glow effect
  boxShadow: "0 0 20px rgba(56,189,248,0.6)",

  transition: "all 0.3s ease"
}
const secondaryBtn = {
  padding: "12px 25px",
  borderRadius: "15px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.2)",
  color: "white",
  cursor: "pointer",
  backdropFilter: "blur(5px)",
  marginLeft: "15px",
  transition: "0.3s"
}


const statNumber = {
  fontSize: "14px",
  fontWeight: "700",
  color: "white"
}

const statLabel = {
  margin: 0,
  fontSize: "14px",
  color: "#94a3b8"
}

const cardStyle = {
  padding: "30px",
  borderRadius: "20px",

  // 🔥 gradient glass background
  background: "linear-gradient(145deg, rgba(16,185,129,0.1), rgba(0,0,0,0.4))",

  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(14px)",

  transition: "all 0.3s ease",
  cursor: "pointer"
}

const iconBox = {
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  background: "rgba(16,185,129,0.15)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
  marginBottom: "15px",
  boxShadow: "0 0 20px rgba(16,185,129,0.3)"
}

const cardTitle = {
  fontSize: "20px",
  fontWeight: "600",
  marginBottom: "10px"
}

const cardText = {
  color: "#94a3b8",
  lineHeight: "1.6",
  fontSize: "15px"
}
const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  marginTop: "40px"
}

const card = {
  padding: "20px",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.05)"
}

const planCard = {
  padding: "25px",
  borderRadius: "16px",
  background: "rgba(255,255,255,0.05)"
}

const priceStyle = {
  color: "#38bdf8",
  fontSize: "30px"
}

const price = {
  fontSize: "45px",   // 🔥 increase this (try 64–80)
  fontWeight: "800",
  margin: "-5px 0",
  letterSpacing: "-1px"
}

const listStyle = {
  listStyle: "none",
  padding: 0,
  lineHeight: "2"
}

const btnStyle = {
  width: "100%",
  padding: "10px",
  background: "#38bdf8",
  color: "black",
  border: "none",
  borderRadius: "8px"
}



const charityBox = {
  padding: "60px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.05)",
  textAlign: "center",
  maxWidth: "800px"
}