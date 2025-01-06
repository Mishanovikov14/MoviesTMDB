import { Colors } from "@/src/constants/Colors";
import { Ref, forwardRef } from "react";
import { Control, Controller, FieldErrors, FieldValues, Path } from "react-hook-form";
import { TextInput, StyleSheet, TextInputProps, Text } from "react-native";

interface FormInputControllerProps<T extends FieldValues> {
  control: Control<T>;
  errors: FieldErrors<T>;
  name: Path<T>;
  placeholder: string;
  props?: TextInputProps;
}

const FormInputController = forwardRef(
  <T extends FieldValues>(
    { name, control, placeholder, errors, props }: FormInputControllerProps<T>,
    ref: Ref<TextInput>
  ) => {
    return (
      <>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              ref={ref}
              value={value}
              placeholderTextColor={Colors.DARK_GREY}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={[
                styles.input,
                { borderColor: errors[name]?.message ? Colors.ERROR : Colors.PRIMARY },
              ]}
              {...props}
            />
          )}
        />

        {errors[name]?.message && (
          <Text style={styles.textError}>{(errors[name]?.message as string) || "Error"}</Text>
        )}
      </>
    );
  }
);

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    padding: 10,
    marginTop: 5,
    backgroundColor: Colors.LIGHT_GREY,
    borderRadius: 5,
  },

  textError: {
    color: Colors.ERROR,
    marginTop: 5,
  },
});

export default FormInputController;
