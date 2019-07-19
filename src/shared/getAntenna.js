// @ts-ignore
import window from "global/window";
import Antenna from "iotex-antenna";
import process from "global/process";

export function getAntenna(): Antenna {
  const injectedWindow: Window & { antenna?: Antenna } = window;
  if (injectedWindow.antenna) {
    return injectedWindow.antenna;
  }
  injectedWindow.antenna = new Antenna("https://iotexscan.io/iotex-core-proxy");
  return injectedWindow.antenna;
}
