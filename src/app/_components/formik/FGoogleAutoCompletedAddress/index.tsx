import React, { memo, useCallback } from "react";
import { usePlacesWidget } from "react-google-autocomplete";

import { GOOGLE_MAP_API_KEY } from "@/constant/common.constant";

import FTextInputWithRef from "../FTextInputWithRef";

import { useFormikContext } from "formik";

interface FGoogleAutoCompletedAddressProps {
  isEdit?: boolean;
  name: string;
  label?: string;
  isDivider?: boolean;
  cityFiledName?: string;
  stateFiledName?: string;
  zipcodeFiledName?: string;
  isRequired?: boolean;
  placeholder?: string;
  classNames?: string;
}

function FGoogleAutoCompletedAddress({
  isEdit,
  name,
  label,
  isDivider = true,
  cityFiledName,
  stateFiledName,
  zipcodeFiledName,
  isRequired = false,
  placeholder = "",
  classNames,
}: FGoogleAutoCompletedAddressProps) {
  const { setFieldValue } = useFormikContext();
  const handlePlaceSelected = useCallback((place: any) => {
    if (place.address_components) {
      const addressComponents = place.address_components;

      const getComponent = (type: any) => {
        const component = addressComponents.find((comp: any) =>
          comp.types.includes(type),
        );
        return component ? component.long_name : "";
      };

      const formattedAddress = {
        street: getComponent("street_number") + " " + getComponent("route"),
        city: getComponent("locality"),
        state: getComponent("administrative_area_level_1"),
        zipcode: getComponent("postal_code"),
      };
      setFieldValue(name, formattedAddress.street);
      cityFiledName && setFieldValue(cityFiledName, formattedAddress.city);
      stateFiledName && setFieldValue(stateFiledName, formattedAddress.state);
      zipcodeFiledName &&
        setFieldValue(zipcodeFiledName, formattedAddress.zipcode);
    }
  }, []);
  const { ref: inputRefStreet } = usePlacesWidget({
    apiKey: GOOGLE_MAP_API_KEY,
    onPlaceSelected: handlePlaceSelected,
    options: { types: ["address"] },
  });

  return (
    <FTextInputWithRef
      label={label}
      name={name}
      isRequired={isRequired}
      placeholder={placeholder}
      editable={isEdit}
      onBlur={() => {
        // validateField(name);
      }}
      isDivider={isDivider}
      ref={inputRefStreet as any}
      classNames={classNames}
    />
  );
}

export default memo(FGoogleAutoCompletedAddress);
