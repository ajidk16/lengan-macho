import { CalorieCalculator } from "@/components/calorie-calculator";

import React from "react";

const Page = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to Lengan Macho</h1>
      {/* Add more components or content as needed */}
      <CalorieCalculator />
      <div>ini adalah konten tambahan</div>
    </div>
  );
};

export default Page;
