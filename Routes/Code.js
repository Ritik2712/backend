const router = require("express").Router();
let Code = require("../Modals/code.modal");
const ObjectId = require("mongodb").ObjectId;
const { authUSer } = require("../middleWare/authUser");

router.post("/add", [authUSer], (req, res) => {
  const code = {
    creator: req.user.username,
    html: req.body.html,
    css: req.body.css,
    js: req.body.js,
    name: req.body.name,
    public: req.body.public,
    created: new Date(req.body.created),
    modified: new Date(req.body.created),
    size: req.body.size,
  };
  const newCode = new Code(code);
  console.log(newCode);
  newCode
    .save()
    .then(() => res.json("Code added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.put("/update", [authUSer], async (req, res) => {
  const code = {
    html: req.body.html,
    css: req.body.css,
    js: req.body.js,
    modified: new Date(req.body.modified),
    size: req.body.size,
  };
  try {
    const updatedCode = await Code.updateOne(
      { name: req.body.name, creator: req.user.username },
      { $set: code }
    );
    console.log(updatedCode);
    const x = await Code.find({
      creator: req.user.username,
      name: req.body.name,
    });
    res.send("code Updated");
  } catch (e) {
    res.status(400).json("Error: " + e);
  }
});

router.get("/public", async (req, res) => {
  try {
    const x = await Code.find({ public: true });
    res.status(200).json(x);
  } catch (e) {
    return res.json(`Error: ${e}`);
  }
});

router.get("/getPublic", async (req, res) => {
  try {
    const x = await Code.findOne({
      creator: req.query.username,
      name: req.query.name,
    });
    res.status(200).json(x);
  } catch (e) {
    return res.json(`Error: ${e}`);
  }
});

router.get("/", [authUSer], async (req, res) => {
  try {
    const x = await Code.find({ creator: req.user.username });
    res.status(200).json(x);
  } catch (e) {
    return res.json(`Error: ${e}`);
  }
});

router.get("/getCode", [authUSer], async (req, res) => {
  try {
    const x = await Code.findOne({
      creator: req.user.username,
      name: req.query.name,
    });
    console.log(x);
    if (x === null) {
      return res.status(404).json("code not found");
    }
    res.status(200).json(x);
  } catch (e) {
    return res.json(`Error: ${e}`);
  }
});

router.delete("/delete", [authUSer], async (req, res) => {
  try {
    const x = await Code.deleteOne({
      creator: req.user.username,
      name: req.body.name,
    });
    console.log(x);
    res.send("code deleted");
  } catch (e) {
    res.status(400).json("Bad request");
  }
});

module.exports = router;
