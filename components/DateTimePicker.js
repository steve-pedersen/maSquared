import React, { useState } from "react";
import { Button, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
 
const DateTimePicker = ({ mode, text, currentDateTime, callbackHandler }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
 
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
 
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
 
  const handleConfirm = (date) => {
    // console.log("A date has been picked: ", date);
    callbackHandler(date);
    hideDatePicker();
  };
 
  return (
    <View>
      <Button title={text} onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={mode}
        date={currentDateTime}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};
 
export default DateTimePicker;