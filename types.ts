import React from 'react';

export interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  url: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export interface Property {
  id: string;
  title: string;
  price: string;
  imageUrl: string;
  location: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}