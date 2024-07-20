var express = require("express");
var router = express.Router();
const {
  r34_random,
  r34_search,
  safe_random,
  safe_search,
  xbooru_random,
  xbooru_search,
  hypno_random,
  hypno_search,
  real_random,
  real_search,
} = require("r34-module");

/* GET home page. */
router.get("/r34", async (req, res, next) => {
  let pics, comment;
  if (req.query.search) {
    const search = req.query.search.trim().replace(" ", "_");
    pics = await r34_search({ search_tag: search });
    comment = `Search results for ${search}`;
  } else {
    pics = await r34_random();
  }
  res.render("sites/index", { pics, comment });
});

router.get("/xbooru", async (req, res, next) => {
  let pics, comment;
  if (req.query.search) {
    const search = req.query.search.trim().replace(" ", "_");
    comment = `Search results for ${search}`;
    pics = await xbooru_search({ search_tag: search });
  } else {
    pics = await xbooru_random();
  }

  if (pics.length <= 0) {
    pics = await xbooru_random();
  }

  res.render("sites/index", { pics, comment });
});

router.get("/hypnohub", async (req, res, next) => {
  let pics, comment;
  if (req.query.search) {
    const search = req.query.search.trim().replace(" ", "_");
    comment = `Search results for ${search}`;
    pics = await hypno_search({ search_tag: search });
  } else {
    pics = await hypno_random();
  }

  if (pics.length <= 0) {
    pics = await hypno_random();
  }
  res.render("sites/index", { pics, comment });
});

router.get("/safebooru", async (req, res, next) => {
  let pics, comment;
  if (req.query.search) {
    const search = req.query.search.trim().replace(" ", "_");
    comment = `Search results for ${search}`;
    pics = await safe_search({ search_tag: search });
  } else {
    pics = await safe_random();
  }

  if (pics.length <= 0) {
    pics = await safe_random();
  }

  res.render("sites/index", { pics, comment });
});

router.get("/realbooru", async (req, res, next) => {
  let pics, comment;
  if (req.query.search) {
    const search = req.query.search.trim().replace(" ", "_");
    comment = `Search results for ${search}`;
    pics = await real_search({ search_tag: search });
  } else {
    pics = await real_random();
  }
  res.render("sites/realbooru", { pics, comment });
});

module.exports = router;
