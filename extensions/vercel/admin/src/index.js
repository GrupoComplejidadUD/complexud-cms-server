import pluginPkg from "../../package.json";
import pluginId from "./pluginId";

import App from "./containers/App";

export default (strapi) => {
  const pluginDescription =
    pluginPkg.strapi.description || pluginPkg.description;

  const plugin = {
    blockerComponent: null,
    blockerComponentProps: {},
    description: pluginDescription,
    icon: "rocket",
    id: pluginId,
    isReady: true,
    initializer: () => null,
    injectedComponents: [],
    isRequired: pluginPkg.strapi.required || false,
    layout: null,
    lifecycles: () => {},
    mainComponent: App,
    name: pluginPkg.strapi.name,
    preventComponentRendering: false,
    trads: {},
    menu: {
      pluginsSectionLinks: [
        {
          destination: `/plugins/${pluginId}`,
          icon: "rocket",
          label: {
            id: `${pluginId}.plugin.name`,
            defaultMessage: "Vercel Deployments",
          },
          name: pluginPkg.strapi.name,
          permissions: [
            // Uncomment to set the permissions of the plugin here
            // {
            //   action: '', // the action name should be plugins::plugin-name.actionType
            //   subject: null,
            // },
          ],
        },
      ],
    },
  };

  return strapi.registerPlugin(plugin);
};
