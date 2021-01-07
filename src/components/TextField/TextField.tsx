import { useField } from "formik";
import TextInput from "src/components/TextInput";

interface Props {
  name: string;
  label: string;
}

const TextField: React.FC<Props> = ({ name, label }) => {
  const [field, meta] = useField(name);
  return (
    <>
      <label
        htmlFor={name}
        className="inline-flex items-baseline space-x-3 px-3"
      >
        <span className="font-semibold text-lg text-center">{label}</span>
        <TextInput id={name} {...field} />
      </label>
      {meta.touched && meta.error ? (
        <div className="text-red-500 mt-1 text-xs">{meta.error}</div>
      ) : null}
    </>
  );
};

export default TextField;
