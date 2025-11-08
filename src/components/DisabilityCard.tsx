import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface DisabilityCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  selected?: boolean;
  onClick?: () => void;
}

export const DisabilityCard = ({
  icon: Icon,
  title,
  description,
  selected = false,
  onClick,
}: DisabilityCardProps) => {
  return (
    <Card
      className={cn(
        "p-6 cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]",
        selected
          ? "border-primary border-2 bg-primary/5 shadow-md"
          : "border-border hover:border-primary/50"
      )}
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center gap-3">
        <div
          className={cn(
            "p-4 rounded-full",
            selected ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
          )}
        >
          <Icon className="w-8 h-8" />
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </Card>
  );
};
