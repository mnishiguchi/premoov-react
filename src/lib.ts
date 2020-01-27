import { VolumeUnit } from './types';

const FT3_PER_M3 = 35.3146667;

export const VOLUME_UNIT_M3 = 'm3' as VolumeUnit;
export const VOLUME_UNIT_FT3 = 'ft3' as VolumeUnit;

// https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
const round = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

export const convertM3ToFt3 = (value: number) => round(value * FT3_PER_M3);

export const convertFt3ToM3 = (value: number) => round(value / FT3_PER_M3);

export const displayVolumeValue = (value: number, volumeUnit: VolumeUnit) =>
  round(volumeUnit === VOLUME_UNIT_FT3 ? convertM3ToFt3(value) : value);

export const gmapPlaceLink = (address: string) =>
  `https://www.google.com/maps/place/${encodeURI(address)}`;

export const gmapDirectionLink = (addressFrom: string, addressTo: string) =>
  `https://www.google.com/maps/dir/${encodeURI(addressFrom || '')}/${encodeURI(addressTo || '')}`;
