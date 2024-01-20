const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Product = require("../models/Product");

// ?Store item prices
/* 
    Pass: 
    {
        items: [{title, image, id, quantity, size}], 
        success_url, 
        cancel_url
    }
    */
var storeItems = {
  "65973e542916b94401cd546d": {
    // BURGER BLACK
    price: "price_1OaleaKfpXJO34jQVj3VF5Ub",
  },
  "6597405f2916b94401cd546e": {
    // BURGER WHITE
    price: "price_1OalfCKfpXJO34jQwKIMQTXP",
  },
  "659740b52916b94401cd546f": {
    // PIZZA BLACK
    price: "price_1OalfkKfpXJO34jQNdhyvL4I",
  },
  "659740cf2916b94401cd5470": {
    // PIZZA WHITE
    price: "price_1OalgTKfpXJO34jQBEchidfl",
  },
  "659741162916b94401cd5471": {
    // TACO BLACK
    price: "price_1Oalh0KfpXJO34jQ0hNwLJ78",
  },
  "659741352916b94401cd5472": {
    // TACO WHITE
    price: "price_1OalhNKfpXJO34jQLvT6CvXX",
  },
};

// !SENDS SESSIONID AND URL TO CHECKOUT CART
router.post("/create-checkout-session", async (req, res) => {
  try {
    const { items, success_url, cancel_url } = req.body;

    const line_items = items.map((item) => {
      if (!storeItems[item.id]) {
        throw new Error(`Invalid product ID: ${item.id}`);
      }

      return {
        price: storeItems[item.id].price,
        quantity: item.quantity,
        // description: `${item.size}`,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "cashapp"],
      mode: "payment",
      // billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      line_items: line_items,
      success_url: `${success_url}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancel_url,
    });

    res.json({ url: session.url, sessionId: session.id });
  } catch (err) {
    console.log("Create checkout sesssion error:", err);
    res.status(500).json({ err: `Create checkout session error: ${err}` });
  }
});

// !CHECK SESSION STATUS
router.get("/session/status/:sessionId", async (req, res) => {
  const { sessionId } = req.params;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    // const lineItems = session.line_items ? session.line_items?.data : [];
    // res.json({ payment_status: session, line_items: lineItems });
    res.json(session);
  } catch (err) {
    res.status(500).json({ err: `Internal Server Error: ${err}` });
  }
});

// !UPDATE MONGODB PRODUCT
router.post("/session/update/:sessionId", async (req, res) => {
  const { sessionId } = req.params;
  try {
    // Retrieve session details from Stripe
    const stripeSession = await stripe.checkout.sessions.retrieve(sessionId);

    // Extract the status from the Stripe session
    const stripeStatus = stripeSession.payment_status;

    const item = req.body.items;
    const updateMongoDBRes = await updateMongoDBProducts(item, stripeStatus);

    res.json(updateMongoDBRes);
  } catch (err) {
    res.status(500).json({ err: `Internal Server Error: ${err}` });
  }
});

async function updateMongoDBProducts(items, status) {
  try {
    if (status === "paid") {
      // console.log(items);
      for (const item of items) {
        const { id, quantity, size } = item;

        await Product.updateOne(
          { _id: id },
          { $inc: { [`quantity.${size}`]: -quantity } }
        );
      }

      return "Updated mongoDB";
    } else {
      // console.log("Item has not been paid for yet.");
      return "Item has not been paid for yet.";
    }
  } catch (err) {
    // console.error("Error updating MongoDB:", err);
    return `Internal Server Error: ${err.message}`;
  }
}

// ?MONGODB update data
// [{
//   id: "6597405f2916b94401cd546e",
//   image: "https://i.postimg.cc/prBVcr2k/Cute-burger-shirt.jpg",
//   price: "17.99",
//   quantity: 2,
//   size: "large",
//   title: "Burger shirt | white"
// }, {
//   id: "659740b52916b94401cd546f",
//   image: "https://i.postimg.cc/prBVcr2k/Cute-burger-shirt.jpg",
//   price: "17.99",
//   quantity: 3,
//   size: "large",
//   title: "Pizza shirt | black"
// }]

module.exports = router;
