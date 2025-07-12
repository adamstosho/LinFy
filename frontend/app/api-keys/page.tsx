'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { authApi, ApiKey } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Copy,
  Key,
  Trash2,
  Plus,
  Calendar,
  Code,
  AlertCircle,
  Shield
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

export default function ApiKeysPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isLoadingKeys, setIsLoadingKeys] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newApiKey, setNewApiKey] = useState<string>('');
  const [showNewKeyDialog, setShowNewKeyDialog] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchApiKeys();
    }
  }, [isAuthenticated]);

  const fetchApiKeys = async () => {
    try {
      const response = await authApi.getApiKeys();
      setApiKeys(response.apiKeys);
    } catch (error) {
      toast.error('Failed to fetch API keys');
    } finally {
      setIsLoadingKeys(false);
    }
  };

  const createApiKey = async () => {
    if (apiKeys.length >= 5) {
      toast.error('Maximum 5 API keys allowed');
      return;
    }

    setIsCreating(true);
    try {
      const response = await authApi.createApiKey();
      setNewApiKey(response.apiKey);
      setShowNewKeyDialog(true);
      fetchApiKeys();
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to create API key');
    } finally {
      setIsCreating(false);
    }
  };

  const revokeApiKey = async (keyId: string) => {
    try {
      await authApi.revokeApiKey(keyId);
      toast.success('API key revoked successfully');
      fetchApiKeys();
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to revoke API key');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading || isLoadingKeys) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            API Keys
          </h1>
          <p className="text-gray-600">
            Manage your API keys for third-party integrations
          </p>
        </motion.div>

        {/* API Usage Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-6"
        >
          <Card className="border-0 bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Code className="w-6 h-6 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">API Usage</h3>
                  <p className="text-blue-800 text-sm mb-3">
                    Use your API keys to integrate URL shortening into your applications.
                    Send the API key in the <code className="bg-blue-100 px-1 rounded">x-api-key</code> header.
                  </p>
                  <div className="bg-blue-100 rounded-lg p-3 text-sm">
                    <code className="text-blue-900">
                      curl -X POST {process.env.NEXT_PUBLIC_API_BASE_URL}/shorten \<br />
                      &nbsp;&nbsp;-H "x-api-key: YOUR_API_KEY\" \<br />
                      &nbsp;&nbsp;-H "Content-Type: application/json" \<br />
                      &nbsp;&nbsp;-d "originalUrl": "https://example.com"
                    </code>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* API Keys List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5 text-purple-600" />
                  Your API Keys ({apiKeys.length}/5)
                </CardTitle>
                <Button
                  onClick={createApiKey}
                  disabled={isCreating || apiKeys.length >= 5}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {isCreating ? 'Creating...' : 'Create API Key'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {apiKeys.length === 0 ? (
                <div className="text-center py-8">
                  <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No API keys created yet</p>
                  <Button
                    onClick={createApiKey}
                    disabled={isCreating}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First API Key
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {apiKeys.map((apiKey, index) => (
                    <motion.div
                      key={apiKey.keyId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <p className="font-medium text-gray-900">
                              API Key #{index + 1}
                            </p>
                            <Badge variant="secondary">
                              {apiKey.keyId.slice(0, 8)}...
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Created: {formatDate(apiKey.createdAt)}
                            </div>
                            {apiKey.lastUsed && (
                              <div className="flex items-center gap-1">
                                <Shield className="w-4 h-4" />
                                Last used: {formatDate(apiKey.lastUsed)}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(apiKey.keyId)}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => revokeApiKey(apiKey.keyId)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {apiKeys.length >= 5 && (
                <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                    <p className="text-amber-800 text-sm">
                      You've reached the maximum limit of 5 API keys.
                      Revoke an existing key to create a new one.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* New API Key Dialog */}
        <Dialog open={showNewKeyDialog} onOpenChange={setShowNewKeyDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>API Key Created</DialogTitle>
              <DialogDescription>
                Your new API key has been created. Make sure to copy it now as you won't be able to see it again.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Your API Key:</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 p-2 bg-white rounded border text-sm break-all">
                    {newApiKey}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(newApiKey)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <p className="text-amber-800 text-sm">
                  Store this key securely. You won't be able to see it again.
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}