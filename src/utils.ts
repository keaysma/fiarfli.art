// Turns any given string into a snake-case string
// Used for quick-finding art pieces
// Hangin' (full color) -> hangin-full-color
export const getShortcutFromTitle = (title: string) => {
  return title
    .replaceAll(/[^A-Za-z0-9 ]/g, " ") // Turn all non-alphanumeric characters into spaces
    .replaceAll(/[ ]+/g, "-") // Condense all groups of spaces into '-'
    .replace(/-$/, "") // If there's a trailing '-' remove it
    .toLowerCase(); // All lowercase
}