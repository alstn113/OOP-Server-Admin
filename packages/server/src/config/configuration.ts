export default () => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
});
