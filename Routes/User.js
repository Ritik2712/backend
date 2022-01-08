const router = require("express").Router();
let User = require("../Modals/user.modal");
const jwt = require("jsonwebtoken");

router.route("/add").post((req, res) => {
  const username = { username: req.body.username, password: req.body.password };
  const newUser = new User(username);
  const TOKEN = jwt.sign({ ...username, _id: newUser }, process.env.SECRET_KEY);
  console.log(process.env.SECRET_KEY, newUser, TOKEN);
  newUser
    .save()
    .then(() => res.json({ username: req.body.username, token: TOKEN }))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/signup").post(async (req, res) => {
  try {
    console.log(req.body);
    const x = await User.findOne({ username: req.body.username });
    if (x === null) {
      return res.json("user not found");
    } else {
      if (x.password === req.body.password) {
        const TOKEN = jwt.sign(
          {
            username: req.body.username,
            password: req.body.password,
            _id: x._id,
          },
          process.env.SECRET_KEY
        );
        res.json({ username: req.body.username, token: TOKEN });
      } else {
        return res.json("wrong password");
      }
    }
  } catch (e) {
    return res.json("user not belong");
  }
});

module.exports = router;
