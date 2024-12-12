const router = require("express").Router();
const Conversation = require("../models/Conversation");
const fetchuser = require("../middleware/fetchuser");

//new conv

router.post("/", fetchuser, async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
    membersNames: [req.body.senderName, req.body.receiverName],
    membersData: [req.body.sender, req.body.receiver],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/create/:senderId/:receiverId", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.params.senderId, req.params.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    //console.log("conversations>>> ", conversation);
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update conversation update date
router.put("/update", fetchuser, async (req, res) => {
  try {
    const filter = { _id: req.body.conversationId };
    const option = { $set: { updatedAt: new Date() } };
    //console.log("id>>> ", req.body.conversationId);
    //console.log("updatedAt", new Date());
    const conversation = await Conversation.findOneAndUpdate(filter, option);
    return res.status(200).json(conversation);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
router.delete("/delete/:conversationId", (req, res) => {
  try {
    Conversation.deleteOne({
      _id: req.params.conversationId,
    }).then(function (result) {
      // process result
    });
  } catch (err) {
    console.log(err);
  }
});
router.delete("/deleteAll", (req, res) => {
  try {
    Conversation.deleteMany({}).then(function (result) {
      // process result
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
