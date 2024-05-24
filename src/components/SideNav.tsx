import { useState, ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import { NotebookText, Settings, Table, Plug2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export enum NavTabs {
  Notebooks,
  DataSources,
  Connections,
  Settings,
}

export function SideNavButton({
  label,
  children,
  isActive,
  onClick,
}: {
  label: string;
  children: ReactNode;
  isActive?: boolean;
  onClick: () => void;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={onClick}
          className={
            `
            w-10 h-10
            rounded-lg
            grid
            place-content-center
            transition-colors
          ` +
            (isActive
              ? "text-foreground bg-muted-foreground/20"
              : "text-muted-foreground hover:text-foreground")
          }
        >
          {children}
          <span className="sr-only">{label}</span>
        </button>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}

export function SideNavPrimary({
  activeTab,
  setActiveTab,
}: {
  activeTab: NavTabs | null;
  setActiveTab: (tab: NavTabs | null) => void;
}) {
  return (
    <aside className="flex-shrink-0 px-3 py-2 flex flex-col items-center space-y-2">
      <div className="pb-2">
        {/* Replace with Logo */}
        <div className="w-10 h-10 rounded-full bg-black" />
      </div>

      <SideNavButton
        label="Notebooks"
        isActive={activeTab === NavTabs.Notebooks}
        onClick={() =>
          activeTab === NavTabs.Notebooks
            ? setActiveTab(null)
            : setActiveTab(NavTabs.Notebooks)
        }
      >
        <NotebookText className="h-6 w-6" />
      </SideNavButton>
      <SideNavButton
        label="Data Sources"
        isActive={activeTab === NavTabs.DataSources}
        onClick={() =>
          activeTab === NavTabs.DataSources
            ? setActiveTab(null)
            : setActiveTab(NavTabs.DataSources)
        }
      >
        <Table className="h-6 w-6" />
      </SideNavButton>
      <SideNavButton
        label="Connections"
        isActive={activeTab === NavTabs.Connections}
        onClick={() =>
          activeTab === NavTabs.Connections
            ? setActiveTab(null)
            : setActiveTab(NavTabs.Connections)
        }
      >
        <Plug2 className="h-6 w-6" />
      </SideNavButton>

      <div className="flex-grow" />
      <Separator />

      <SideNavButton
        label="Settings"
        isActive={activeTab === NavTabs.Settings}
        onClick={() =>
          activeTab === NavTabs.Settings
            ? setActiveTab(null)
            : setActiveTab(NavTabs.Settings)
        }
      >
        <Settings className="h-6 w-6" />
      </SideNavButton>
    </aside>
  );
}

export function SideNavSecondary() {
  return (
    <aside className="flex-shrink-0 px-3 py-2 flex flex-col items-center space-y-2 w-64"></aside>
  );
}

export function SideNav() {
  const [activeTab, setActiveTab] = useState<NavTabs | null>(null);
  return (
    <>
      <SideNavPrimary activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === null ? null : <SideNavSecondary />}
      <Separator orientation="vertical" />
    </>
  );
}
