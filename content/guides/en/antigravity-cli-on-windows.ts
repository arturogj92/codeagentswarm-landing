import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'antigravity-cli-on-windows',
    locale: 'en',
    title: 'Antigravity CLI on Windows: Native or WSL, and the Gotchas',
    metaTitle: 'How to Run Antigravity CLI on Windows (Native or WSL) (2026)',
    metaDescription: 'Running Antigravity CLI on Windows: native versus WSL, where ~/.gemini actually lives, the UNC path trap, why the quota display can lie, and Windows on ARM.',
    intro: `Antigravity CLI runs on Windows, and the honest headline is that it runs well. The current CLI is built in Go, which means a single native binary rather than a runtime you have to keep healthy, and that removes most of the classic Windows friction before you hit it.

The decision you still have to make is <strong>native Windows or WSL</strong>, and unlike some agents this one does not have an obvious right answer. It depends on where your code lives, not on which is better.

This guide covers that decision, where Antigravity actually keeps its files on Windows, the two path traps that produce confusing failures, why your quota indicator can insist Antigravity is not running while you watch it work, and what changes on Windows on ARM.`,
    ctaText: 'Windows terminal multiplexing is where the platform genuinely lags. CodeAgentSwarm runs several Antigravity sessions side by side on Windows in one window, with per-session status and notifications.',
    ctaAgent: 'antigravity',
    highlightedWords: ['Antigravity', 'Windows'],
    publishedAt: '2026-08-05',
    updatedAt: '2026-08-05',
    alternateSlug: 'antigravity-cli-en-windows',
  },
  sections: [
    {
      id: 'native-or-wsl',
      title: 'Native or WSL: decide by where your code lives',
      content: [
        {
          type: 'paragraph',
          text: 'The rule is short and it beats every other consideration: <strong>run the agent on the same side of the filesystem boundary as your repository</strong>.',
        },
        {
          type: 'list',
          items: [
            '<strong>Code in <code>C:\\Users\\you\\projects</code></strong> → run Antigravity natively on Windows.',
            '<strong>Code in <code>~/projects</code> inside WSL</strong> → run Antigravity inside WSL.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Crossing that boundary is where the pain lives. A native Windows agent reaching into WSL files, or a WSL agent reaching into <code>/mnt/c</code>, works but is slow enough to change how the agent behaves: file reads that should be instant take long enough that an agent scanning a repository spends most of its time on I/O. On a large codebase the difference is not subtle.',
        },
        {
          type: 'paragraph',
          text: 'Beyond speed, crossing the boundary also breaks things quietly. File watching does not propagate reliably across it, permissions do not map cleanly, and line endings become a recurring irritation.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'If your toolchain is Linux-shaped (Docker, make, shell scripts that assume a POSIX environment) put both the code and the agent in WSL. If you build .NET, run native Windows tooling, or your team is Windows-first, stay native. Do not try to have it both ways; that is the configuration that produces every complaint.',
        },
      ],
    },
    {
      id: 'where-files-live',
      title: 'Where Antigravity keeps its files on Windows',
      content: [
        {
          type: 'paragraph',
          text: 'Antigravity reuses the Gemini home directory, so on Windows its data lives under <code>%USERPROFILE%\\.gemini</code>, which is normally <code>C:\\Users\\yourname\\.gemini</code>. Conversations sit in the <code>antigravity-cli</code> folder inside it.',
        },
        {
          type: 'paragraph',
          text: 'Two consequences worth knowing. First, the directory name has a leading dot, which Windows does not treat as hidden the way Unix does, so it will simply be visible in your user folder. Second, and more important: <strong>native Windows and WSL have completely separate homes</strong>. A conversation started in WSL is not visible to a native Windows session and vice versa, because they are looking at two different <code>.gemini</code> directories on two different filesystems.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'This catches people who switch environments mid-project: your history "disappears" when you run agy from the other side. Nothing is lost, you are simply looking at a different home directory. It is another argument for picking one side and staying there.',
        },
        {
          type: 'paragraph',
          text: 'The rest of the storage behaviour, including the flat conversation layout and the way the project is recorded, is the same on every platform and is covered in <a href="/en/guides/antigravity-cli-conversation-history" class="text-neon-cyan hover:text-neon-purple transition-colors">the conversation history guide</a>.',
        },
      ],
    },
    {
      id: 'path-traps',
      title: 'The two path traps',
      content: [
        {
          type: 'paragraph',
          text: '<strong>UNC paths.</strong> If you start the agent from a directory reached over a network share or through the WSL bridge, the working directory is a UNC path (<code>\\\\wsl$\\Ubuntu\\home\\you\\project</code> or <code>\\\\server\\share</code>) rather than a drive letter. A lot of tooling handles UNC paths badly, and the failure is rarely a clear error: commands fail with odd messages about the current directory, or silently run somewhere other than where you expect.',
        },
        {
          type: 'paragraph',
          text: 'The fix is to give the path a drive letter. Map the share with <code>net use</code>, or simply work from a real local directory. If you are reaching into WSL through <code>\\\\wsl$</code>, that is the configuration the previous section told you to avoid anyway.',
        },
        {
          type: 'paragraph',
          text: '<strong>Spaces and long paths.</strong> Windows still has a 260-character path limit unless long path support is enabled, and deep <code>node_modules</code> trees under a project already nested in <code>C:\\Users\\yourname\\Documents\\...</code> get there faster than you would think. An agent that fails to write a file for no apparent reason in a deeply nested project is usually hitting this.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Keeping repositories somewhere short like C:\\dev\\ or C:\\src\\ rather than under Documents avoids both problems permanently, and costs nothing.',
        },
      ],
    },
    {
      id: 'quota-display',
      title: 'Why the quota indicator can insist Antigravity is not running',
      content: [
        {
          type: 'paragraph',
          text: 'This one is worth its own section because it wastes real debugging time. Antigravity exposes its state through a <strong>local language server</strong>, and anything that wants to read your quota has to find that server first.',
        },
        {
          type: 'paragraph',
          text: 'On macOS and Linux that discovery is normally done with Unix process utilities. On Windows those utilities do not exist, so any tool that assumes them <strong>reports nothing rather than failing loudly</strong>: your quota display says "Antigravity is not running" while the agent is visibly working in front of you. The correct approach on Windows is to enumerate listening ports instead, which is what <code>netstat</code> does.',
        },
        {
          type: 'paragraph',
          text: 'There is a second failure that looks identical and is not platform-specific: <strong>a logged-out session is externally indistinguishable from no session at all</strong>. The server behaves the same way whether your credentials expired or Antigravity was never started.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'So when a quota display says Antigravity is off and you can see it working, check two things in order: are you still logged in, and is the tool using a Windows-appropriate discovery method. Between them those cover almost every instance of this report.',
        },
      ],
    },
    {
      id: 'windows-on-arm',
      title: 'Windows on ARM',
      content: [
        {
          type: 'paragraph',
          text: 'Antigravity itself is fine on Windows on ARM, and a Go binary is exactly the kind of thing that ports cleanly. What is not always fine is the surrounding ecosystem.',
        },
        {
          type: 'paragraph',
          text: 'The recurring problem is <strong>native modules</strong>: anything in your project that compiles against a specific architecture, SQLite bindings being the classic example, needs an ARM64 build. A prebuilt binary downloaded for x64 will fail to load with an error that mentions the module rather than the architecture, which sends people looking in the wrong place.',
        },
        {
          type: 'paragraph',
          text: 'If you hit that, the fix is to rebuild the native modules for your actual architecture rather than to reinstall the agent. The agent is not the thing that is broken.',
        },
      ],
    },
    {
      id: 'several-sessions',
      title: 'Running several Antigravity sessions on Windows',
      content: [
        {
          type: 'paragraph',
          text: 'Each <code>agy</code> session is an independent process, so nothing stops you running several. What stops you in practice is Windows terminal management: several PowerShell windows with no indication of which is which, no per-session status, and no notification when one finishes.',
        },
        {
          type: 'paragraph',
          text: 'This is genuinely worse than on macOS or Linux, where <code>tmux</code> is a reasonable answer that most Windows developers do not have set up. It is the main reason parallel agent workflows feel harder on Windows than they are.',
        },
        {
          type: 'paragraph',
          text: '<a href="/" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a> runs on Windows natively and gives each Antigravity session its own labelled terminal in one window, with live status, desktop notifications when a session finishes, and searchable history across all of them. It handles the Windows-specific quota discovery described above, so the indicator reflects what is actually happening rather than what a Unix-shaped check would report.',
        },
        {
          type: 'paragraph',
          text: 'Combined with a git worktree per agent, which matters as much on Windows as anywhere else, that is what makes <a href="/en/guides/antigravity-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">a swarm of Antigravity agents</a> practical on the platform.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Does Antigravity CLI work on Windows?',
      answer: 'Yes, and well. The current CLI is a native Go binary, so there is no runtime to keep healthy and most of the classic Windows friction does not apply. It runs both natively and inside WSL.',
    },
    {
      question: 'Should I run Antigravity natively on Windows or in WSL?',
      answer: 'Run it on the same side of the filesystem boundary as your code. Code in C:\\ means native, code in ~/ inside WSL means WSL. Crossing the boundary works but is slow enough to change how the agent behaves, and file watching does not propagate reliably across it.',
    },
    {
      question: 'Where does Antigravity store its files on Windows?',
      answer: 'Under %USERPROFILE%\\.gemini, normally C:\\Users\\yourname\\.gemini, with conversations in the antigravity-cli folder inside it. Note that native Windows and WSL have entirely separate homes, so history started on one side is not visible from the other.',
    },
    {
      question: 'Why does my Antigravity history disappear when I switch between WSL and Windows?',
      answer: 'It has not disappeared. Native Windows and WSL each have their own .gemini directory on their own filesystem, so a session started in one is invisible to the other. Pick one side and stay there.',
    },
    {
      question: 'Why does my quota display say Antigravity is not running when it is?',
      answer: 'Two common causes. Either your session is logged out, which is externally indistinguishable from no session at all, or the tool is discovering Antigravity local language server with Unix process utilities that do not exist on Windows, in which case it reports nothing instead of failing. Enumerating listening ports with netstat is the Windows-appropriate approach.',
    },
    {
      question: 'How do I run several Antigravity sessions at once on Windows?',
      answer: 'Each agy session is its own process, so you can open several. The hard part is Windows terminal management, since most developers do not have tmux set up. CodeAgentSwarm runs natively on Windows and gives each session a labelled terminal with live status, notifications and searchable history in one window.',
    },
  ],
}

export default guide
