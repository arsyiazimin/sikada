//mailerconfig.ts
const username = process.env.SMTP_USERNAME;
const password = process.env.SMTP_PASSWORD;
const host = process.env.SMTP_HOST;
const port = process.env.SMTP_PORT;
export const mailerConfig = {
  transport: {
    host: host,
    //service: "gmail",
    port: port,
    secure: false,
    requireTLS: true,
    auth: {
      // auth: "login",
      user: username,
      pass: password
    },
    rateDelta: 60000,
    rateLimit: 25
  },
  defaults: {
    forceEmbeddedImages: true,
    from: '"nest-modules" <modules@nestjs.com>',
  },
  templateDir: './src/common/mail-templates',
  // tls: {
  //      rejectUnauthorized: false
  //    }
}