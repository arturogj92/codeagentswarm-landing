import { AGENTS } from './agents'
import { accent, dim, green, grey, lines, white } from './ansi'
import { PROJECTS } from './projects'
import type { DemoScript, DemoTerminal } from './types'

/**
 * The demo's screenplay.
 *
 * Editing the demo should mean editing THIS file and nothing else. Timings are in
 * milliseconds from the start of the loop; the engine replays them and restarts.
 *
 * The work is set in Arturo's real projects, so the terminal titles, goals and
 * output all have to belong to them: a row labelled "codeagentswarm" whose agent
 * is talking about a shopping cart is exactly the kind of seam that makes a demo
 * read as staged.
 *
 * The story, in order: agents work in parallel without supervision, one of them
 * needs a human and says so, the human answers and it goes back to work, finished
 * work moves out of the way, and all of it happens across five CLIs in one window.
 */

const claude = AGENTS.claude
const codex = AGENTS.codex
const kimi = AGENTS.kimi
const agy = AGENTS.antigravity
const oc = AGENTS.opencode

const TERMINALS: DemoTerminal[] = [
  {
    id: 1,
    title: 'Terminal notifications',
    goal: 'Get told when an agent finishes, without watching the window',
    activity: 'Making the badge count only what you have not seen',
    project: PROJECTS.swarm,
    agent: 'claude',
    status: 'working',
    elapsed: '12m',
    todos: [
      'Find every place the notification count is written',
      'Make the badge count only unseen terminals',
      'Clear it when the terminal is opened',
      'Cover it with a test that fails on the old code',
    ],
    todoIndex: 1,
    backlog: [
      lines(
        `${claude.bullet} ${white('The count is written from three different places, which is why it drifts.')}`,
        `  ${white('Reading all three before I touch any of them.')}`,
        '',
        claude.tool('Grep', 'setBadgeCount'),
        claude.result('3 files, 7 matches'),
        '',
      ),
    ],
  },
  {
    id: 2,
    title: 'Voice note sync',
    goal: 'Keep recordings in sync across devices without duplicates',
    activity: 'Deciding how to spot a recording we already have',
    project: PROJECTS.memois,
    agent: 'kimi',
    status: 'working',
    elapsed: '8m',
    todos: [
      'See how recordings are identified today',
      'Decide what makes two recordings the same',
      'Write the merge that runs on every sync',
      'Try it with the same note recorded twice',
    ],
    todoIndex: 1,
    backlog: [
      lines(
        `${kimi.bullet} ${white('Recordings are keyed by filename, so the same note saved on two devices')}`,
        `  ${white('lands twice. That is the whole bug.')}`,
        '',
        kimi.tool('shell', 'rg -n "recordingId|filename" src/sync'),
        kimi.result('11 matches across 4 files'),
        '',
      ),
    ],
  },
  {
    id: 3,
    title: 'Scan cancel button',
    goal: 'Let people stop a disk scan without killing the app',
    activity: 'Making the scan check for a stop signal',
    project: PROJECTS.diskito,
    agent: 'codex',
    status: 'working',
    elapsed: '21m',
    todos: [
      'Find where the scan loop runs',
      'Make it check for a stop signal',
      'Wire the button and keep partial results',
      'Push to develop',
    ],
    todoIndex: 1,
    backlog: [
      lines(
        `${codex.prompt} ${white('add a cancel button to the scan, and keep whatever it already found')}`,
        '',
        `${codex.bullet} ${white('The scan walks the tree in one uninterruptible pass, so cancelling means')}`,
        `  ${white('giving it something to check between directories.')}`,
        codex.tool('Read', 'src/scanner/walk.ts'),
        '',
      ),
    ],
  },
  {
    id: 4,
    title: 'Subscription webhooks',
    goal: 'Handle failed payments without losing the subscription',
    activity: 'Waiting: what happens after the third failed charge?',
    project: PROJECTS.swarm,
    agent: 'claude',
    status: 'needs_input',
    elapsed: '4m',
    notified: true,
    backlog: [
      lines(
        `${claude.bullet} ${white('Retries are handled and the webhook is idempotent now, so a replayed')}`,
        `  ${white('event cannot double-charge anyone.')}`,
        '',
        claude.tool('Edit', 'src/billing/webhooks.js'),
        claude.result('+96 −12'),
        '',
        claude.tool('Bash', 'npm test -- billing'),
        claude.result('24 passed'),
        '',
      ),
    ],
    prompt: {
      question: 'Retries are done. What should happen after the third failed charge?',
      options: [
        {
          label: 'Freeze the account',
          description: 'Lock Pro but keep every task, terminal and conversation. One good charge puts it all back.',
          reply: lines(
            `${claude.bullet} ${white('Freezing it is. Nothing is deleted, Pro just switches off, and a single')}`,
            `  ${white('successful charge restores everything. Writing that now.')}`,
            '',
            claude.tool('Edit', 'src/billing/dunning.js'),
            claude.result('+74 −11'),
            '',
          ),
          activity: 'Freezing the account instead of downgrading',
        },
        {
          label: 'Downgrade to free',
          description: 'Drop them to the free tier straight away. Simpler to reason about, harder to undo.',
          reply: lines(
            `${claude.bullet} ${white('Downgrading, then. I will keep the Pro data for 30 days so an upgrade')}`,
            `  ${white('restores it instead of starting from scratch.')}`,
            '',
            claude.tool('Edit', 'src/billing/downgrade.js'),
            claude.result('+58 −4'),
            '',
          ),
          activity: 'Downgrading the plan after the third failure',
        },
        {
          label: 'Ask them first',
          description: 'Email a retry link and wait 72 hours before touching the plan at all.',
          reply: lines(
            `${claude.bullet} ${white('Nothing changes for 72 hours then. I will send the retry link and only')}`,
            `  ${white('act if it goes unanswered.')}`,
            '',
            claude.tool('Edit', 'src/billing/dunning.js'),
            claude.result('+61 −9'),
            '',
          ),
          activity: 'Emailing a retry link before touching the plan',
        },
      ],
    },
  },
  {
    id: 5,
    title: 'Enemy AI pass',
    goal: 'Enemies that flank instead of walking straight at you',
    activity: 'Finished: they break off and come round the side',
    project: PROJECTS.megakill,
    agent: 'opencode',
    status: 'needs_testing',
    elapsed: '35m',
    backlog: [
      lines(
        `${oc.bullet} ${white('They break formation at range now and come round the side instead of')}`,
        `  ${white('queueing up in front of you. Worth playing a round to feel it.')}`,
        '',
        oc.tool('bash', 'godot --headless --run-tests ai'),
        oc.result('34 passed'),
        '',
      ),
    ],
  },
  {
    id: 6,
    title: 'Save system',
    goal: 'Save anywhere and come back to exactly the same state',
    activity: 'Waiting: how much should a save actually keep?',
    project: PROJECTS.ghosty,
    agent: 'antigravity',
    status: 'needs_input',
    elapsed: '6m',
    notified: true,
    backlog: [
      lines(
        `${agy.bullet} ${white('Every entity can serialise itself now, so a save is one walk of the scene')}`,
        `  ${white('tree instead of a hand-written list that goes stale.')}`,
        '',
        agy.tool('edit', 'src/save/Serializable.cs'),
        agy.result('+142 −38'),
        '',
      ),
    ],
    prompt: {
      question: 'Serialisation is in. How much should a save actually keep?',
      options: [
        {
          label: 'The whole world',
          description: 'Every entity, exactly where it stood. Perfect restores, bigger files, slower saves.',
          reply: lines(
            `${agy.bullet} ${white('Full world state then. Saves get heavier, so I will compress them and')}`,
            `  ${white('write on a background thread to keep the frame time flat.')}`,
            '',
            agy.tool('edit', 'src/save/SaveGame.cs'),
            agy.result('+96 −12'),
            '',
          ),
          activity: 'Saving the whole world and compressing it',
        },
        {
          label: 'Checkpoints only',
          description: 'Room, inventory and progress. Tiny saves, but enemies reset when you load.',
          reply: lines(
            `${agy.bullet} ${white('Checkpoints it is. Room, inventory and flags, so a save stays under a')}`,
            `  ${white('kilobyte and loads instantly.')}`,
            '',
            agy.tool('edit', 'src/save/SaveGame.cs'),
            agy.result('+41 −12'),
            '',
          ),
          activity: 'Saving checkpoints instead of the whole world',
        },
      ],
    },
  },
  {
    id: 7,
    title: 'Level loader',
    goal: 'Stream levels in without a loading screen between rooms',
    activity: 'Pushed: rooms stream in while you walk',
    project: PROJECTS.bones,
    agent: 'claude',
    status: 'pushed',
    elapsed: '2h',
    backlog: [
      lines(
        `${claude.bullet} ${white('Neighbouring rooms load in the background as you approach, so the screen')}`,
        `  ${white('never goes black between them. Pushed to develop.')}`,
        '',
        claude.tool('Bash', 'git push'),
        claude.result('develop → origin/develop'),
        '',
      ),
    ],
  },
  {
    id: 8,
    title: 'Menu rework',
    goal: 'A main menu that works with pad, keyboard and mouse',
    activity: 'Pushed: the menu takes pad, keyboard and mouse',
    project: PROJECTS.megakill,
    agent: 'opencode',
    status: 'pushed',
    elapsed: '5h',
    backlog: [
      lines(
        `${oc.bullet} ${white('One focus model for all three inputs, so the pad no longer fights the')}`,
        `  ${white('mouse for the highlight. Pushed.')}`,
        '',
      ),
    ],
  },
]

