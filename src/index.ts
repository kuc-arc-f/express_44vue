
import express from 'express';
import { renderToString } from 'vue/server-renderer'
const app = express();
import 'dotenv/config'
//
import { createApp } from './pages/App'
//
import commonRouter from './routes/commonRouter';
//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
console.log("env=", process.env.NODE_ENV)
//console.log("EXTERNAL_API_URL=", process.env.EXTERNAL_API_URL)
//
const errorObj = {ret: "NG", messase: "Error"};
// route
app.use('/api/common', commonRouter);

//routes
app.get('/*', async (req: any, res: any) => {
  const { app } = createApp()
  const ctx = {}
  const html = await renderToString(app, ctx)
  try { res.send(html); } catch (error) { res.sendStatus(500); }
});

//start
const PORT = 4000;
app.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT}`);
});
console.log('start');
