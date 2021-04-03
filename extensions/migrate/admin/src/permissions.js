const pluginPermissions = {
  main: [
    {
      action: "plugins::content-manager.explorer.create",
      subject: "plugins::migrate.spm-migrate",
    },
    {
      action: "plugins::content-manager.explorer.create",
      subject: "plugins::migrate.spm-preferred-roles",
    },
  ],
};

export default pluginPermissions;
