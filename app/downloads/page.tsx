'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Monitor, Cpu, Calendar, FileText, Shield } from 'lucide-react';

interface Download {
  fileName: string;
  fileUrl: string;
  fileSize: number;
  sha512: string;
}

interface Release {
  version: string;
  releaseDate: string;
  releaseNotes: string;
  formattedDownloads: {
    macArm: Download | null;
    macIntel: Download | null;
    windowsX64: Download | null;
    linuxX64: Download | null;
  };
}

export default function DownloadsPage() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReleases();
  }, []);

  const fetchReleases = async () => {
    try {
      const response = await fetch('https://codeagentswarm-backend-production.up.railway.app/api/releases/latest?limit=3');
      if (!response.ok) throw new Error('Failed to fetch releases');
      const data = await response.json();
      setReleases(data.releases);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load releases');
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDownloadUrl = (download: Download | null) => {
    if (!download) return null;
    // If fileUrl is a full URL, use it; otherwise construct from storage
    if (download.fileUrl.startsWith('http')) {
      return download.fileUrl;
    }
    // Construct Supabase storage URL
    return `https://fqamfucosytcyueqadog.supabase.co/storage/v1/object/public/releases/${download.fileName}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p>Loading releases...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <Button onClick={fetchReleases} variant="outline">Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Download CodeAgentSwarm</h1>
          <p className="text-gray-400 text-lg">Choose your platform and version</p>
        </div>

        {releases.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No releases available at the moment.</p>
          </div>
        ) : (
          <div className="space-y-8 max-w-4xl mx-auto">
            {releases.map((release, index) => (
              <Card key={release.version} className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl text-white">
                        Version {release.version}
                        {index === 0 && (
                          <Badge className="ml-3 bg-green-500 text-black">Latest</Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="text-gray-400 mt-2">
                        <Calendar className="inline-block w-4 h-4 mr-1" />
                        Released {formatDate(release.releaseDate)}
                      </CardDescription>
                    </div>
                  </div>
                  {release.releaseNotes && (
                    <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                      <p className="text-sm text-gray-300">
                        <FileText className="inline-block w-4 h-4 mr-2" />
                        {release.releaseNotes}
                      </p>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* macOS Downloads */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-gray-400 flex items-center">
                        <Monitor className="w-4 h-4 mr-2" />
                        macOS
                      </h3>
                      
                      {release.formattedDownloads.macArm && (
                        <a 
                          href={getDownloadUrl(release.formattedDownloads.macArm) || '#'}
                          download
                          className="block"
                        >
                          <Button 
                            variant="outline" 
                            className="w-full justify-between hover:bg-gray-800"
                            disabled={!getDownloadUrl(release.formattedDownloads.macArm)}
                          >
                            <div className="flex items-center">
                              <Download className="w-4 h-4 mr-2" />
                              <span>Apple Silicon (M1/M2/M3)</span>
                            </div>
                            <span className="text-xs text-gray-500">
                              {formatFileSize(release.formattedDownloads.macArm.fileSize)}
                            </span>
                          </Button>
                        </a>
                      )}
                      
                      {release.formattedDownloads.macIntel && (
                        <a 
                          href={getDownloadUrl(release.formattedDownloads.macIntel) || '#'}
                          download
                          className="block"
                        >
                          <Button 
                            variant="outline" 
                            className="w-full justify-between hover:bg-gray-800"
                            disabled={!getDownloadUrl(release.formattedDownloads.macIntel)}
                          >
                            <div className="flex items-center">
                              <Download className="w-4 h-4 mr-2" />
                              <span>Intel</span>
                            </div>
                            <span className="text-xs text-gray-500">
                              {formatFileSize(release.formattedDownloads.macIntel.fileSize)}
                            </span>
                          </Button>
                        </a>
                      )}
                    </div>

                    {/* Other Platforms (Future) */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-gray-400 flex items-center">
                        <Cpu className="w-4 h-4 mr-2" />
                        Other Platforms
                      </h3>
                      <div className="p-3 bg-gray-800 rounded-lg text-center">
                        <p className="text-sm text-gray-500">Windows & Linux coming soon</p>
                      </div>
                    </div>
                  </div>

                  {/* Security Note */}
                  <div className="mt-6 p-3 bg-gray-800 rounded-lg">
                    <p className="text-xs text-gray-400 flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-green-500" />
                      All downloads are signed and verified. You may need to allow the app in System Preferences on first run.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Installation Instructions */}
        <div className="mt-12 max-w-4xl mx-auto">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Installation Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div>
                <h3 className="font-semibold mb-2">macOS:</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Download the DMG file for your processor type</li>
                  <li>Open the downloaded DMG file</li>
                  <li>Drag CodeAgentSwarm to your Applications folder</li>
                  <li>On first launch, right-click and select "Open" to bypass Gatekeeper</li>
                </ol>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Troubleshooting:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>If you see "app is damaged", run: <code className="bg-gray-800 px-2 py-1 rounded">xattr -cr /Applications/CodeAgentSwarm.app</code></li>
                  <li>For update issues, download the latest version manually</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}