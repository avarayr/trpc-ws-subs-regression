import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { WebSocketServer } from "ws";
import { appRouter } from "~/server/api/root";

export function BootstrapWS() {
  const host = "0.0.0.0";
  const port = Number(3001);
  const wss = new WebSocketServer({
    port,
  });

  wss.on("connection", (ws, req) => {
    setTimeout(() => {
      /**
       * Simulate Cloudflare's WebSocket timeout
       */
      req.socket.write("Boo hoo I'm Cloudflare and I'm closing your socket");
      req.socket.destroy();
    }, 3000);
  });

  const handler = applyWSSHandler({
    wss,
    router: appRouter,
  });

  console.log(`✅ WebSocket Server listening on ws://${host}:${port}`);

  process.on("SIGTERM", () => {
    console.log("SIGTERM");
    handler.broadcastReconnectNotification();
    wss.close();
  });
}

BootstrapWS();
