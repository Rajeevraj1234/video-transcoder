import React from "react";

interface CheckboxProps {
  value: string;
  selectedResolutions: string[];
  setSelectedResolutions: React.Dispatch<React.SetStateAction<string[]>>;
}

function Checkbox({
  value,
  selectedResolutions,
  setSelectedResolutions,
}: CheckboxProps) {
  const handleResolutionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const resolution = event.target.value;
    // Add or remove resolution based on selection
    if (selectedResolutions.includes(resolution)) {
      setSelectedResolutions((prev) =>
        prev.filter((res) => res !== resolution),
      );
    } else {
      setSelectedResolutions((prev) => [...prev, resolution]);
    }
  };

  return (
    <div>
      <div className="text-sm">
        <label className="flex items-center justify-center gap-1">
          <div className="inline-flex items-center">
            <label className="flex items-center cursor-pointer relative">
              <input
                type="checkbox"
                value={value}
                checked={selectedResolutions.includes(value)}
                onChange={handleResolutionChange}
                className="peer h-4 w-4 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-green-600 checked:border-green-600"
              />
              <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
          </div>
          {value}p
        </label>
      </div>
    </div>
  );
}

export default Checkbox;
