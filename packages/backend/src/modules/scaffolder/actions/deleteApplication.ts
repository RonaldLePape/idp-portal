import { createTemplateAction } from '@backstage/plugin-scaffolder-node';

export const createDeleteApplicationAction = () =>
  createTemplateAction({
    id: 'platform:delete-application',
    description: 'Prepare the deletion of an IDP-managed application',

    schema: {
      input: {
        applicationName: z =>
          z.string().min(1).describe('Application name to delete'),
      },
    },

    async handler(ctx) {
      ctx.logger.info(
        `Deletion requested for application: ${ctx.input.applicationName}`,
      );
    },
  });
