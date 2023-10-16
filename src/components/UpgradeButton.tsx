import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

interface UpgradeButtonProps { }

export function UpgradeButton({ }: UpgradeButtonProps) {
    return (
        <Button
            className="w-full"
        >
            Atualizar agora <ArrowRight className="w-5 h-5 ml-1.5" />
        </Button>
    )
}
