import express from 'express';

const app = express();
const port = 3000; // Você pode escolher a porta que preferir

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;