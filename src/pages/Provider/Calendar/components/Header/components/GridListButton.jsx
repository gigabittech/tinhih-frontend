import React, { useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import Button from "../../../../../../components/ui/Button";
import { cn } from "../../../../../../lib/utils";
function GridListButton({ className }) {
  const [isGrid, setIsGrid] = useState(true);

  return (
    <div className={cn(className)}>
      <Button
        size="header"
        variant={isGrid ? "default" : "outline"}
        className="rounded-r-none px-1"
        onClick={() => setIsGrid(true)}
      >
        <LayoutGrid />
      </Button>
      <Button
        size="header"
        variant={isGrid ? "outline" : "default"}
        className="rounded-l-none px-1"
        onClick={() => setIsGrid(false)}
      >
        <List />
      </Button>
    </div>
  );
}

export default GridListButton;
