/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, {useState} from 'react';
import { InputField } from '@/components/UI/InputField';
import { Checkbox } from '@/components/UI/Checkbox';
const inputContainerStyle = css({ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' });

export const ProjectGoalForm = ({ setGoalData }: { setGoalData: (updater: (prev: any) => any) => void }) => {
  const [createProject, setCreateProject] = useState(false);
  return (
    <div css={inputContainerStyle}>
      <InputField
        type="text-area"
        name='completionDefinition'
        placeholder="What does completion look like?"
        onChange={(e) => setGoalData((prev) => ({ ...prev, completionDefinition: e.target.value }))}
        description='Think about what completion of this goal means. For example, "Have a website with a homepage, about page and contact page". Think about these as your requirements to submit a project.'
      />
      <InputField
        type="text-area"
        name='steps'
        placeholder="List the major steps - each step on a new line"
        onChange={(e) => setGoalData((prev) => ({ ...prev, steps: e.target.value }))}
        description='Take a look at what you wrote above and think about what are all the steps you need to complete this goal. For example, "Learn HTML, create the page layout, learn CSS, style the pages". Think of these as your milestones.'
      />
      <p>Create a project for your goal that you can use to breakdown each step into tasks and track your progress.</p>
      <Checkbox
        label="Create a project"
        checked={createProject}
        onChange={(e) => setCreateProject(e.target.checked)}
      />
    </div>
  );
};