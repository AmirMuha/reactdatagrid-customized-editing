import compact from "lodash.compact";

export default function sc(...classes: string[]) {
  return compact(classes).join(" ");
}
