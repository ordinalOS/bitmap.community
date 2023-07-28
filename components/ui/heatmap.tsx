export const HeatMap = () => {
  return (
    <div>
      <div className="grid grid-flow-col w-full min-w-[300px]">
        <div className="h-3 bg-orange-50"></div>
        <div className="h-3 bg-orange-100"></div>
        <div className="h-3 bg-orange-200"></div>
        <div className="h-3 bg-orange-300"></div>
        <div className="h-3 bg-orange-400"></div>
        <div className="h-3 bg-orange-500"></div>
        <div className="h-3 bg-orange-600"></div>
        <div className="h-3 bg-orange-700"></div>
        <div className="h-3 bg-orange-800"></div>
        <div className="h-3 bg-orange-900"></div>
        <div className="h-3 bg-orange-950"></div>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">common</span>
        <span className="text-muted-foreground">rare</span>
      </div>
    </div>
  );
};
