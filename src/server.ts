import express from 'express';
import bookRoutes from './routes/book.routes';

const app = express();

// ✅ Required to parse JSON bodies
app.use(express.json());

app.use('/', bookRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
