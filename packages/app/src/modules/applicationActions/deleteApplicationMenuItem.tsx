import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { alertApiRef, useApi } from '@backstage/core-plugin-api';
import { useEntity } from '@backstage/plugin-catalog-react';
import { EntityContextMenuItemBlueprint } from '@backstage/plugin-catalog-react/alpha';

export const deleteApplicationMenuItem =
  EntityContextMenuItemBlueprint.make({
    name: 'delete-application',

    params: {
      icon: <DeleteOutlineIcon fontSize="small" />,

      filter: entity =>
        entity.metadata.annotations?.[
          'platform.ronald.dev/managed-by'
        ] === 'xapp',

      useProps: () => {
        const { entity } = useEntity();
        const alertApi = useApi(alertApiRef);

        return {
          title: 'Delete Application',

          onClick: async () => {
            const confirmed = window.confirm(
              `Delete application "${entity.metadata.name}"?\n\n` +
                'A GitOps pull request will eventually be created.',
            );

            if (!confirmed) {
              return;
            }

            alertApi.post({
              message: `Deletion requested for ${entity.metadata.name}`,
              severity: 'info',
              display: 'transient',
            });
          },
        };
      },
    },
  });
