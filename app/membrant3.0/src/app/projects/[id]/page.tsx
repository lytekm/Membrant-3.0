'use client';

import React from 'react';
import { useParams } from 'next/navigation';

export default function ProjectDetailPage() {
  const { id } = useParams();
  return (
    <h1>Project Details</h1>
  );
}