import { createBackendModule } from '@backstage/backend-plugin-api';
import { scaffolderActionsExtensionPoint } from '@backstage/plugin-scaffolder-node';
import { createDeleteApplicationAction } from './actions/deleteApplication';

export default createBackendModule({
  pluginId: 'scaffolder',
  moduleId: 'platform-actions',

  register(reg) {
    reg.registerInit({
      deps: {
        scaffolder: scaffolderActionsExtensionPoint,
      },

      async init({ scaffolder }) {
        scaffolder.addActions(createDeleteApplicationAction());
      },
    });
  },
});
