// Utility function to calculate cosine similarity between two arrays
function cosineSimilarity(arr1: string[], arr2: string[]): number {
    const allHobbies = Array.from(new Set([...arr1, ...arr2]));
    
    const vector1 = allHobbies.map(hobby => (arr1.includes(hobby) ? 1 : 0));
    const vector2 = allHobbies.map(hobby => (arr2.includes(hobby) ? 1 : 0));
    
    const dotProduct = vector1.reduce((acc: number, val: number, i: number) => acc + val * vector2[i], 0);
    const magnitude1 = Math.sqrt(vector1.reduce((acc: number, val: number) => acc + val ** 2, 0));
    const magnitude2 = Math.sqrt(vector2.reduce((acc: number, val: number) => acc + val ** 2, 0));
    
    return magnitude1 && magnitude2 ? dotProduct / (magnitude1 * magnitude2) : 0;
  }
  

export default cosineSimilarity;