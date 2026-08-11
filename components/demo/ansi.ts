/**
 * Tiny ANSI helpers so the demo script reads like prose instead of escape soup.
 *
 * The terminal pane is a real xterm instance, the same library and version the
 * desktop app runs, so colouring here is done exactly the way a CLI would do it.
 */

const CSI = '['
const RESET = `${CSI}0m`

const rgb = (r: number, g: number, b: number) => (text: string) =>
  `${CSI}38;2;${r};${g};${b}m${text}${RESET}`

/** Claude Code's response bullet colour. */
export const accent = rgb(214, 119, 87)
export const dim = rgb(122, 122, 132)
export const white = rgb(228, 228, 235)
export const green = rgb(74, 194, 122)
export const blue = rgb(96, 165, 250)
export const purple = rgb(167, 139, 250)
export const amber = rgb(251, 191, 36)
export const bold = (text: string) => `${CSI}1m${text}${RESET}`
export const italic = (text: string) => `${CSI}3m${text}${RESET}`

export const grey = rgb(150, 150, 160)

/** Joins script lines into something xterm can write. The CR is not optional. */
export const lines = (...rows: string[]) => rows.join('\r\n') + '\r\n'

/**
 * DECTCEM off. xterm's `cursorInactiveStyle` is not enough: it keeps drawing the
 * block whenever it believes it has focus, which leaves a second caret floating
 * in the transcript above the demo's input box. This must be re-sent after every
 * reset(), which restores the terminal's default modes.
 */
export const HIDE_CURSOR = `${CSI}?25l`

/** The escape character that opens every sequence in this file. */
const ESC = CSI[0]

/**
 * Splits text into units that can be written one at a time without ever cutting
 * an escape sequence in half.
 *
 * This is what makes character-by-character typing safe. A naive slice through
 * a colour code would send half of it to the terminal, and everything after
 * would render as literal garbage.
 */
export function typeUnits(text: string): string[] {
  const units: string[] = []
  let i = 0
  while (i < text.length) {
    if (text[i] === ESC) {
      // Consume the whole CSI sequence: ESC, '[', params, then a letter.
      let j = i + 2
      while (j < text.length && !/[a-zA-Z]/.test(text[j])) j++
      units.push(text.slice(i, j + 1))
      i = j + 1
      continue
    }
    // CRLF travels together; splitting it would leave the cursor mid-move.
    if (text[i] === '\r' && text[i + 1] === '\n') {
      units.push('\r\n')
      i += 2
      continue
    }
    units.push(text[i])
    i += 1
  }
  return units
}

/**
 * Paints a pixel sprite into terminal rows.
 *
 * A terminal cell is roughly twice as tall as it is wide, so drawing a sprite
 * with one cell per pixel comes out stretched and, at logo size, plain wrong.
 * The upper-half block character solves it: its foreground paints the top half
 * of the cell and its background the bottom half, giving two square-ish pixels
 * per row. That is how CLI logos are drawn, and it is why the Claude mark lines
 * up with three lines of text instead of drifting out of them.
 *
 * @param rows Sprite rows, one character per pixel. A space means transparent.
 * @param palette Maps a sprite character to a hex colour.
 * @param background Colour shown through transparent pixels.
 * @returns One string per PAIR of sprite rows.
 */
export function sprite(
  rows: string[],
  palette: Record<string, string>,
  background: string
): string[] {
  const rgbOf = (hex: string) => {
    const value = hex.replace('#', '')
    return [
      parseInt(value.slice(0, 2), 16),
      parseInt(value.slice(2, 4), 16),
      parseInt(value.slice(4, 6), 16),
    ]
  }
  const colourAt = (row: string | undefined, x: number) => {
    const char = row?.[x] ?? ' '
    return palette[char] ?? background
  }

  const out: string[] = []
  for (let y = 0; y < rows.length; y += 2) {
    let line = ''
    const width = Math.max(rows[y]?.length ?? 0, rows[y + 1]?.length ?? 0)
    for (let x = 0; x < width; x++) {
      const [tr, tg, tb] = rgbOf(colourAt(rows[y], x))
      const [br, bg, bb] = rgbOf(colourAt(rows[y + 1], x))
      line += `${CSI}38;2;${tr};${tg};${tb}m${CSI}48;2;${br};${bg};${bb}m▀`
    }
    out.push(line + RESET)
  }
  return out
}

/**
 * Rewind N lines and wipe everything below, so a block can be redrawn in place.
 * This is how a real CLI repaints its selector as you move through the options,
 * and doing it the same way is why the demo's selector behaves like one.
 */
export const rewind = (rows: number) => `${CSI}${rows}A${CSI}J`

/** Printed columns a string takes: colour codes are instructions, not ink. */
export function visibleWidth(text: string): number {
  // eslint-disable-next-line no-control-regex
  return text.replace(/\[[0-9;]*[a-zA-Z]/g, '').length
}

/**
 * How many terminal rows a block will really occupy once the terminal has had
 * its say.
 *
 * A block that reports fewer rows than it draws is not a cosmetic problem: the
 * whole live-block mechanism rewinds by that number to redraw itself in place,
 * so an undercount leaves an orphaned line stranded in the transcript and, since
 * the rewind also wipes downwards, a blank hole where the rest of the block was.
 * Counting the wrap here is what keeps the two in agreement.
 */
export function rowsUsed(rows: string[], cols: number): number {
  return rows.reduce(
    (total, row) => total + Math.max(1, Math.ceil(visibleWidth(row) / cols)),
    0
  )
}
