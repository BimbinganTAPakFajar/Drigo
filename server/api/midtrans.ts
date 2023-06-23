import { Buffer } from "buffer";
const midtransClient = require("midtrans-client");

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  const data = await $fetch(`${config.public.midtransEndpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization:
        "Basic " +
        Buffer.from(`${config.public.midtransServerKey}`).toString("base64"),
    },
    body,
  });

  return {
    data,
  };
});
