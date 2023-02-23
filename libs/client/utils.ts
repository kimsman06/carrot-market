export function cls(...classnames: string[]) {
  return classnames.join(" ");
}
export function Time(date: string) {
  return new Date(date).toLocaleString();
}
