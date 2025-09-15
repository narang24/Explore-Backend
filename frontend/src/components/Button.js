export default function Button({ 
  children, 
  onClick, 
  variant = 'default', 
  size = 'default', 
  radius = 'default',
  className = '',
  disabled = false,
  ...props 
}) {
  const baseClasses = 'font-medium transition-colors duration-300 cursor-pointer inline-flex items-center justify-center';
  
  const variants = {
    default: 'bg-transparent',
    primary: 'bg-[var(--planetary)] text-white hover:bg-[var(--sapphire)]'
  };
  
  const sizes = {
    small: 'px-4 py-2 text-sm',
    default: 'px-6 py-2',
    large: 'px-8 py-3 text-lg'
  };
  
  const radiuses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    default: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  };
  
  const classes = `
    ${baseClasses}
    ${variants[variant] || variants.default}
    ${sizes[size] || sizes.default}
    ${radiuses[radius] || radiuses.default}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  return (
    <button 
      onClick={disabled ? undefined : onClick}
      className={classes}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}