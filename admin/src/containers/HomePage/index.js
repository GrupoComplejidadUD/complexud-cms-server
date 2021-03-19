/*
 *
 * HomePage
 *
 */
/* eslint-disable */
import React, { memo } from "react";
import { FormattedMessage } from "react-intl";
import { get, upperFirst } from "lodash";
import { auth, LoadingIndicatorPage } from "strapi-helper-plugin";
import PageTitle from "../../components/PageTitle";

import useLinks from "./hooks";
import {
  ALink,
  Block,
  Container,
  LinkWrapper,
  Button,
  P,
  Wave,
  Separator,
} from "./components";
import SocialLink from "./SocialLink";
import Logo from "../../assets/images/logo.png";

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    link:
      "https://www.facebook.com/Grupo-de-Complejidad-de-la-Universidad-Distrital-567936853231644",
  },
  {
    name: "GitHub",
    link: "https://github.com/GrupoComplejidadUD",
  },
  {
    name: "Youtube",
    link: "https://www.youtube.com/channel/UCwMNplUJd2iBbNArsSeRsIQ",
  },
  {
    name: "Twitter",
    link: "https://twitter.com/complejidadud",
  },
];

const HomePage = ({ history: { push } }) => {
  const { isLoading, collectionsLinks, singlesLinks } = useLinks();
  if (isLoading) {
    return <LoadingIndicatorPage />;
  }

  const navigateTo = (path) => () => push(path);
  const username = get(auth.getUserInfo(), "firstname", "");
  const roles = get(auth.getUserInfo(), "roles", "");
  return (
    <>
      <FormattedMessage id="HomePage.info.title">
        {(title) => <PageTitle title={`ComplexUD - ${title}`} />}
      </FormattedMessage>
      <Container className="container-fluid">
        <div className="row">
          <div className="col-md-7 col-xl-8">
            <Block>
              <Wave />
              <FormattedMessage
                id="HomePage.greetings"
                values={{
                  name: upperFirst(username),
                }}
              >
                {(msg) => <h1 id="mainHeader">{msg}</h1>}
              </FormattedMessage>

              <FormattedMessage id="HomePage.info.message">
                {(msg) => <P>{msg}</P>}
              </FormattedMessage>
              <br />
              <FormattedMessage id="HomePage.info.roles.title">
                {(title) => <h3>{title}</h3>}
              </FormattedMessage>

              {roles.map((role) => (
                <FormattedMessage
                  id={`HomePage.info.roles.permissions.${role.code}`}
                >
                  {(msg) => (
                    <P>
                      <strong>{role.name}</strong>: {msg}
                    </P>
                  )}
                </FormattedMessage>
              ))}

              {collectionsLinks.length > 0 && (
                <>
                  <Separator />
                  <FormattedMessage id="HomePage.info.content.collections">
                    {(msg) => <h4>{msg}</h4>}
                  </FormattedMessage>
                  <br />
                  <div>
                    {collectionsLinks.map((link) => (
                      <Button
                        key={link.label}
                        onClick={navigateTo(`${link.destination}/create`)}
                      >
                        {link.label}
                      </Button>
                    ))}
                  </div>
                </>
              )}

              {singlesLinks.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <FormattedMessage id="HomePage.info.content.single">
                      {(msg) => <h4>{msg}</h4>}
                    </FormattedMessage>
                    <br />
                    {singlesLinks.map((link) => (
                      <Button
                        key={link.label}
                        onClick={navigateTo(`${link.destination}/update`)}
                      >
                        {link.label}
                      </Button>
                    ))}
                  </div>
                </>
              )}
            </Block>
          </div>

          <div className="col-md-5 col-xl-4">
            <Block style={{ paddingRight: 30, paddingBottom: 0 }}>
              <div className="text-center">
                <a
                  rel="noopener noreferrer"
                  href="https://complexud.com"
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  <img className="img-fluid" src={Logo} alt="ComplexUd Logo" />
                </a>
              </div>
              <FormattedMessage id="HomePage.info.website.link-text">
                {(msg) => (
                  <ALink
                    rel="noopener noreferrer"
                    href="https://complexud.com"
                    target="_blank"
                  >
                    <span>{msg}</span>
                  </ALink>
                )}
              </FormattedMessage>

              <Separator style={{ marginTop: 18, marginBottom: 18 }} />
              <FormattedMessage id="HomePage.info.social.title">
                {(msg) => <h3>{msg}</h3>}
              </FormattedMessage>
              <div
                className="row social-wrapper"
                style={{
                  display: "flex",
                  margin: 0,
                  marginTop: 36,
                  marginLeft: -15,
                }}
              >
                {SOCIAL_LINKS.map((value, key) => (
                  <SocialLink key={key} {...value} />
                ))}
              </div>
            </Block>
          </div>
        </div>
      </Container>
    </>
  );
};

export default memo(HomePage);
