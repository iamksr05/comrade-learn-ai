export const Logo = ({ className = "", size = "default" }: { className?: string; size?: "default" | "large" }) => {
  const sizeClass = size === "large" ? "h-24" : "h-16";
  return (
    <div className={className}>
      <img 
        src="/scomrade.png" 
        alt="Comrade Logo" 
        className={`${sizeClass} w-auto object-contain`}
      />
    </div>
  );
};
