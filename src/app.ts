import express from 'express';
import bookRoutes from './routes/book.routes';
import { logger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware
app.use(express.json());
app.use(logger);

// Book Routes
app.use('/api', bookRoutes);

// Error Handler
app.use(errorHandler);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
