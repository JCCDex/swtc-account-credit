/**
 * is main net or not
 *
 * @returns {boolean}
 */
const isMainnet = (): boolean => {
  return process.env.MAINNET === "true";
};

export { isMainnet };
