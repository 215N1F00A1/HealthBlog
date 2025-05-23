// Function to truncate text to a specific number of words
export const truncateWords = (text: string, maxWords: number): string => {
  if (!text) return '';
  
  const words = text.split(' ');
  if (words.length <= maxWords) return text;
  
  return words.slice(0, maxWords).join(' ') + '...';
};

// Function to format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

// Function to calculate reading time
export const calculateReadingTime = (content: string): string => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  return `${readingTime} min read`;
};