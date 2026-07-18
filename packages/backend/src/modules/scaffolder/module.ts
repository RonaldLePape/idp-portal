import {
  coreServices,
  createBackendModule,
} from '@backstage/backend-plugin-api';
import { scaffolderActionsExtensionPoint } from '@backstage/plugin-scaffolder-node';
import { createDeleteApplicationAction } from './actions/deleteApplication';

export default createBackendModule({
  pluginId: 'scaffolder',
  moduleId: 'platform-actions',

  register(reg) {
    reg.registerInit({
      deps: {
        scaffolder: scaffolderActionsExtensionPoint,
        config: coreServices.rootConfig,
      },

      async init({ scaffolder, config }) {
        const githubIntegrations =
          config.getOptionalConfigArray('integrations.github') ?? [];

        const github = githubIntegrations.find(
          item => item.getString('host') === 'github.com',
        );

        const token = github?.getOptionalString('token');

        if (!token) {
          throw new Error(
            'Missing integrations.github token for github.com',
          );
        }

        scaffolder.addActions(
          createDeleteApplicationAction({ token }),
        );
      },
    });
  },
});