/**
 * What the demo actually opens with, for the copy to count.
 *
 * Exported because the surrounding prose counts these out loud, and a number
 * typed into a translation file goes stale the first time this list changes.
 * All of them already had: the captions claimed six agents and three projects
 * while the script opened eight and six, and narrated a "checkout" terminal
 * that had not existed for versions.
 *
 * The rule this pays for: copy about the demo names the RULE, never the
 * instance. No terminal titles, and any count comes from here.
 */
export const TERMINAL_COUNT = TERMINALS.length
export const PROJECT_COUNT = new Set(TERMINALS.map((t) => t.project.name)).size

const script: DemoScript = {
  duration: 78_000,
  initialSelection: 1,
  terminals: TERMINALS,
  events: [
    // Los objetivos se leen en todas las filas desde el principio, así que

    // --- The focused agent keeps working, unattended. ---
    {
      at: 1_200,
      kind: 'write',
      id: 1,
      text: lines(
        `${claude.bullet} ${white('Two of the three writers set the count from the terminal list and one')}`,
        `  ${white('from the notification itself. That last one is the drift.')}`,
        '',
      ),
    },
    { at: 3_000, kind: 'activity', id: 1, text: 'Making one place own the badge count' },
    { at: 3_000, kind: 'todo', id: 1, index: 1 },
    {
      at: 3_400,
      kind: 'write',
      id: 1,
      text: lines(claude.tool('Edit', 'src/notifications/badge.js'), claude.result('+28 −34'), ''),
    },
    {
      at: 5_600,
      kind: 'write',
      id: 1,
      text: lines(claude.tool('Edit', 'src/presentation/renderer/renderer.js'), claude.result('+12 −41'), ''),
    },

    // --- An agent hits a decision only a human can make. ---
    { at: 7_200, kind: 'activity', id: 2, text: 'Waiting: what makes two recordings the same?' },
    { at: 7_200, kind: 'status', id: 2, status: 'needs_input' },
    { at: 7_200, kind: 'notify', id: 2, on: true },
    {
      at: 7_200,
      kind: 'ask',
      id: 2,
      prompt: {
        question: 'Filenames collide across devices. What should make two recordings the same one?',
        options: [
          {
            label: 'Hash of the audio',
            description: 'Same sound, same recording, whatever it is called. Catches real duplicates, costs a read.',
            reply: lines(
              `${kimi.bullet} ${white('Content hash then. Same audio is the same note no matter which device')}`,
              `  ${white('recorded it or what the file ended up called.')}`,
              '',
              kimi.tool('write', 'src/sync/dedupe.ts'),
              kimi.result('118 lines'),
              '',
            ),
            activity: 'Matching recordings by their audio, not their name',
          },
          {
            label: 'An id stamped on save',
            description: 'Give every recording a uuid the moment it is made. Cheap, but old files have none.',
            reply: lines(
              `${kimi.bullet} ${white('Stamped ids it is. I will backfill the existing recordings once on first')}`,
              `  ${white('launch so nothing from before is left unmatched.')}`,
              '',
              kimi.tool('write', 'src/sync/dedupe.ts'),
              kimi.result('96 lines'),
              '',
            ),
            activity: 'Stamping every recording with an id on save',
          },
        ],
      },
    },

    // --- The visitor's eye follows the notification. ---
    { at: 10_500, kind: 'select', id: 2 },

    {
      at: 14_200,
      kind: 'write',
      id: 1,
      text: lines(
        `${claude.bullet} ${white('One writer now. Running the notification tests before I touch anything else.')}`,
        '',
        claude.tool('Bash', 'npm test -- notifications'),
        `  ${dim('⎿')}  ${green('18 passed')}${grey(', 1 failed')}`,
        '',
      ),
    },

    // --- Finished work sinks out of the way. ---
    { at: 17_000, kind: 'status', id: 5, status: 'pushed' },
    { at: 17_000, kind: 'activity', id: 5, text: 'Pushed: the flanking pass is on develop' },

    {
      at: 19_000,
      kind: 'write',
      id: 1,
      text: lines(
        `${claude.bullet} ${white('The failure is mine: the badge clears before the window is focused, so a')}`,
        `  ${white('notification you never saw counted as seen. Fixing.')}`,
        '',
      ),
    },
    { at: 19_600, kind: 'activity', id: 1, text: 'Clearing the badge only once you look' },
    { at: 19_600, kind: 'todo', id: 1, index: 2 },

    // --- A third agent moves on its own while nobody watches it. ---
    { at: 22_000, kind: 'activity', id: 3, text: 'Keeping whatever the scan already found' },
    { at: 22_000, kind: 'todo', id: 3, index: 2 },
    {
      at: 22_200,
      kind: 'write',
      id: 3,
      text: lines(
        `${codex.bullet} ${white('The walk yields per directory now, so cancelling lands between two of')}`,
        `  ${white('them and whatever it found is still good.')}`,
        codex.tool('Edit', 'src/scanner/walk.ts'),
        codex.result('+61 −14'),
        '',
      ),
    },

    { at: 25_000, kind: 'select', id: 1 },
    {
      at: 25_600,
      kind: 'write',
      id: 1,
      text: lines(claude.tool('Bash', 'npm test -- notifications'), claude.result('19 passed'), ''),
    },
    { at: 27_000, kind: 'status', id: 1, status: 'needs_testing' },
    { at: 27_000, kind: 'activity', id: 1, text: 'Ready for you to check the badge count' },
    { at: 27_000, kind: 'notify', id: 1, on: true },
    {
      at: 27_200,
      kind: 'write',
      id: 1,
      text: lines(
        `${claude.bullet} ${white('Green. The badge counts only terminals you have not opened, and clears')}`,
        `  ${white('when you actually look at one. Worth checking with the window hidden.')}`,
        '',
        `${dim('✳ Worked for 12m 04s')}`,
        '',
      ),
    },

    { at: 31_000, kind: 'select', id: 3 },
    { at: 31_500, kind: 'activity', id: 3, text: 'Wiring the cancel button to the scan' },
    { at: 31_500, kind: 'todo', id: 3, index: 3 },
    {
      at: 31_800,
      kind: 'write',
      id: 3,
      text: lines(
        `${codex.bullet} ${white('Button wired. Cancelling leaves the results found so far on screen instead')}`,
        `  ${white('of throwing them away.')}`,
        '',
        codex.tool('Bash', 'npm test -- scanner'),
        codex.result('12 passed'),
        '',
      ),
    },

    { at: 37_000, kind: 'status', id: 3, status: 'pushed' },
    { at: 37_000, kind: 'activity', id: 3, text: 'Pushed: the cancel button is on develop' },
    {
      at: 37_200,
      kind: 'write',
      id: 3,
      text: lines(codex.tool('Bash', 'git push'), codex.result('develop → origin/develop'), ''),
    },

    { at: 40_000, kind: 'status', id: 8, status: 'working' },
    { at: 40_000, kind: 'activity', id: 8, text: 'Making the pad wrap around the menu' },
    {
      at: 40_200,
      kind: 'write',
      id: 8,
      text: lines(
        `${oc.bullet} ${white('Holding down on the last item should wrap to the first, which it does not.')}`,
        '',
      ),
    },

    { at: 43_000, kind: 'select', id: 6 },

    { at: 48_000, kind: 'select', id: 4 },

    { at: 54_000, kind: 'select', id: 8 },
    {
      at: 54_400,
      kind: 'write',
      id: 8,
      text: lines(oc.tool('edit', 'src/ui/MenuFocus.gd'), oc.result('+34 −8'), ''),
    },
    { at: 56_000, kind: 'status', id: 8, status: 'needs_testing' },
    { at: 56_000, kind: 'activity', id: 8, text: 'Ready to try the menu with a pad' },
    { at: 56_000, kind: 'notify', id: 8, on: true },

    { at: 59_000, kind: 'select', id: 7 },
    { at: 64_000, kind: 'select', id: 1 },
    {
      at: 64_400,
      kind: 'write',
      id: 1,
      text: lines(
        `${dim('✳ Crunched for 41s')}`,
        `${accent('✳')} ${grey('recap:')} ${grey('the badge counts only what you have not seen, tests are green,')}`,
        `  ${grey('waiting on your manual pass before it goes anywhere.')}`,
        '',
      ),
    },
  ],
}

export default script
