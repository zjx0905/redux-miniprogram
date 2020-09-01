export default function isEmptyObject(obj: AnyObject): boolean {
  return obj !== null && typeof obj === 'object' && Object.keys(obj).length === 0;
}
