'use client';

interface ScrollToTopButtonProps {
  className?: string;
  children: React.ReactNode;
}

export default function ScrollToTopButton({ className, children }: ScrollToTopButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
