import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export function PortfolioTabs({
  categories,
  activeTab,
  setActiveTab,
}: {
  categories: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  return (
    <Tabs
      defaultValue="all"
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <div className="flex justify-center mb-8 w-full">
        <div className="w-full overflow-x-auto no-scrollbar">
          <TabsList
            className={cn(
              "flex flex-row gap-2 bg-gray-100 rounded-lg py-2 px-1 min-w-max",
              "snap-x snap-mandatory"
            )}
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className={cn(
                  "capitalize whitespace-nowrap px-4 py-2 rounded-md font-medium",
                  "snap-start",
                  "transition-colors",
                  "data-[state=active]:bg-primary data-[state=active]:text-white",
                  "data-[state=inactive]:bg-white data-[state=inactive]:text-gray-700"
                )}
              >
                {category === "all" ? "All Projects" : category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </div>
    </Tabs>
  );
}
