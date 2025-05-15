export const getScopeShape = (shape: string, graphScope?: string) => {
  return `${graphScope ? `${graphScope}@` : ''}${shape}`;
}
