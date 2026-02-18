import { AppDataSource } from "./config/data-source";
import { setupSwagger } from './config/swagger.js';
import app from "./app";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await AppDataSource.initialize();

        console.log("🔥 Database connected!");

        if (process.env.NODE_ENV !== 'production') {
            setupSwagger(app);
            console.log('📚 Swagger documentation available at: http://localhost:3000/api-docs');
        }

        const server = app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

        const gracefulShutdown = async (signal: string) => {
            console.log(`\n🛑 Signal ${signal} received. Initiating graceful shutdown...`);

            server.close(async () => {
                console.log("HTTP Server closed.");

                try {
                    if (AppDataSource.isInitialized) {
                        await AppDataSource.destroy();
                        console.log("Database disconnected.");
                    }

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