import React from 'react';
import { PageProject as Project } from '../project';

export default {
  component: Project,
  title: 'Pages/Project',
}

export const Default = () => (
  <Project
    router={{
      query: {
        projectName: 'Example',
      },
    }}
  />
);
