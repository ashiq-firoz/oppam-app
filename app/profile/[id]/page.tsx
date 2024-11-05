"use client"
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import ProfileSetup from "@/components/profile";

export default function Page() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid);
    }
  }, []);

  return (
    <ProfileSetup userId={userId} />
  );
}
