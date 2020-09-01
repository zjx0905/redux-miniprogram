export default function serializeCopy(obj: AnyObject): AnyObject {
  return JSON.parse(JSON.stringify(obj));
}
