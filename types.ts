import React from 'react';

export interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  url: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}


export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}