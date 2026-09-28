# Linux downloads (disabled by default)

`NEXT_PUBLIC_LINUX_DOWNLOADS_ENABLED` must equal `true` at build time to expose
Linux downloads. Leave it unset for now. The default retains the existing
Linux (Soon) signup and strips Linux artifacts from the public releases proxy.
Merely registering a Linux auto-update does not make it downloadable from the
landing. `getLinuxDownloads` in `lib/releases.ts` resolves the latest available
release separately for each architecture and format.

When approved, enable the landing flag and backend `LINUX_DOWNLOADS_ENABLED`,
then deploy. Explicit targets are `linux-x64-deb`, `linux-x64-appimage`,
`linux-arm64-deb`, and `linux-arm64-appimage`. The backend never substitutes an
AppImage for a missing deb. Existing Mac and Windows links are unchanged.

Checks: `node --experimental-strip-types --test lib/releases.test.ts`, then
repeat with `NEXT_PUBLIC_LINUX_DOWNLOADS_ENABLED=true`. Real browser evidence
for both states is in the grouped worktree's `artifacts/linux-release-pipeline`.
The enabled screenshot is a local fixture, not a public launch.
