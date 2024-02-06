import Application from "./main.js";

async function bootstrap(): Promise<any> {
  const app = new Application();
  await app.Init();
}

(async () => {
  await bootstrap();
})();
