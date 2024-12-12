const router = require("express").Router();
const Message = require("../models/Message");
const fetchuser = require("../middleware/fetchuser");

//add

router.post("/", fetchuser, async (req, res) => {
  const newMessage = new Message(req.body);
  // console.log("messeges request>>>>> ", req.body);
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get

router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
    //console.log('messages>>> ',messages)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/deleteAll", (req, res) => {
  try {
    Message.deleteMany({}).then(function (result) {
      // process result
    });
  } catch (err) {
    console.log(err);
  }
});
//update message received status
router.put("/update", async (req, res) => {
  try {
    const filter = { _id: req.body.messageId };
    const option = { $set: { isReceived: req.body.isReceived } };
    // console.log("id>>> ", req.body.messageId);
    //console.log("isReceived>>>", req.body.isReceived);
    const message = await Message.findOneAndUpdate(filter, option);
    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
module.exports = router;
