import { getFirestore, collection, doc, getDoc, query, where, getDocs } from 'firebase/firestore';
import { app } from '@/app/firebase/config';

// Function to get similar users
export async function getSimilarUsers(UserId: string) {
  const db = getFirestore(app);
  const targetUserDoc = await getDoc(doc(db, 'profiles', UserId));

  if (!targetUserDoc.exists()) {
    throw new Error('Target user does not exist');
  }

  const targetUser = targetUserDoc.data() as User;

  // Filter users by country, state, and age range
  const usersQuerySnapshot = await getDocs(query(
    collection(db, 'profiles'),
    where('country', '==', targetUser.country),
    where('state', '==', targetUser.state)
  ));

  const similarUsers: Array<{ userId: string, similarityScore: number }> = [];

  usersQuerySnapshot.forEach(userDoc => {
    const user = userDoc.data() as User;
    const ageDiff = Math.abs(parseInt(user.age) - parseInt(targetUser.age));
    
    // Check if age difference is within 2 years
    if (ageDiff <= 2) {
      // Calculate similarity score based on hobbies
      const similarityScore = cosineSimilarity(targetUser.hobbies, user.hobbies);
      similarUsers.push({ userId: user.userId, similarityScore });
    }
  });

  // Sort by similarity score
  similarUsers.sort((a, b) => b.similarityScore - a.similarityScore);

  // Return the top 5 most similar users
  return similarUsers.slice(0, 5);
}

// Utility function to calculate cosine similarity between two arrays
function cosineSimilarity(arr1: string[], arr2: string[]): number {
  const allHobbies = Array.from(new Set([...arr1, ...arr2]));
  
  const vector1 = allHobbies.map(hobby => (arr1.includes(hobby) ? 1 : 0));
  const vector2 = allHobbies.map(hobby => (arr2.includes(hobby) ? 1 : 0));
  
  const dotProduct = vector1.reduce<number>((acc, val, i) => acc + val * vector2[i], 0);
  const magnitude1 = Math.sqrt(vector1.reduce<number>((acc, val) => acc + val ** 2, 0));
  const magnitude2 = Math.sqrt(vector2.reduce<number>((acc, val) => acc + val ** 2, 0));
  
  return magnitude1 && magnitude2 ? dotProduct / (magnitude1 * magnitude2) : 0;
}

// Define User interface for type safety
interface User {
  userId: string;
  age: string;
  country: string;
  state: string;
  hobbies: string[];
}
