import express from "express";
import dotenv from "dotenv";
import * as bodyParser from "body-parser";
import {
  addAccountMetadata,
  createUser,
  getAccountMetadata,
} from "./firebase-functions";
import { startEthPoller } from "./core";

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT;

app.listen(port, () => console.log(`Listening on ${port}`));

startEthPoller();

app.post("/user", async (req, res) => {
  await createUser(req.body.walletAddress);
  res.sendStatus(200);
});

app.post("/account/metadata", async (req, res) => {
  const userId = req.headers["user_id"];
  await addAccountMetadata(req.body, userId);
  res.sendStatus(200);
});

app.get("/account/metadata", async (req, res) => {
  const userId = req.headers["user_id"];
  const accountMetadata = await getAccountMetadata(userId);
  res.json(accountMetadata);
});
