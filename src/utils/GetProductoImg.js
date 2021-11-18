import placeholder from "../placeholder.jpg";

export function GetProductoImg(path) {
  return path
    ?  path
    : placeholder;
}
