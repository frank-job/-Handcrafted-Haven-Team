// app/ui/button.tsx
import Link from 'next/link';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  href?: string;
}

export default function Button({ variant = 'primary', href, className = '', children, ...props }: ButtonProps) {
  const base = 'px-4 py-2 font-medium transition-colors inline-block text-center';
  const variants = {
    login: 'bg-black text-white hover:bg-ink',
    primary: 'bg-ink text-canvas hover:bg-graphite',
    secondary: 'bg-canvas text-ink border border-ash hover:bg-fog',
    danger: 'bg-red-600 text-canvas hover:bg-red-700',
  };
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return <Link href={href} className={classes}>{children}</Link>;
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}