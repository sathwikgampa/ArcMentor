'use client';

import * as React from 'react';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  type AvatarProps,
} from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export interface UserAvatarProps extends AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
}

export function UserAvatar({
  src,
  alt = 'User avatar',
  fallback = 'DM',
  size = 'md',
  className,
  ...props
}: UserAvatarProps) {
  return (
    <Avatar
      size={size}
      className={cn(
        'cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-[#5856D6]/60',
        className
      )}
      {...props}
    >
      {src && <AvatarImage src={src} alt={alt} />}
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
