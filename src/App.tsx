import { TooltipProvider } from "@/components/ui/tooltip";
import { SideNav } from "@/components/SideNav";
import QueryConsolePage from "@/components/QueryConsolePage";

export default function App() {
  return (
    <TooltipProvider>
      <div className="flex h-full">
        <SideNav />
        <main className="flex-grow">
          <QueryConsolePage />
        </main>
      </div>
    </TooltipProvider>
  );
}
