export default function mixinInitData(options: AnyObject, state: AnyObject): AnyObject {
  return {
    ...options,
    data: { ...(options.data ?? {}), store: state },
  };
}
