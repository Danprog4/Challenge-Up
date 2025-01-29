import { cn } from "@/lib/utils";

type WithdrawInputProps = {
  amountValue: string;
  onAmountChange: (value: string) => void;
  onFocus?: () => void;
  unit?: string;
  placeholder: string;
};

// try set selection end
export function NumericInput({
  amountValue,
  unit,
  onAmountChange: setAmountValue,
  onFocus,
  placeholder,
}: WithdrawInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    // Allow only digits (0-9) or empty string
    if (/^\d*$/.test(inputValue)) {
      // Process leading zeros only if input is not empty
      if (inputValue !== "") {
        // Remove leading zeros
        inputValue = inputValue.replace(/^0+/, "");
      }

      setAmountValue(inputValue);
    }
  };

  return (
    <div
      className={cn(
        "flex h-10 items-baseline gap-1",
        !amountValue && "items-end *:text-[20px]",
      )}
    >
      <input
        type="text"
        inputMode="decimal"
        className="absolute z-10 w-[60vw] bg-transparent p-0.5 text-[20px] font-semibold text-white placeholder:text-white/65 focus-visible:outline-none"
        value={amountValue}
        placeholder={placeholder}
        onInput={handleChange}
        onFocus={onFocus}
      />
      <div
        className={cn(
          "max-w-[60vw] text-[20px] font-semibold opacity-0",
          !amountValue && "self-end text-[20px] text-white/65",
        )}
      >
        {amountValue || placeholder}
      </div>
      {amountValue && (
        <span className="translate-y-0.5 text-[20px] font-semibold text-white">
          {unit}
        </span>
      )}
    </div>
  );
}
