interface CheckoutStepsProps {
  step: "address" | "review";
}

const STEPS = ["Cart", "Address", "Order Summary", "Payment"];

export default function CheckoutSteps({ step }: CheckoutStepsProps) {
  const activeIndex = step === "address" ? 1 : 2;

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="mx-auto flex max-w-[1400px] items-center justify-center gap-8 px-4 py-3">
        {STEPS.map((label, i) => {
          const isActive = i <= activeIndex;
          const isCurrent = i === activeIndex;
          return (
            <div key={label} className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                  isActive ? "bg-fk-blue text-white" : "bg-gray-200 text-fk-text-light"
                }`}
              >
                {i + 1}
              </span>
              <span
                className={`hidden text-sm font-medium sm:inline ${
                  isCurrent ? "text-fk-blue" : isActive ? "text-fk-text" : "text-fk-text-light"
                }`}
              >
                {label}
              </span>
              {i < STEPS.length - 1 && <span className="hidden text-gray-300 sm:inline">—</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
