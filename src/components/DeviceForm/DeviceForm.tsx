import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { updateDevice, setDeviceImage } from "../../store/slices/deviceSlice";
import { FORM_STEPS } from "../../constants/subscriptionConstants";
import DeviceFormUI from "../../ui/DeviceFormUI/DeviceFormUI";
import type { Device } from "../../ui/DeviceFormUI/DeviceFormUI";

function DeviceForm({ onNext }: { onNext: () => void }) {
  const dispatch = useAppDispatch();
  const devices = useAppSelector((state) => state.device.devices);

  // Update steps to show Device as active and Subscription as completed
  const deviceSteps = FORM_STEPS.map((step) => ({
    ...step,
    active: step.id === "device",
    completed:
      step.id === "subscription" || (step.id !== "device" && step.completed),
  }));

  const handleDeviceUpdate = (id: string, updates: Partial<Device>) => {
    dispatch(updateDevice({ id, updates }));
  };

  const handleImageUpload = (
    id: string,
    file: File | null,
    preview?: string
  ) => {
    dispatch(setDeviceImage({ id, image: file, preview }));
  };

  return (
    <DeviceFormUI
      steps={deviceSteps}
      devices={devices}
      onDeviceUpdate={handleDeviceUpdate}
      onImageUpload={handleImageUpload}
      onNext={onNext}
    />
  );
}

export default DeviceForm;
