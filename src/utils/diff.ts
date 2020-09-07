import assert from './assert';

function is(x: unknown, y: unknown): boolean {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

export default function diff(
  oldValue: AnyObject,
  newValue: AnyObject,
  target: AnyObject = {},
  path: string[] = ['store']
): AnyObject {
  assert(path.length === 5, '数据层级不能超过 5 层');

  Object.keys(newValue).forEach((key: string) => {
    const oldKeyValue = oldValue[key];
    const newKeyValue = newValue[key];
    const currentPath = [...path, `['${key}']`];

    if (is(oldKeyValue, newKeyValue)) {
      return;
    }

    if (
      typeof oldKeyValue !== 'object' ||
      oldKeyValue === null ||
      typeof newKeyValue !== 'object' ||
      newKeyValue === null
    ) {
      target[currentPath.join('')] = newKeyValue;
      return;
    }

    if (Object.keys(oldKeyValue).length !== Object.keys(newKeyValue).length) {
      target[currentPath.join('')] = newKeyValue;
      return;
    }

    diff(oldKeyValue, newKeyValue, target, currentPath);
  });

  return target;
}
