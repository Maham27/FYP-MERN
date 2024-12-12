const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const stripe = require("stripe")(
  "sk_test_51KWmfGCB2vzWo8QidoZyR6U68aZ7mAKS3oDUkiR4A7IwfLDSvEvICXxhZVku13Rp4PTRqCRnJgE2LIPy4BfC2QIB00dAw8jM3C"
);
const router = express.Router();
// const uuid = require("uuid");
const { v4: uuidv4 } = require("uuid");
router.post("/", (req, res) => {
  console.log("req.body", req.body);
  const { product, token } = req.body;
  console.log("PRODUCT", product);
  console.log("PRICE", product.price);
  const idempontencyKey = uuidv4();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "pkr",
          customer: customer.id,
          receipt_email: token.email,
          description: `purchase of ${product.name}`,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        { idempontencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});

module.exports = router;
