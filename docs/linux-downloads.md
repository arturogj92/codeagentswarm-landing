# Linux downloads

Linux downloads are public since 2.4.1. The landing shows four explicit links
(`linux-x64-deb`, `linux-x64-appimage`, `linux-arm64-deb`, `linux-arm64-appimage`)
and the releases proxy keeps Linux assets. `getLinuxDownloads` in
`lib/releases.ts` resolves the latest release separately for each architecture
and format; the backend never substitutes an AppImage for a missing deb.

Kill switch: build with `NEXT_PUBLIC_LINUX_DOWNLOADS_ENABLED=false` to restore the
Linux (Soon) signup and strip Linux artifacts from the public proxy. The backend
has the matching `LINUX_DOWNLOADS_ENABLED=false`. The update feed for installed
Linux apps does not depend on either flag.

Checks: `node --experimental-strip-types --test lib/releases.test.ts`, then repeat
with `NEXT_PUBLIC_LINUX_DOWNLOADS_ENABLED=false`.
