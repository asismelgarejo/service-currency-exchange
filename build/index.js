import Application from "./main.js";
async function bootstrap() {
    const app = new Application();
    await app.Init();
}
(async () => {
    await bootstrap();
})();
