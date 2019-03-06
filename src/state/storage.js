import LZString from 'lz-string';

const getState = () => {
  if (!window.location.hash) {
    return undefined;
  }

  const hashContent = window.location.hash.substring(1);
  const decompressed = LZString.decompressFromEncodedURIComponent(hashContent);

  if (!decompressed) {
    throw new Error('Could not decompress state');
  }

  const version = decompressed.substring(0, 4).replace(/:/g, '');
  const json = decompressed.substring(4);

  return { version, data: JSON.parse(json) };
};

const saveState = (state) => {
  window.location.hash = LZString.compressToEncodedURIComponent(`v1::${JSON.stringify(state)}`);

  return window.location.hash;
};

export { getState, saveState };
