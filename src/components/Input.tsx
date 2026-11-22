type InputProps = React.ComponentProps<"input">;

function Input({ id, placeholder, ...props }: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      <input
        id={id}
        placeholder={placeholder}
        {...props}
        className="w-full rounded-lg p-2"
      />
    </div>
  );
}

export default Input;
