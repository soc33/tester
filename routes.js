const passport = require("passport");
const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("./models");
var isAuthenticated = require("./config/middleware/isAuthenticated");

router.post("/api/register", function(req, res) {
  console.log("registering user");
  db.User.register(
    new db.User({ username: req.body.username, email: req.body.email }),
    req.body.password,
    function(err, user) {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      passport.authenticate("local")(req, res, function(data) {
        res.json(req.user);
      });
    }
  );
});

router.post("/api/login", function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json(info);
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.json(user);
    });
  })(req, res, next);
});

router.get("/api/authorized", isAuthenticated, function(req, res) {
  res.json(req.user);
});

router.get("/api/logout", function(req, res) {
  req.logout();
  res.json({ message: "logged out" });
});

router.get("/api/user", function(req, res) {
  if (req.query.username) {
    db.User.find({ username: req.query.username })
      .then(result => {
        res.json({ length: result.length });
      })
      .catch(err => res.status(422).json(err));
  } else {
    res.json({ message: "no username entered for query" });
  }
});

router.get("/api/menu", function(req, res) {
  db.MenuItem.find({}, null, { sort: { position: 1 } })
    .then(result => res.json(result))
    .catch(err => res.status(422).json(err));
});

router.post("/api/menu", function(req, res) {
  db.MenuItem.updateMany(
    { position: { $gte: req.body.position } },
    { $inc: { position: 1 } }
  )
    .then(result => {
      db.MenuItem.create(req.body)
        .then(result => res.json(result))
        .catch(err => res.status(422).json(err));
    })
    .catch(err => res.status(422).json(err));
});

router.put("/api/menu", function(req, res) {
  let where = {};
  let set = {};
  const op = req.body.oldPosition;
  const np = req.body.data.position;

  if (op > np) {
    where.position = { $lt: op, $gte: np };
    set.$inc = { position: 1 };
  } else if (op < np) {
    where.position = { $gt: op, $lte: np };
    set.$inc = { position: -1 };
  }

  db.MenuItem.updateMany(where, set)
    .then(result => {
      db.MenuItem.findOneAndUpdate({ _id: req.body.id }, req.body.data)
        .then(result => res.json(result))
        .catch(err => res.status(422).json(err));
    })
    .catch(err => res.status(422).json(err));
});

router.delete("/api/menu", function(req, res) {
  Promise.all([
    db.MenuItem.updateMany(
      { position: { $gte: req.body.position } },
      { $inc: { position: -1 } }
    ),
    db.Resource.updateMany(
      { menu_item_id: req.body.id },
      { $unset: { menu_item_id: "" } }
    )
  ])
    .then(result => {
      db.MenuItem.findOneAndDelete({ _id: req.body.id })
        .then(result => res.json(result))
        .catch(err => res.status(422).json(err));
    })
    .catch(err => res.status(422).json(err));
});

router.get("/api/resource/:id", function(req, res) {
  //noid is used when the AdminResources page loads all resources
  //id is provided when a menu item is clicked from the main page
  const where = req.params.id != "noid" ? { menu_item_id: req.params.id } : {};
  const sort =
    req.params.id != "noid" ? { sort: { likes: -1 } } : { sort: { title: 1 } };
  db.Resource.find(where, null, sort)
    .populate("menu_item_id")
    .then(result => res.json(result))
    .catch(err => res.status(422).json(err));
});

router.get("/api/search", function(req, res) {
  if (req.query.tags) {
    //replace all non-alphanumeric characters with spaces
    //split string at spaces into array
    //filter out any empty strings from array
    //filter out any duplicate words
    let tags = req.query.tags
      .replace(/\W/g, " ")
      .split(" ")
      .filter(el => el !== "");
    tags = tags.filter((el, index) => tags.indexOf(el) >= index);

    db.Resource.find({ tags: { $in: tags } }, null, {sort: { likes: -1 }})
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  }
});

router.post("/api/resource", function(req, res) {
  db.Resource.create(req.body)
    .then(result => res.json(result))
    .catch(err => res.status(422).json(err));
});

router.put("/api/resource", function(req, res) {
  console.log(req.body.data.menu_item_id);
  db.Resource.findOneAndUpdate({ _id: req.body.id }, req.body.data)
    .then(result => res.json(result))
    .catch(err => res.status(422).json(err));
});

router.put("/api/resource/clicked", isAuthenticated, function(req, res) {
  db.User.findOneAndUpdate(
    { _id: req.user._id },
    { $addToSet: { clicks: req.body.id } }
  )
    .then(result => {
      res.json(result);
    })
    .catch(err => res.status(422).json(err));
});

router.put("/api/resource/favorite", isAuthenticated, function(req, res) {
  const set = req.body.selected
    ? { $pull: { favorites: req.body.id } }
    : { $addToSet: { favorites: req.body.id } };
  db.User.findOneAndUpdate({ _id: req.user._id }, set)
    .then(result => {
      res.json(result);
    })
    .catch(err => res.status(422).json(err));
});

router.put("/api/resource/like", isAuthenticated, function(req, res) {
  const set = req.body.selected
    ? { $pull: { likes: req.body.id } }
    : { $addToSet: { likes: req.body.id } };
  const inc = req.body.selected ? -1 : 1;
  Promise.all([
    db.User.findOneAndUpdate({ _id: req.user._id }, set),
    db.Resource.findOneAndUpdate({ _id: req.body.id }, { $inc: { likes: inc } })
  ])
    .then(result => {
      res.json(result);
    })
    .catch(err => res.status(422).json(err));
});

router.delete("/api/resource", isAuthenticated, function(req, res) {
  db.Resource.findOneAndDelete({ _id: req.body.id })
    .then(result => res.json(result))
    .catch(err => res.status(422).json(err));
});

router.get("/api/favorites", isAuthenticated, function(req, res) {
  db.User.find({ _id: req.user._id })
    .populate("favorites")
    .then(result => res.json(result))
    .catch(err => res.status(422).json(err));
});

router.get("/api/messages", isAuthenticated, function(req, res) {
  db.Message.find({archived: false }, null, { sort: { created: -1 } })
    .populate("user")
    .then(result => res.json(result))
    .catch(err => res.status(422).json(err));
});

router.post("/api/message", isAuthenticated, function(req, res) {
  db.Message.create({
    user: req.user._id,
    subject: req.body.subject,
    path: req.body.path,
    content: req.body.content,
    contact: req.body.contact
  })
    .then(result => res.json(result))
    .catch(err => res.status(422).json(err));
});

router.put("/api/message/:id", isAuthenticated, function(req, res) {
  db.Message.findOneAndUpdate({ _id: req.params.id }, { archived: true })
    .then(result => res.json(result))
    .catch(err => res.status(422).json(err));
});

router.delete("/api/message/:id", isAuthenticated, function(req, res) {
  db.Message.findOneAndDelete({ _id: req.params.id })
    .then(result => res.json(result))
    .catch(err => res.status(422).json(err));
});

// If no API routes are hit, send the React app
router.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

module.exports = router;
