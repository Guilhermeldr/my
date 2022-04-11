// Generates UUID v4 (random) and stores it in localStorage
// Retrieves from local storage next time its called or regenerates
export function getDeviceIdentifier() {
  let deviceId = localStorage.getItem("deviceId");
  if (!deviceId) {
    deviceId = uuid();
    localStorage.setItem("deviceId", deviceId);
  }
  return deviceId;
}

function uuid(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
    let random = (Math.random() * 16) | 0;
    let value = char === "x" ? random : (random % 4) + 8;
    return value.toString(16);
  });
}
