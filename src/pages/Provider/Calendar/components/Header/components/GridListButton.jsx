import React, { useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import Button from "../../../../../../components/ui/Button";
import { cn } from "../../../../../../lib/utils";
function GridListButton({ className }) {
  const [isGrid, setIsGrid] = useState(true);

  return (
    <div className={cn(className)}>
      <Button
        variant={isGrid ? "default" : "outline"}
        className="rounded-r-none h-9 p-2 has-[>svg]:px-1.5"
        onClick={() => setIsGrid(true)}
      >
        <LayoutGrid />
      </Button>
      <Button
        variant={isGrid ? "outline" : "default"}
        className="rounded-l-none h-9 p-2 has-[>svg]:px-1.5"
        onClick={() => setIsGrid(false)}
      >
        <List />
      </Button>
    </div>
  );
}

export default GridListButton;
