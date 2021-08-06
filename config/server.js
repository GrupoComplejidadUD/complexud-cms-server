module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "ce373d7fc9fc294abc2b8b6540d83960"),
    },
  },
  vercel: {
    token: env("VERCEL_TOKEN"),
    projectId: env("VERCEL_PROJECT_ID"),
    triggers: {
      develop: env("VERCEL_TRIGGER_DEVELOP"),
      production: env("VERCEL_TRIGGER_PRODUCTION"),
    },
  },
});
