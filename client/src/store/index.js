import { proxy } from "valtio";

const state = proxy({
    intro: true,
    color: '#EFBD48',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: './air-jordan-logo.svg',
    fullDecal: './threejs.png'
});

export default state;