const { getAllProducts } = require("../actions/productActions");
const { getImages } = require("../actions/imageActions");
const { createAction, deleteAction, readAction } = require("../CRUD/actions");
const express = require("express");

router.get("/products", async (req, res) => {
  const products = readAction("products", "id", "IS NOT NULL");
  const images = getImages();
  res.json({ products, images });
});
