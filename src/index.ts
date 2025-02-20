import { createApp } from "./app";
import configManager from "./config";

(async () => {
    try {
        // TODO: init database connection

        const app = createApp();
        const port = configManager.get("PORT") || 3000;

        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });
    } catch (error) {
        console.error("Error starting the server:", error);
        process.exit(1);
    }
})();
