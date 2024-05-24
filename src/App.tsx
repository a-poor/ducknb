import { TooltipProvider } from "@/components/ui/tooltip";
import { SideNav } from "@/components/SideNav";

export default function App() {
  return (
    <TooltipProvider>
      <div className="flex h-full">
        <SideNav />
        <main className="flex-grow"></main>
      </div>
    </TooltipProvider>
  );
}
