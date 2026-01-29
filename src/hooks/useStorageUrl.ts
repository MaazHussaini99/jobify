import { useState, useEffect } from 'react';
import { getUrl } from 'aws-amplify/storage';

/**
 * Hook to convert an S3 storage key to a downloadable URL
 * @param key - The S3 storage key (e.g., 'profiles/userId/image.jpg')
 * @returns The resolved URL or null if not available
 */
export const useStorageUrl = (key: string | undefined | null): string | null => {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!key) {
      setUrl(null);
      return;
    }

    // If it's already a full URL, use it directly
    if (key.startsWith('http://') || key.startsWith('https://')) {
      setUrl(key);
      return;
    }

    let isMounted = true;

    const fetchUrl = async () => {
      try {
        const result = await getUrl({
          path: key,
          options: {
            expiresIn: 3600 // URL expires in 1 hour
          }
        });
        if (isMounted) {
          setUrl(result.url.toString());
        }
      } catch (error) {
        console.error('Error fetching storage URL:', error);
        if (isMounted) {
          setUrl(null);
        }
      }
    };

    fetchUrl();

    return () => {
      isMounted = false;
    };
  }, [key]);

  return url;
};

export default useStorageUrl;
