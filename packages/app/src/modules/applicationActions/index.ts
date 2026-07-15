import { createFrontendModule } from '@backstage/frontend-plugin-api';
import { deleteApplicationMenuItem } from './deleteApplicationMenuItem';

export const applicationActionsModule = createFrontendModule({
  pluginId: 'catalog',
  extensions: [deleteApplicationMenuItem],
});
