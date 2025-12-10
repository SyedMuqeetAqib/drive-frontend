import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Device {
  id: string;
  deviceType: string;
  serialNumber: string;
  bringingOwnDevice: boolean;
  image?: File | null;
  imagePreview?: string;
}

interface DeviceState {
  devices: Device[];
  currentStep: "device" | "easy-access";
}

const initialState: DeviceState = {
  devices: [
    {
      id: "device-1",
      deviceType: "Primary GPS",
      serialNumber: "",
      bringingOwnDevice: true,
      image: null,
      imagePreview: undefined,
    },
    {
      id: "device-2",
      deviceType: "Secondary GPS",
      serialNumber: "",
      bringingOwnDevice: true,
      image: null,
      imagePreview: undefined,
    },
  ],
  currentStep: "device",
};

const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    updateDevice: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<Device> }>
    ) => {
      const device = state.devices.find((d) => d.id === action.payload.id);
      if (device) {
        Object.assign(device, action.payload.updates);
      }
    },
    setDeviceImage: (
      state,
      action: PayloadAction<{
        id: string;
        image: File | null;
        preview?: string;
      }>
    ) => {
      const device = state.devices.find((d) => d.id === action.payload.id);
      if (device) {
        device.image = action.payload.image;
        device.imagePreview = action.payload.preview;
      }
    },
    setCurrentStep: (
      state,
      action: PayloadAction<"device" | "easy-access">
    ) => {
      state.currentStep = action.payload;
    },
    resetDevices: (state) => {
      state.devices = initialState.devices;
      state.currentStep = initialState.currentStep;
    },
  },
});

export const { updateDevice, setDeviceImage, setCurrentStep, resetDevices } =
  deviceSlice.actions;

export default deviceSlice.reducer;
