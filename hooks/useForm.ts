import { useState, useCallback } from "react";

export const useForm = (initialState: any, onSubmit: any) => {
  const [values, setValues] = useState<Partial<typeof initialState>>(initialState);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setValues((values) => ({ ...values, [event.target.name]: event.target.value }));
  }, []);

  const handleSubmit = useCallback(
    (event: React.SyntheticEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmit?.(values);
      setValues(initialState);
    },
    [onSubmit]
  );

  return {
    values,
    handleChange,
    handleSubmit,
  };
};
