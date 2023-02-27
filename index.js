import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import { imageQrCode } from "./base64.js";
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.on("text", async (ctx) => {
  const chat_id = ctx.chat.id;

  await ctx.telegram.sendMessage(
    chat_id,
    `Assalomu alaykum ${ctx.chat.first_name} botga hush kelibsiz zakaz berish uchun nomeringizni biz bilam ulashing`,
    {
      parse_mode: "Markdown",
      reply_markup: {
        one_time_keyboard: true,
        keyboard: [
          [
            {
              text: "Share Phone Number",
              request_contact: true,
            },
          ],
        ],
        force_reply: true,
        resize_keyboard: true,
      },
    }
  );
});

bot.on("contact", async (ctx) => {
  const contact = ctx.message.contact;
  const chat_id = ctx.chat.id;
  const path = await imageQrCode(chat_id, contact);
  await ctx.replyWithPhoto({ source: `./images/${chat_id}.png` });
});

bot.launch();
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
