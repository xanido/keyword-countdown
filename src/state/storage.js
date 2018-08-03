import LZString from "lz-string"

const getState = () => {
    if(window.location.hash) {
        const decompressed = LZString.decompressFromEncodedURIComponent(window.location.hash.substring(1))
        if(decompressed) {
            const version = decompressed.substring(0, 4).replace(/:/g, '')
            const json = decompressed.substring(4)
            return {version, data: JSON.parse(json) }
        } else {
            throw new Error("Could not decompress state")
        }
    }
}

const saveState = (state) => {
    window.location.hash = LZString.compressToEncodedURIComponent("v1::" + JSON.stringify(state));
}


export {getState, saveState}