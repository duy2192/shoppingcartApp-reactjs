import classNames from 'classnames';
import { Controller } from 'react-hook-form';

export interface InputFieldProps {
  label?: string;
  name: string;
  form: any;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  type?: string;
  size?: 'sm' | 'md' | 'lg';
  id?: string;
}
function InputField(props: InputFieldProps) {
  const {
    form,
    name,
    label,
    disabled = false,
    placeholder,
    className,
    type = 'text',
    size = 'md',
    id,
  } = props;

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { onChange, onBlur, value = '', name }, fieldState: { error } }) => (
        <>
          <div
            className={classNames(
              className,
              'select-none outline-blue-400 overflow-hidden',
              error && 'outline-red-400 '
            )}
          >
            <input
              type={type}
              id={id}
              className={classNames(
                'w-full p-2 shadow-sm  rounded-md border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800',
                'outline-blue-400',
                error && 'outline-red-400',
                disabled && 'bg-slate-300',
                size === 'sm' && 'p-2',
                size === 'md' && 'p-3',
                size === 'lg' && 'p-4'
              )}
              placeholder={placeholder}
              disabled={disabled}
              value={value}
              onChange={onChange}
            />
            <span className="text-red-500 font-semibold text-xs">{error?.message}</span>
          </div>
        </>
      )}
    />
  );
}

export default InputField;
