import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "../server/routes";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let ready: Promise<void> | null = null;

async function ensureRoutes() {
  if (!ready) {
    ready = registerRoutes(httpServer, app).then(() => {
      app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
        const status = err.status || err.statusCode || 500;
        const message = err.message || "Internal Server Error";
        if (res.headersSent) return next(err);
        res.status(status).json({ message });
      });
    });
  }
  return ready;
}

export default async function handler(req: Request, res: Response) {
  await ensureRoutes();
  (app as any)(req, res);
}
