import app from "./app.js";
import { setupSwagger } from '@config/swagger.js';
import { connectDatabase, sequelize } from "@config/database.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDatabase();

        if (process.env.NODE_ENV !== 'production') {
            setupSwagger(app);
            console.log(`📚 Swagger documentation available at: http://localhost:${PORT}/api-docs`);
        }

        const server = app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

        const gracefulShutdown = (signal: string) => {
            console.log(`\n🛑 Signal ${signal} received. Initiating graceful shutdown...`);

            const forceExit = setTimeout(() => {
                console.error("❌ Shutdown timed out. Forcing exit.");
                process.exit(1);
            }, 10000);

            server.close(async () => {
                console.log("HTTP Server closed.");

                try {
                    await sequelize.close();
                    console.log("Database connection pool closed.");
                    
                    clearTimeout(forceExit);
                    console.log("✅ Shutdown complete. Goodbye!");
                    process.exit(0);
                } catch (error) {
                    console.error("❌ Error disconnecting database:", error);
                    process.exit(1);
                }
            });
        };

        process.on("SIGINT", () => gracefulShutdown("SIGINT"));
        process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

    } catch (error) {
        console.error("❌ Fatal error during startup:", error);
        process.exit(1);
    }
};

startServer();