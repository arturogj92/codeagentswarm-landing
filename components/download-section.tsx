'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Cpu, Calendar, ChevronDown, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface Release {
  version: string;
  releaseDate: string;
  formattedDownloads: {
    macArm: { fileName: string; fileUrl: string; fileSize: number } | null;
    macIntel: { fileName: string; fileUrl: string; fileSize: number } | null;
  };
}

export default function DownloadSection() {
  const [latestRelease, setLatestRelease] = useState<Release | null>(null);
  const [olderReleases, setOlderReleases] = useState<Release[]>([]);
  const [showOlderVersions, setShowOlderVersions] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestRelease();
  }, []);

  const fetchLatestRelease = async () => {
    try {
      const response = await fetch(
        'https://codeagentswarm-backend-production.up.railway.app/api/releases/latest?limit=3&preferDmg=true'
      );
      if (!response.ok) throw new Error('Failed to fetch release');
      const data = await response.json();
      if (data.releases && data.releases.length > 0) {
        setLatestRelease(data.releases[0]);
        // Set older releases (excluding the latest)
        if (data.releases.length > 1) {
          setOlderReleases(data.releases.slice(1));
        }
      }
    } catch (err) {
      console.error('Error fetching release:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (!bytes) return '';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const getDirectDownloadUrl = (version: string, arch: string) => {
    return `https://codeagentswarm-backend-production.up.railway.app/api/releases/download-dmg/${version}/${arch}`;
  };

  if (loading) {
    return (
      <section className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-white/5 rounded-lg w-96 mx-auto mb-4"></div>
            <div className="h-32 bg-white/5 rounded-xl"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!latestRelease) {
    return null;
  }

  return (
    <section id="download" className="relative py-24 px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            Download <span className="italic">CodeAgentSwarm</span>
          </h2>
          <p className="text-white/60 text-lg">
            Version {latestRelease.version} • Released {new Date(latestRelease.releaseDate).toLocaleDateString()}
          </p>
        </motion.div>

        {/* Download buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-8"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <Image 
              src="/icons/apple-logo.png" 
              alt="Apple" 
              width={32} 
              height={32} 
              className="opacity-80 invert"
            />
            <span className="text-white text-xl font-medium">macOS</span>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {/* Apple Silicon Download */}
            {latestRelease.formattedDownloads.macArm && (
              <motion.a
                href={getDirectDownloadUrl(latestRelease.version, 'arm64')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 hover:from-white/[0.12] hover:to-white/[0.05] transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-white font-medium text-lg mb-1">Apple Silicon</h3>
                      <p className="text-white/50 text-sm">M1, M2, M3, M4</p>
                    </div>
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                      <Image 
                        src="/icons/apple-logo.png" 
                        alt="Apple Silicon" 
                        width={20} 
                        height={20}
                        className="opacity-90 invert"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-white/40 text-xs">
                      {formatFileSize(latestRelease.formattedDownloads.macArm.fileSize)}
                    </span>
                    <div className="flex items-center gap-2 text-green-400">
                      <Download className="w-4 h-4" />
                      <span className="text-sm font-medium">Download DMG</span>
                    </div>
                  </div>
                  
                  {/* Hover effect gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/10 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </motion.a>
            )}

            {/* Intel Download */}
            {latestRelease.formattedDownloads.macIntel && (
              <motion.a
                href={getDirectDownloadUrl(latestRelease.version, 'x64')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 hover:from-white/[0.12] hover:to-white/[0.05] transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-white font-medium text-lg mb-1">Intel</h3>
                      <p className="text-white/50 text-sm">Intel processors</p>
                    </div>
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                      <Image 
                        src="/icons/intel-logo.png" 
                        alt="Intel" 
                        width={20} 
                        height={20}
                        className="opacity-90 invert"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-white/40 text-xs">
                      {formatFileSize(latestRelease.formattedDownloads.macIntel.fileSize)}
                    </span>
                    <div className="flex items-center gap-2 text-blue-400">
                      <Download className="w-4 h-4" />
                      <span className="text-sm font-medium">Download DMG</span>
                    </div>
                  </div>
                  
                  {/* Hover effect gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </motion.a>
            )}
          </div>

          {/* Older versions link */}
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowOlderVersions(!showOlderVersions)}
              className="inline-flex items-center gap-2 text-white/40 hover:text-white/60 transition-colors text-sm"
            >
              <ChevronDown className={`w-4 h-4 transition-transform ${showOlderVersions ? 'rotate-180' : ''}`} />
              {showOlderVersions ? 'Hide' : 'Show'} older versions
            </button>
          </div>

          {/* Older versions dropdown */}
          {showOlderVersions && olderReleases.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 pt-6 border-t border-white/5"
            >
              <p className="text-white/40 text-sm text-center mb-6">
                Previous versions
              </p>
              
              <div className="space-y-4">
                {olderReleases.map((release) => (
                  <div key={release.version} className="border border-white/5 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-white font-medium">Version {release.version}</span>
                        <span className="text-white/40 text-sm ml-3">
                          {new Date(release.releaseDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {release.formattedDownloads.macArm && (
                        <a
                          href={getDirectDownloadUrl(release.version, 'arm64')}
                          className="flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm"
                        >
                          <Image 
                            src="/icons/apple-logo.png" 
                            alt="Apple Silicon" 
                            width={14} 
                            height={14}
                            className="opacity-70 invert"
                          />
                          <span className="text-white/70">Apple Silicon</span>
                          <Download className="w-3 h-3 text-white/50" />
                        </a>
                      )}
                      
                      {release.formattedDownloads.macIntel && (
                        <a
                          href={getDirectDownloadUrl(release.version, 'x64')}
                          className="flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm"
                        >
                          <Image 
                            src="/icons/intel-logo.png" 
                            alt="Intel" 
                            width={14} 
                            height={14}
                            className="opacity-70 invert"
                          />
                          <span className="text-white/70">Intel</span>
                          <Download className="w-3 h-3 text-white/50" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* System Requirements & Installation note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <div className="p-6 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.08]">
            <h3 className="text-white text-lg font-medium mb-4 text-center">System Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm text-white/60 mb-4">
              <div className="text-center">
                <span className="text-white/80 font-medium">macOS:</span> 12.0 or later
              </div>
              <div className="text-center">
                <span className="text-white/80 font-medium">Memory:</span> 4GB RAM minimum
              </div>
              <div className="text-center">
                <span className="text-white/80 font-medium">Storage:</span> 500MB available space
              </div>
              <div className="text-center">
                <span className="text-white/80 font-medium">Claude Code:</span> Active subscription
              </div>
            </div>
            <p className="text-white/40 text-xs mt-4 pt-4 border-t border-white/5 text-center">
              First time installing? You might need to right-click and select "Open" to bypass Gatekeeper.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}