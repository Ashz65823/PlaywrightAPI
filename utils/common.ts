import { expect } from "@playwright/test";

/**
 * Formats a string by replacing placeholders like {0}, {1}, etc. with corresponding arguments.
 * @param str - The string containing placeholders.
 * @param args - The values to insert into the placeholders.
 * @returns A formatted string.
 */
export const stringFormat = (
  str: string,
  ...args: (string | number)[]
): string =>
  str.replace(/{(\d+)}/g, (match, index) => {
    const replacement = args[parseInt(index)];
    return replacement !== undefined ? replacement.toString() : "";
  });
