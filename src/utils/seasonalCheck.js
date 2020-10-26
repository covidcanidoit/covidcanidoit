function isHalloween() {
  const today = new Date();
  if (today.getUTCMonth() === 9) {
    if (today.getUTCDate() >= 25 && today.getUTCDate() <= 31) {
      return true;
    }
  }
  return false;
}

export default function getSeasonalEvent() {
  if (isHalloween()) {
    return "halloween";
  }
  return "x";
}
