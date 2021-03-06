const express = require("express")
const app = express()
require("dotenv").config()
const Stripe = require("stripe")
const stripe = Stripe("sk_test_51LCeVVH2g5fObnyUIdJeaiNckcvlVFFIfVbwu2qxnWotdea9u6FWEzxsE83rlIqzX1yx4VcIJBrq5nArRdlLUQBc00SqqEClM1")
const bodyParser = require("body-parser")
const cors = require("cors")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

app.post("/payment", cors(), async (req, res) => {
	let { amount, id,description } = req.body
	console.log('amount in backedn', amount)
	try {
		const payment = await stripe.paymentIntents.create({
			amount:amount*100,
			currency: "USD",
			description: description,
			payment_method: id,
			confirm: true
		})
		console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error IN backedn", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})

app.listen(process.env.PORT || 4000, () => {
	console.log("Sever is listening on port 4000")
})
