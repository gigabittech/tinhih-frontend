import React from "react";
import Button from "../components/ui/Button";
import { X } from "lucide-react";

function Home() {
  return (
    <div className="space-x-5 mt-12 flex items-center">
      Rahul Roy Nipon
      <Button>Home</Button>
      <Button variant="outline">Home</Button>
      <Button variant="ghost">
        <X />
      </Button>
      <Button variant="link">Home</Button>
    </div>
  );
}

export default Home;
