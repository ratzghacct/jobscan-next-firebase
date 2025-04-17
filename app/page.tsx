'use client';

import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {useEffect, useState} from 'react';
import {signOut, User} from 'firebase/auth';
import {auth, signInWithGoogle} from '@/lib/firebase';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {Icons} from '@/components/icons';
import {useToast} from "@/hooks/use-toast"

export const fetchGmailEmails = async (accessToken: string) => {
  try {
    console.log('📤 Starting Gmail fetch with token:', accessToken);
    const response = await fetch(
      'https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=100',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      }
    );

    console.log('📨 Gmail API status:', response.status);
    const text = await response.text();
    console.log('🧾 Raw response:', text);

    if (!response.ok) {
      console.error('❌ Failed to fetch Gmail messages:', text, response.status);
      return [];
    }

    const data = JSON.parse(text);
    console.log('📬 Raw message list:', data);
    return data.messages || [];
  } catch (error) {
    console.error('🔥 Gmail Fetch Error:', error);
    return [];
  }
};

export const fetchFullMessageById = async (
  accessToken: string,
  messageId: string
) => {
  try {
    const response = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}?format=full`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      console.error(`❌ Failed to fetch message ${messageId}`, response.status);
      return null;
    }

    const messageData = await response.json();

    const headers = messageData.payload?.headers || [];
    const subjectHeader = headers.find((h: any) => h.name === 'Subject');
    const subject = subjectHeader?.value || '(No Subject)';

    let body = '';
    const parts = messageData.payload?.parts || [];
    for (const part of parts) {
      if (part.mimeType === 'text/plain' && part.body?.data) {
        const decoded = atob(
          part.body.data.replace(/-/g, '+').replace(/_/g, '/')
        );
        body += decoded;
      }
    }

    console.log('🧾 Parsed message:', {subject, body});

    return {subject, body};
  } catch (error) {
    console.error(`🔥 Error fetching message ${messageId}:`, error);
    return null;
  }
};

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  const [totalApplications, setTotalApplications] = useState(0);
  const [responses, setResponses] = useState(0);
  const [rejections, setRejections] = useState(0);
  const [noResponses, setNoResponses] = useState(0);
  const [popupBlocked, setPopupBlocked] = useState(false);
  const { toast } = useToast();
  const [authInitialized, setAuthInitialized] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      if (!auth) {
        console.error('Firebase Authentication is not initialized.');
        setFirebaseError('Firebase Authentication is not initialized.');
        return;
      }

      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
          setAccessToken(null);
          setTotalApplications(0);
          setResponses(0);
          setRejections(0);
          setNoResponses(0);
        }
      });

      setAuthInitialized(true);
      return () => unsubscribe();
    };

    initializeAuth();
  }, []);

  const signInWithGoogleHandler = async () => {
    try {
      if (!auth) {
        console.error('Firebase Authentication is not initialized.');
        setFirebaseError('Firebase Authentication is not initialized.');
        return;
      }

      const {user, token} = await signInWithGoogle();
      if (!token) {
        throw new Error("No token received from Google Sign-In.");
      }

      setUser(user);
      setAccessToken(token);
      console.log('✅ Logged in:', user.email);
      console.log('🔑 Access token:', token);
      setPopupBlocked(false);
      toast({
        title: "Success",
        description: "Login Successful",
      });

    } catch (error: any) {
      console.error('❌ Google Sign-In Error:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        setFirebaseError("Looks like you closed the sign-in popup. Please try again.");
      } else if (error.code === 'auth/popup-blocked') {
        setPopupBlocked(true);
        setFirebaseError("Popup was blocked by your browser. Please allow popups for this site.");
      } else {
        setFirebaseError(error.message || 'Google Sign-In failed.');
      }
    }
  };

  const signOutHandler = async () => {
    try {
      if (!auth) {
        console.error('Firebase Authentication is not initialized.');
        setFirebaseError('Firebase Authentication is not initialized.');
        return;
      }
      await signOut(auth);
      console.log('User signed out');
      setAccessToken(null);
    } catch (error) {
      console.error('Error signing out:', error);
      setFirebaseError((error as Error).message || 'Sign out failed.');
    }
  };

  const analyzeGmailEmails = async () => {
    if (!accessToken) {
      console.log('Access token not available.');
      return;
    }

    try {
      const messages = await fetchGmailEmails(accessToken);
      let responseCount = 0;
      let rejectionCount = 0;

      for (const message of messages) {
        if (!message.id) continue;

        const fullMessage = await fetchFullMessageById(accessToken, message.id);
        if (!fullMessage) continue;

        const subject = fullMessage.subject.toLowerCase();
        const body = fullMessage.body.toLowerCase();
        const combinedText = subject + ' ' + body;

        if (combinedText.includes('rejected') || combinedText.includes('rejection')) {
          rejectionCount++;
        } else if (
          combinedText.includes('thank you') ||
          combinedText.includes('response') ||
          combinedText.includes('position') ||
          combinedText.includes('role') ||
          combinedText.includes('hiring')
        ) {
          responseCount++;
        }
      }

      setTotalApplications(messages.length);
      setResponses(responseCount);
      setRejections(rejectionCount);
      setNoResponses(messages.length - responseCount - rejectionCount);
      toast({
        title: "Success",
        description: "Emails Analyzed!",
      });

      console.log('📊 Email Summary:', {
        total: messages.length,
        responses: responseCount,
        rejections: rejectionCount,
        noResponses: messages.length - responseCount - rejectionCount,
      });
    } catch (error) {
      console.error('Error fetching and processing emails:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen hazy-purple-background p-4 md:p-8">
      {firebaseError && (
        <div className="text-red-500 mb-4">Error: {firebaseError}</div>
      )}
      {popupBlocked && (
        <Alert variant="destructive">
          <Icons.close className="h-4 w-4" />
          <AlertTitle>Popup Blocked</AlertTitle>
          <AlertDescription>
            Please allow popups for this site to sign in with Google.
          </AlertDescription>
        </Alert>
      )}

      <section className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Icons.logo className="mr-2 h-6 w-6" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground mr-4">
            JobScan
          </h1>
          <Button variant="ghost" size="sm">
            How it works
          </Button>
        </div>
      </section>

      <section className="flex items-start space-x-8 flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4" style={{fontFamily: 'DM Sans, sans-serif'}}>
            Track Your Job Applications{' '}
            <span className="text-purple-600">
              Automatically
            </span>
          </h1>
          <p className="text-muted-foreground text-lg" style={{fontFamily: 'DM Sans, sans-serif'}}>
            Connect your Gmail account to instantly analyze your job search
            progress. Get insights on your applications, responses, and more.
          </p>
          <div className="mt-6 space-x-4">
            {user && authInitialized ? (
              <Button variant="outline" onClick={signOutHandler}>
                Sign Out
              </Button>
            ) : authInitialized ? (
              <Button
                onClick={signInWithGoogleHandler}
                className="bg-purple-600 hover:bg-purple-700 text-white">
                <Icons.externalLink className="mr-2" size={16} />
                Sign in with Google
              </Button>
            ) : (
              <div>Loading...</div>
            )}
            <Button variant="outline">Learn more</Button>
          </div>

          {!user && <p className="text-muted-foreground">Please sign in to analyze your emails.</p>}
        </div>

        <Card className="w-full md:w-1/2 shadow-md rounded-lg mt-4 md:mt-0">
          <CardHeader className="bg-purple-600 text-white rounded-t-lg">
            <CardTitle style={{fontFamily: 'DM Sans, sans-serif'}}>Job Application Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground" style={{fontFamily: 'DM Sans, sans-serif'}}>Total Applications</span>
                <span className="font-bold text-gray-800">{totalApplications}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground" style={{fontFamily: 'DM Sans, sans-serif'}}>Responses Received</span>
                <span className="font-bold text-gray-800">{responses}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground" style={{fontFamily: 'DM Sans, sans-serif'}}>Rejections</span>
                <span className="font-bold text-gray-800">{rejections}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground" style={{fontFamily: 'DM Sans, sans-serif'}}>Awaiting Response</span>
                <span className="font-bold text-gray-800">{noResponses}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      {accessToken && (
        <Button className="mt-4" onClick={analyzeGmailEmails}>
          🔍 Analyze Emails
        </Button>
      )}
    </div>
  );
}
