import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN);

// 为回复的消息添加按钮
bot.command('addbutton', async (ctx) => {
  if (!ctx.message.reply_to_message) return ctx.reply('请先回复目标消息');
  const buttons = ctx.message.text.split(' ').slice(1).map(arg => {
    const [text, url] = arg.split('-');
    return { text, url };
  });
  
  await ctx.telegram.editMessageReplyMarkup(
    ctx.chat.id,
    ctx.message.reply_to_message.message_id,
    null,
    { inline_keyboard: [buttons] }
  );
  await ctx.deleteMessage();
});

// Zeabur适配
export default async (req, res) => {
  await bot.handleUpdate(req.body, res);
  res.status(200).send();
};
