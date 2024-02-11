/* eslint-disable no-restricted-syntax */
import { sep, normalize } from "path";
import { PATH_SEPARATOR } from "../constants/stringConstants";
import { Endpoints } from "../constants/enums/serverEnums";

export function getIdFromPath(path: string) {
  const pathArray = path.split(PATH_SEPARATOR);
  const id = pathArray.pop();
  return id;
}

export function checkIsPathIdentical(path: Array<string>) {
  const [pathFirst, pathSecond] = path;

  const pathFirstSections = pathFirst
    .split(PATH_SEPARATOR)
    .filter((section) => section !== PATH_SEPARATOR);

  const pathSecondSections = pathSecond
    .split(PATH_SEPARATOR)
    .filter((section) => section !== PATH_SEPARATOR);

  return pathFirstSections.length === pathSecondSections.length;
}

export function pathNormalize(path: string): string {
  const normalizedPath = normalize(path).trim().replaceAll(sep, PATH_SEPARATOR);
  if (normalizedPath[normalizedPath.length - 1] === PATH_SEPARATOR) {
    return normalizedPath.slice(0, -1);
  }
  return normalizedPath;
}

export function checkIsEndpointValid(path: string): boolean {
  const endpointsArr = Object.values(Endpoints) as Array<string>;
  const baseEndpointsArr = endpointsArr.includes(path);
  return baseEndpointsArr;
}
