'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { urlApi } from '@/lib/url';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Link as LinkIcon, 
  Copy, 
  QrCode, 
  BarChart3, 
  ExternalLink,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const urlSchema = z.object({
  url: z.string().url('Please enter a valid URL'),
});

type UrlForm = z.infer<typeof urlSchema>;

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState<any>(null);
  const [recentUrls, setRecentUrls] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UrlForm>({
    resolver: zodResolver(urlSchema),
  });

  useEffect(() => {
    fetchRecentUrls();
  }, []);

  const fetchRecentUrls = async () => {
    try {
      const response = await urlApi.getHistory();
      setRecentUrls(response.data.slice(0, 5)); // Show last 5 URLs
    } catch (error) {
      console.error('Failed to fetch recent URLs:', error);
    }
  };

  const onSubmit = async (data: UrlForm) => {
    setIsLoading(true);
    try {
      const response = await urlApi.shortenUrl(data.url);
      setShortenedUrl(response.data);
      toast.success('URL shortened successfully!');
      reset();
      fetchRecentUrls();
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to shorten URL');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const downloadQR = (qrCode: string, filename: string) => {
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = `${filename}-qr.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Dashboard
            </h1>
            <p className="text-gray-600">
              Shorten your URLs and track their performance
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* URL Shortener Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LinkIcon className="w-5 h-5 text-purple-600" />
                      Shorten URL
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="url">Enter URL to shorten</Label>
                        <Input
                          id="url"
                          type="url"
                          placeholder="https://example.com/very-long-url"
                          className="text-sm"
                          {...register('url')}
                        />
                        {errors.url && (
                          <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.url.message}
                          </p>
                        )}
                      </div>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      >
                        {isLoading ? 'Shortening...' : 'Shorten URL'}
                      </Button>
                    </form>

                    {/* Result */}
                    {shortenedUrl && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-800">URL Shortened Successfully!</span>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm font-medium text-gray-700">Short URL</Label>
                            <div className="flex items-center gap-2 mt-1">
                              <Input
                                value={shortenedUrl.shortUrl}
                                readOnly
                                className="bg-white"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyToClipboard(shortenedUrl.shortUrl)}
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(shortenedUrl.shortUrl, '_blank')}
                              >
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => downloadQR(shortenedUrl.qrCode, shortenedUrl.urlCode)}
                            >
                              <QrCode className="w-4 h-4 mr-2" />
                              Download QR Code
                            </Button>
                            <div className="text-sm text-gray-600">
                              <BarChart3 className="w-4 h-4 inline mr-1" />
                              {shortenedUrl.clicks} clicks
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Recent URLs */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      Recent URLs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {recentUrls.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">
                        No URLs shortened yet.
                        <br />
                        Create your first short URL!
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {recentUrls.map((url, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {url.originalUrl}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {url.clicks} clicks
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(url.shortUrl)}
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}