export const DrCircle = ({ dr }: { dr: number }) => {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const progress = (dr / 100) * circumference;
  const strokeDasharray = `${progress} ${circumference}`;

  return (
    <div className="flex justify-center">
      <div className="relative h-[70px] w-[70px]">
        <svg className="h-full w-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="#f1f1f1"
            strokeWidth="10"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="#00703c"
            strokeWidth="10"
            strokeDasharray={strokeDasharray}
            strokeDashoffset="0"
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-medium text-gray-700">{dr}</span>
        </div>
      </div>
    </div>
  );
}; 