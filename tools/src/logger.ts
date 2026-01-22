/**
 * Simple logger for tools
 */

export const log = {
  info(msg: string): void {
    console.log(`[INFO] ${msg}`);
  },
  error(msg: string): void {
    console.error(`[ERROR] ${msg}`);
  },
  debug(msg: string): void {
    if (process.env.DEBUG) {
      console.log(`[DEBUG] ${msg}`);
    }
  },
  warn(msg: string): void {
    console.warn(`[WARN] ${msg}`);
  }
};
