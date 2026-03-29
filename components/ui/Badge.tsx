interface BadgeProps {
  children: React.ReactNode;
  variant?: 'nqf' | 'seta' | 'faculty' | 'default';
  className?: string;
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    nqf: 'bg-mta-gold text-mta-black font-semibold',
    seta: 'bg-mta-black border border-mta-gold text-mta-gold',
    faculty: 'bg-gray-100 text-gray-700',
    default: 'bg-gray-100 text-gray-700',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
