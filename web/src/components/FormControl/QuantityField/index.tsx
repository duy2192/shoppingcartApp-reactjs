import { Controller } from 'react-hook-form';
export interface QuantityFieldProps {
  name: string;
  form: any;
  disabled?: boolean;
  onIncrease?: () => void;
  onDecrease?: () => void;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
}

export default function QuantityField({
  form,
  name,
  onChange = () => {},
  disabled = false,
  min,
  max,
}: QuantityFieldProps) {
  const handleDecrease = (value: number) => {
    if (min && value < min) return;
    if (!disabled) {
      onChange(value);
    }
  };
  const handleIncrease = (value: number) => {
    if (max && value > max) return;

    if (!disabled) {
      onChange(value);
    }
  };
  const handleChangeQuantity = (value: number) => {
    if (max && value > max) return;
    if (min && value < min) return;

    if (!disabled) {
      onChange(value);
    }
  };
  const { control } = form;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, name }, fieldState: { invalid, error } }) => (
        <>
          <div className="inline-flex border shadow-sm rounded-md select-none">
            <div
              className="border-r-2 p-1 cursor-pointer hover:bg-slate-300 rounded-l-md"
              onClick={() => {
                if (!disabled) {
                  if (min !== undefined && value <= min) return;
                  onChange(Number.parseInt(value) - 1);

                  handleDecrease(Number.parseInt(value) - 1);
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <input
                onChange={(e) => {
                  onChange(Number(e.target.value))
                  handleChangeQuantity(Number(e.target.value))
                }}
                type="number"
                className="p-1 w-8 text-center"
                value={value}
                disabled={disabled}
              />
            </div>

            <div
              className="p-1 border-l-2 cursor-pointer hover:bg-slate-300 rounded-r-md"
              onClick={() => {
                if (!disabled) {
                  if (max !== undefined && value >= max) return;

                  onChange(Number.parseInt(value) + 1);
                  handleIncrease(Number.parseInt(value) + 1);
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <span className="text-red-500 font-semibold text-xs block">{error?.message}</span>
        </>
      )}
    />
  );
}
