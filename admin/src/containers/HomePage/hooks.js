import { useContext, useEffect, useState } from "react";
import { UserContext, hasPermissions } from "strapi-helper-plugin";
import { useModels } from "../../hooks";

// ---------- LOCAL UTILS ----------
const generateLinks = (links) =>
  links.map((link) => ({
    destination: `/plugins/content-manager/${link.kind}/${link.uid}`,
    label: link.info.label,
    permissions: [
      {
        action: "plugins::content-manager.explorer.create",
        subject: link.uid,
      },
      {
        action: "plugins::content-manager.explorer.read",
        subject: link.uid,
      },
      {
        action: "plugins::content-manager.explorer.update",
        subject: link.uid,
      },
    ],
  }));

const asyncFilter = async (arr, predicate) => {
  const results = await Promise.all(arr.map(predicate));
  return arr.filter((_v, index) => results[index]);
};

const filterPlugins = ({ uid }) => uid.startsWith("application::");
const useLinks = () => {
  const [state, setState] = useState({
    isLoading: true,
    collectionsLinks: [],
    singlesLinks: [],
  });

  // Get Permissions of logged User
  const permissions = useContext(UserContext);

  // Get CollectionTypes and SingleTypes
  const {
    collectionTypes,
    singleTypes,
    isLoading: isModulesLoading,
  } = useModels();

  // ------------------------------------------------------------
  useEffect(() => {
    const getLinksPermissions = async () => {
      const filterPermissions = async (link) =>
        hasPermissions(permissions, link.permissions);

      const filteredCollections = collectionTypes.filter(filterPlugins);
      const collectionsLinksFiltered = await asyncFilter(
        generateLinks(filteredCollections),
        filterPermissions
      );

      const filteredSingle = singleTypes.filter(filterPlugins);
      const singlesLinksFiltered = await asyncFilter(
        generateLinks(filteredSingle),
        filterPermissions
      );

      setState({
        isLoading: false,
        collectionsLinks: collectionsLinksFiltered,
        singlesLinks: singlesLinksFiltered,
      });
    };

    if (!isModulesLoading) getLinksPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissions, collectionTypes, singleTypes, isModulesLoading]);

  return state;
};

export default useLinks;
