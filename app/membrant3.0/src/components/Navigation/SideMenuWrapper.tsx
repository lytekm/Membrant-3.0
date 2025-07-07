// src/components/Navigation/SideMenuWrapper.tsx
'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { SideMenu } from '@/components/UI/SideMenu/SideMenu';
import { SideMenuItem } from '@/components/UI/SideMenu/SideMenuItem';
import { HomeIcon } from '@/components/UI/Icons/HomeIcon';
import { ListTaskIcon } from '@/components/UI/Icons/TaskIcon';
import { CalendarIcon } from '@/components/UI/Icons/CalendarIcon';
import { ProjectIcon } from '../UI/Icons/ProjectIcon';
import { GoalIcon } from '../UI/Icons/GoalIcon';
import { css } from '@emotion/react';

export default function SideMenuWrapper() {
  const router = useRouter();
  const pathname = usePathname();

  // highlight style for active route
  const activeStyle = css`
    background: #e0e0e0;
  `;

  // helper to decide if this item is active
  const isActive = (route: string) =>
    pathname === route || pathname.startsWith(route + '/');

  return (
    <SideMenu>
      <SideMenuItem
        icon={<HomeIcon size={24} />}
        label="Dashboard"
        onClick={() => router.push('/dashboard')}
        customCss={isActive('/dashboard') ? activeStyle : undefined}
      />
      <SideMenuItem
        icon={<ListTaskIcon size={24} />}
        label="Tasks"
        onClick={() => router.push('/tasks')}
        customCss={isActive('/tasks') ? activeStyle : undefined}
      />
      <SideMenuItem
        icon={<CalendarIcon size={24} />}
        label="Calendar"
        onClick={() => router.push('/calendar')}
        customCss={isActive('/calendar') ? activeStyle : undefined}
      />
      <SideMenuItem
        icon={<ProjectIcon size={24} />}
        label="Projects"
        onClick={() => router.push('/projects')}
        customCss={isActive('/projects') ? activeStyle : undefined}
      />
      <SideMenuItem
        icon={<GoalIcon size={24} />}
        label="Goals"
        onClick={() => router.push('/goals')}
        customCss={isActive('/goals') ? activeStyle : undefined}
      />
    </SideMenu>
  );
}
