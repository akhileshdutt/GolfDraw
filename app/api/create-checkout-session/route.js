import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {
  const { plan } = await req.json()

  let price = 0

  if (plan === "1month") price = 49900
  if (plan === "6month") price = 249900
  if (plan === "12month") price = 399900

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `Golf Draw ${plan} subscription`,
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],

      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    })

    return Response.json({ url: session.url })
  } catch (err) {
    return Response.json({ error: err.message })
  }
}