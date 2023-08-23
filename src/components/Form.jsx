/* eslint-disable react/react-in-jsx-scope */
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { Colors, Font, Styled } from "../Styled"
import { Controller } from "react-hook-form"
import _ from "lodash"
import RNPickerSelect from "react-native-picker-select"
import { useEffect, useState } from "react"
import DatePicker from "react-native-date-picker"
import dayjs from "dayjs"
import buddhistEra from "dayjs/plugin/buddhistEra"
import { t } from "i18n-js"
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown"

dayjs.extend(buddhistEra)

export const FormItem = ({
  onChange,
  value,
  label,
  Form,
  name,
  rules,
  error,
  type,
  children,
  ...rest
}) => {
  const {
    control,
    formState: { errors }
  } = Form

  return (
    <View
      style={{
        marginBottom: 23.5
      }}
    >
      <View
        style={{
          borderColor: Colors.detailTextDay,
          borderBottomWidth: 0.5
        }}
      >
        <Text
          style={{
            ...Styled.context,
            color: Colors.textday,
            marginBottom: 3
          }}
        >
          {label}{" "}
        </Text>

        <View
          style={{
            marginBottom: 7.5
          }}
        >
          {children}
        </View>
      </View>
      {_.get(errors, name, false) && (
        <Text
          style={{
            ...Styled.title,
            color: "red"
          }}
        >
          {error}
        </Text>
      )}
    </View>
  )
}

export const InputForm = ({
  onChange,
  value,
  label,
  Form,
  name,
  rules,
  error,
  type,
  validate,
  placeholder,
  helper,
  ...rest
}) => {
  const {
    control,
    formState: { errors },
    setValue
  } = Form

  const [inputValue, setInputValue] = useState(value)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const handleInputChange = (newValue) => {
    setInputValue(newValue)
    setValue(name, newValue) // Update the form value
    if (onChange) {
      onChange(newValue) // Call the onChange callback if provided
    }
  }

  return (
    <View
      style={{
        marginBottom: 23.5
      }}
    >
      <View
        style={{
          borderColor: Colors.detailTextDay,
          borderBottomWidth: 0.5
        }}
      >
        <Text
          style={{
            ...Styled.context,
            color: Colors.textday,
            marginBottom: 3
          }}
        >
          {label}{" "}
        </Text>

        <Controller
          control={control}
          rules={rules}
          name={name}
          render={({ field: { onChange, onBlur } }) => {
            return (
              <>
                <TextInput
                  style={{
                    ...Styled.title,
                    color: Colors.titleday,
                    height: type === "textarea" ? 100 : 40,
                    flexWrap: "wrap",
                    textAlignVertical: "top"
                  }}
                  multiline={type === "textarea"}
                  autoCapitalize={"none"}
                  onBlur={onBlur}
                  onChangeText={handleInputChange}
                  value={inputValue}
                  placeholder={placeholder}
                  placeholderTextColor={Colors.detailTextDay}
                  {...rest}
                />
              </>
            )
          }}
        />
      </View>
      {helper ? (
        <Text
          style={{
            ...Font.small,
            color: Colors.textday,
            marginBottom: 10,
            marginTop: 4
          }}
        >
          {helper}
        </Text>
      ) : (
        <></>
      )}
      {_.get(errors, name, false) && (
        <Text
          style={{
            ...Styled.title,
            color: "red"
          }}
        >
          {_.get(errors, `${name}.message`, t("required"))}
        </Text>
      )}
    </View>
  )
}

export const DateForm = ({
  onChange,
  value,
  label,
  Form,
  name,
  rules,
  error,
  type,
  ...rest
}) => {
  const {
    control,
    formState: { errors },
    setValue
  } = Form

  const [inputValue, setInputValue] = useState(dayjs().toDate())

  useEffect(() => {
    setInputValue(dayjs(value).toDate() || dayjs().toDate())
  }, [value])

  const handleInputChange = (newValue) => {
    setInputValue(newValue)
    setValue(name, newValue) // Update the form value
    if (onChange) {
      onChange(newValue) // Call the onChange callback if provided
    }
  }

  const [open, setOpen] = useState(false)

  return (
    <View
      style={{
        marginBottom: 23.5
      }}
    >
      <View
        style={{
          borderColor: Colors.detailTextDay,
          borderBottomWidth: 0.5
        }}
      >
        <Text
          style={{
            ...Styled.context,
            color: Colors.textday,
            marginBottom: 3
          }}
        >
          {label}{" "}
        </Text>

        <Controller
          control={control}
          rules={rules}
          render={({ field: { onChange, onBlur, value = new Date() } }) => (
            <View
              style={{
                ...Styled.title,

                marginBottom: 7.5
              }}
            >
              <DatePicker
                modal
                mode={"date"}
                open={open}
                date={dayjs(inputValue).toDate()}
                onDateChange={(date) => handleInputChange(date)}
                onConfirm={(date) => {
                  setOpen(false)
                  handleInputChange(date)
                }}
                onCancel={() => {
                  setOpen(false)
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setOpen(true)
                }}
              >
                <Text
                  style={{
                    ...Styled.title
                  }}
                >
                  {dayjs(inputValue).format("DD/MM/BBBB")}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          name={name}
        />
      </View>
      {_.get(errors, name, false) && (
        <Text
          style={{
            ...Styled.title,
            color: "red"
          }}
        >
          {error}
        </Text>
      )}
    </View>
  )
}

export const OptionsForm = ({
  onChange,
  label,
  Form,
  name,
  rules,
  error,
  options,
  placeholder,
  value,
  ...rest
}) => {
  const {
    control,
    formState: { errors },
    setValue
  } = Form

  const handleInputChange = (newValue) => {
    setValue(name, newValue) // Update the form value
    if (onChange) {
      onChange(newValue) // Call the onChange callback if provided
    }
  }

  return (
    <View
      style={{
        marginBottom: 23.5
      }}
    >
      <View
        style={{
          borderColor: Colors.detailTextDay,
          borderBottomWidth: 0.5
        }}
      >
        <Text
          style={{
            ...Styled.context,
            color: Colors.textday,
            marginBottom: 3
          }}
        >
          {label}{" "}
        </Text>

        <Controller
          control={control}
          rules={rules}
          render={({ field: { onChange, onBlur, _value } }) =>
            options ? (
              <AutocompleteDropdown
                dataSet={options}
                clearOnFocus={false}
                closeOnBlur={true}
                textInputProps={{
                  placeholder: placeholder || ""
                }}
                inputContainerStyle={{
                  backgroundColor: "transparent",
                  ...Font.context
                }}
                suggestionsListTextStyle={{
                  ...Font.context
                }}
                containerStyle={{
                  ...Font.context,
                  marginLeft: -10
                }}
                initialValue={{ id: value }}
                onSelectItem={(__value) => {
                  handleInputChange(__value ? __value.id : undefined)
                }}
                debounce={600}
              />
            ) : (
              <></>
            )
          }
          name={name}
        />
      </View>
      {_.get(errors, name, false) && (
        <Text
          style={{
            ...Styled.title,
            color: "red"
          }}
        >
          {error}
        </Text>
      )}
    </View>
  )
}
