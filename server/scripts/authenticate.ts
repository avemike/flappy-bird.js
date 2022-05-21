import { v4 as uuidv4 } from "uuid";

const keys: string[] = [];

export function generateKey(): string {
  const key = uuidv4();

  keys.push(key);

  return key;
}

export function authenticateKey(key: string): boolean {
  if (keys.includes(key)) return true;

  return false;
}

function deleteKey(keyToBeDeleted: string) {
  keys.filter((key) => key !== keyToBeDeleted);
}

export function useKey(): string {
  const key = generateKey();

  const minute = 1000 * 60;
  const timeout = minute * 5;

  setTimeout(() => deleteKey(key), timeout);

  return key;
}

// TODO rewrite this to functional
