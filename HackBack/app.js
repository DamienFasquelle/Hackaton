const express = require("express");
const app = express();
const cors = require("cors");
// const sequelize = require("./Db/sequelize");
const morgan = require("morgan");
const port = 3000;
const path = require("path");

// sequelize.initDataBase();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const userRouter = require("./routes/userRouter");
const pictureRouter = require("./routes/pictureRouter");
const CGURouter = require("./routes/CGURouter");

app.use("/files", express.static(path.join(__dirname, "files")));

app.use("/api/picture", pictureRouter);
app.use("/api/CGU", CGURouter);
app.use("/api", userRouter);

app.use((req, res) => {
  res.status(404).json({ message: `L'url demandé n'existe pas.` });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
