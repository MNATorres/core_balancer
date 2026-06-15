import app from './app';
import { env } from './config/env';

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`🚀 PDF Generator Microservice running on port ${PORT} in ${env.NODE_ENV} mode.`);
  console.log(`📋 Health check: http://localhost:${PORT}/health`);
  console.log(`⚽ PDF Generation route: http://localhost:${PORT}/api/v1/pdf/world-cup`);
});
