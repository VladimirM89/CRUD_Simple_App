import { PATH_SEPARATOR } from "../constants/stringConstants";

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
