import React, { useState, getState } from "react";
import { Button, View } from "react-native";
import DateTimePickerModal, {
  CancelButton,
  cancelButtonStyles,
  ConfirmButton,
  confirmButtonStyles,
} from "react-native-modal-datetime-picker";

const DateTimePicker = ({ mode, text, currentDateTime, callbackHandler }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    callbackHandler(date);
    hideDatePicker();
  };

  const CustomCancelButton = () => (
    <CancelButton
      onPress={hideDatePicker}
      label='Cancel'
      style={{
        ...cancelButtonStyles,
        text: {
          ...cancelButtonStyles.text,
          color: "#b16d65",
        },
      }}
    />
  );

  const CustomConfirmButton = () => (
    <ConfirmButton
      label='Confirm'
      onPress={handleConfirm}
      style={{
        ...confirmButtonStyles,
        button: {
          ...confirmButtonStyles.button,
          backgroundColor: "#74b783",
        },
        text: {
          ...confirmButtonStyles.text,
          // color: "#74b783",
          color: "#fff",
          fontWeight: "600",
        },
      }}
    />
  );

  return (
    <View>
      <Button title={text} onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={mode}
        date={currentDateTime}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        customCancelButtonIOS={CustomCancelButton}
        // customConfirmButtonIOS={CustomConfirmButton}
      />
    </View>
  );
};

export default DateTimePicker;
