import "./DeviceFormUI.scss";
import { useRef } from "react";
import StepsAside, { type Step } from "../StepsAside/StepsAside";

export interface Device {
  id: string;
  deviceType: string;
  serialNumber: string;
  bringingOwnDevice: boolean;
  image?: File | null;
  imagePreview?: string;
}

export interface DeviceFormUIProps {
  steps: Step[];
  devices: Device[];
  onDeviceUpdate: (id: string, updates: Partial<Device>) => void;
  onImageUpload: (id: string, file: File | null, preview?: string) => void;
  onNext: () => void;
}

function DeviceFormUI({
  steps,
  devices,
  onDeviceUpdate,
  onImageUpload,
  onNext,
}: DeviceFormUIProps) {
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleFileChange = (
    deviceId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const preview = reader.result as string;
        onImageUpload(deviceId, file, preview);
      };
      reader.readAsDataURL(file);
    } else {
      onImageUpload(deviceId, null, undefined);
    }
  };

  const handleUploadClick = (deviceId: string) => {
    fileInputRefs.current[deviceId]?.click();
  };

  return (
    <div className="device-form-container">
      <div className="steps-aside-container-mobile">
        <StepsAside steps={steps} />
      </div>
      <div className="device-form-layout">
        {/* Steps Aside - Desktop sidebar / Mobile dropdown */}
        <div className="steps-aside-container-desktop">
          <StepsAside steps={steps} />
        </div>

        {/* Main Form Content */}
        <div className="form-content">
          {/* Device Management Section Header */}
          <div className="form-section-header">
            <h2 className="section-title">Device management</h2>
            <p className="form-subtitle">
              Add details of the device, if any already installed on your car.
              If none, then continue to next step.
            </p>
          </div>

          {/* Device Forms */}
          {devices.map((device, index) => (
            <div key={device.id} className="form-section-content">
              <section>
                <div className="device-form-fields-container">
                  <h2 className="form-title">Device {index + 1}</h2>
                  <div className="device-form-fields">
                    {/* Device Type */}
                    <div className="form-field">
                      <label
                        htmlFor={`device-type-${device.id}`}
                        className="field-label"
                      >
                        Device type
                      </label>
                      <input
                        type="text"
                        id={`device-type-${device.id}`}
                        className="form-input"
                        value={device.deviceType}
                        onChange={(e) =>
                          onDeviceUpdate(device.id, {
                            deviceType: e.target.value,
                          })
                        }
                        placeholder="Enter device type"
                      />
                    </div>

                    {/* Serial Number */}
                    <div className="form-field">
                      <label
                        htmlFor={`serial-number-${device.id}`}
                        className="field-label"
                      >
                        Serial number
                      </label>
                      <input
                        type="text"
                        id={`serial-number-${device.id}`}
                        className="form-input"
                        value={device.serialNumber}
                        onChange={(e) =>
                          onDeviceUpdate(device.id, {
                            serialNumber: e.target.value,
                          })
                        }
                        placeholder="Enter the serial number of the device"
                      />
                    </div>
                  </div>
                  <div>
                    {/* Bringing Your Own Device Toggle */}
                    <div className="form-field toggle-field">
                      <div className="toggle-container">
                        <div className="toggle-row">
                          <span className="toggle-text">
                            Bringing your own device?
                          </span>
                          <label
                            htmlFor={`bring-own-device-${device.id}`}
                            className="toggle-wrapper"
                          >
                            <input
                              type="checkbox"
                              id={`bring-own-device-${device.id}`}
                              className="toggle-input"
                              checked={device.bringingOwnDevice}
                              onChange={(e) =>
                                onDeviceUpdate(device.id, {
                                  bringingOwnDevice: e.target.checked,
                                })
                              }
                            />
                            <span className="toggle-slider"></span>
                          </label>
                        </div>
                        <p className="toggle-description">
                          Toggle this on if you're bringing your own device.
                          Leave it off if Drive mate is to provide the device.
                        </p>
                      </div>
                    </div>

                    {/* Upload Image */}
                    <div className="form-field">
                      <label className="field-label">
                        Upload an image of the device
                      </label>
                      <div className="upload-container">
                        <input
                          type="file"
                          ref={(el) => {
                            fileInputRefs.current[device.id] = el;
                          }}
                          accept="image/*"
                          onChange={(e) => handleFileChange(device.id, e)}
                          className="file-input"
                          style={{ display: "none" }}
                        />
                        {device.imagePreview ? (
                          <div className="image-preview-container">
                            <img
                              src={device.imagePreview}
                              alt="Device preview"
                              className="image-preview"
                            />
                            <button
                              type="button"
                              className="remove-image-btn"
                              onClick={() => {
                                onImageUpload(device.id, null, undefined);
                                const fileInput =
                                  fileInputRefs.current[device.id];
                                if (fileInput !== null) {
                                  fileInput.value = "";
                                }
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <div
                            className="upload-box"
                            onClick={() => handleUploadClick(device.id)}
                          >
                            <span className="upload-text">Click to upload</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ))}

          {/* Next Button */}
          <div className="form-actions">
            <button type="button" className="btn-next" onClick={onNext}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeviceFormUI;
