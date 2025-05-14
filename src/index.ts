import express from "express";
import bookRoutes from "./routes/book.routes";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api/books", bookRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
