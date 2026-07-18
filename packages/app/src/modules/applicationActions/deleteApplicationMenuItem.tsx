import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { alertApiRef, useApi } from '@backstage/core-plugin-api';
import { useEntity } from '@backstage/plugin-catalog-react';
import { EntityContextMenuItemBlueprint } from '@backstage/plugin-catalog-react/alpha';
import { scaffolderApiRef } from '@backstage/plugin-scaffolder-react';
import { useNavigate } from 'react-router-dom';

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
        const scaffolderApi = useApi(scaffolderApiRef);
        const alertApi = useApi(alertApiRef);
        const navigate = useNavigate();

        return {
          title: 'Delete Application',

          onClick: async () => {
            const applicationName = entity.metadata.name;

            const confirmed = window.confirm(
              `Delete application "${applicationName}"?\n\n` +
                'A GitOps pull request will be created. ' +
                'The application will only be deleted after the PR is merged.',
            );

            if (!confirmed) {
              return;
            }

            try {
              const response = await scaffolderApi.scaffold({
                templateRef: 'template:default/delete-application',
                values: {
                  applicationName,
                },
              });

              alertApi.post({
                message: `Deprovisioning task started for ${applicationName}`,
                severity: 'info',
                display: 'transient',
              });

              navigate(`/create/tasks/${response.taskId}`);
            } catch (error) {
              alertApi.post({
                message:
                  error instanceof Error
                    ? error.message
                    : 'Unable to start the deletion task',
                severity: 'error',
                display: 'transient',
              });
            }
          },
        };
      },
    },
  });
