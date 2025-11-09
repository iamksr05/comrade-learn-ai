export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img 
        src="/comrade.webp" 
        alt="Comrade Logo" 
        className="h-8 w-auto object-contain"
      />
      <span className="text-xl font-bold text-foreground">Comrade</span>
    </div>
  );
};
