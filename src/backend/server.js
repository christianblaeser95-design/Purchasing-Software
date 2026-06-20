import express from 'express';

const app = express();
const PORT = process.env.BACKEND_PORT || 5000;

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend läuft! ✅' });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend läuft auf http://localhost:${PORT}`);
});