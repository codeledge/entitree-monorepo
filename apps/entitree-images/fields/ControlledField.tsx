import React, { FC, useEffect } from "react";
import { TextInput, TextInputProps } from "react-admin";

import { useFormContext } from "react-hook-form";

export const ControlledField: FC<TextInputProps> = ({
  value,
  source,
  ...props
}) => {
  const form = useFormContext();

  useEffect(() => {
    form.setValue(source, value);
  }, [form, source, value]);

  return <TextInput source={source} {...props} />;
};
