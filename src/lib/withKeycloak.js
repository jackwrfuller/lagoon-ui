import React from 'react';
import getConfig from 'next/config';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export default App => {
  return class withKeycloak extends React.Component {
    constructor(props) {
      super(props);
      this.state = { keycloak: undefined };
    }

    async componentDidMount() {
      const keycloak = Keycloak({
        url: publicRuntimeConfig.KEYCLOAK_API,
        realm: 'lagoon',
        clientId: 'lagoon-ui'
      });

      keycloak.onTokenExpired = async () => {
        await keycloak.updateToken();
        this.setState({ keycloak });
      };

      await keycloak.init({
        onLoad: 'login-required',
        checkLoginIframe: false
      });

      this.setState({ keycloak });
    }

    render() {
      return <App {...this.props} keycloak={this.state.keycloak} />;
    }
  };
};
