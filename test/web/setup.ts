import { beforeAll } from "vitest";
import { WEB_PORT } from "../server/credentials.js";

const SERVER_URL = `http://localhost:${WEB_PORT}/webdav/server`;

async function waitForWebServer() {
    const maxAttempts = 50;
    const delayMs = 200;

    for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
        try {
            const response = await fetch(SERVER_URL, { method: "OPTIONS" });
            if (response) {
                return;
            }
        } catch (error) {
            // Keep retrying until the server accepts connections.
        }

        await new Promise(resolve => setTimeout(resolve, delayMs));
    }

    throw new Error(`WebDAV test server not reachable at ${SERVER_URL}`);
}

beforeAll(async () => {
    await waitForWebServer();
}, 30000);
