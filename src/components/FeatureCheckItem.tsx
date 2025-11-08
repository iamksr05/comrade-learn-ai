import { CheckCircle } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface FeatureCheckItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const FeatureCheckItem = ({ icon: Icon, title, description }: FeatureCheckItemProps) => {
  return (
    <div className="flex items-start gap-4 p-4 bg-card rounded-lg border border-border">
      <div className="p-2 bg-secondary rounded-lg shrink-0">
        <Icon className="w-5 h-5 text-foreground" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-semibold">{title}</h4>
          <CheckCircle className="w-5 h-5 text-primary shrink-0" />
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
