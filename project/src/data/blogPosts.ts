import { BlogPost } from '../types';
import { categories } from './categories';

// Mock blog posts for demonstration
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Understanding Anxiety Disorders',
    imageUrl: 'https://images.pexels.com/photos/3760607/pexels-photo-3760607.jpeg',
    category: categories[0],
    summary: 'Anxiety disorders affect millions of people worldwide. Learn about the symptoms, causes, and treatments available.',
    content: `
      <p>Anxiety disorders are a group of mental health conditions characterized by feelings of worry, anxiety, or fear that are strong enough to interfere with one's daily activities. They include panic disorder, phobias, social anxiety disorder, and generalized anxiety disorder.</p>
      
      <p>Symptoms can include stress that's out of proportion to the impact of the event, inability to set aside worry, and restlessness. Treatment typically consists of psychotherapy, medication, or both. Lifestyle changes, such as stress reduction and exercise, can also help.</p>
      
      <p>Anxiety disorders are the most common form of emotional disorder and can affect anyone at any age. Research has found that women are more likely to be diagnosed with an anxiety disorder than men.</p>
    `,
    authorId: '1',
    authorName: 'Dr. John Smith',
    createdAt: '2025-05-20T10:30:00Z',
    updatedAt: '2025-05-20T10:30:00Z',
    isDraft: false,
  },
  {
    id: '2',
    title: 'Heart Disease Prevention Tips',
    imageUrl: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg',
    category: categories[1],
    summary: 'Heart disease remains a leading cause of death. Discover simple lifestyle changes that can reduce your risk significantly.',
    content: `
      <p>Heart disease is the leading cause of death for both men and women in the United States. Prevention is key, and it starts with understanding and managing your risk factors.</p>
      
      <p>Lifestyle changes that can help prevent heart disease include:</p>
      <ul>
        <li>Eating a healthy diet low in saturated fats, trans fats, and cholesterol</li>
        <li>Exercising regularly (aim for at least 150 minutes of moderate activity per week)</li>
        <li>Maintaining a healthy weight</li>
        <li>Quitting smoking and avoiding secondhand smoke</li>
        <li>Limiting alcohol consumption</li>
        <li>Managing stress</li>
        <li>Getting regular check-ups to monitor blood pressure, cholesterol, and diabetes</li>
      </ul>
      
      <p>Remember, it's never too early or too late to start taking care of your heart health.</p>
    `,
    authorId: '2',
    authorName: 'Dr. Sarah Johnson',
    createdAt: '2025-05-18T14:15:00Z',
    updatedAt: '2025-05-19T09:45:00Z',
    isDraft: false,
  },
  {
    id: '3',
    title: 'COVID-19: Long-term Effects',
    imageUrl: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg',
    category: categories[2],
    summary: 'Some COVID-19 patients experience symptoms for weeks or months after recovery. Here\'s what we know about long COVID.',
    content: `
      <p>"Long COVID" refers to a range of symptoms that continue for weeks or months beyond the initial illness. Even people who had mild versions of COVID-19 can experience long-term effects.</p>
      
      <p>Common symptoms of long COVID include:</p>
      <ul>
        <li>Fatigue</li>
        <li>Shortness of breath</li>
        <li>Cough</li>
        <li>Joint pain</li>
        <li>Chest pain</li>
        <li>Memory, concentration or sleep problems</li>
        <li>Muscle pain or headache</li>
        <li>Fast or pounding heartbeat</li>
        <li>Loss of smell or taste</li>
        <li>Depression or anxiety</li>
        <li>Fever</li>
        <li>Dizziness when standing</li>
      </ul>
      
      <p>If you're experiencing any of these symptoms after a COVID-19 infection, it's important to talk to your healthcare provider.</p>
    `,
    authorId: '1',
    authorName: 'Dr. John Smith',
    createdAt: '2025-05-15T11:20:00Z',
    updatedAt: '2025-05-15T11:20:00Z',
    isDraft: false,
  },
  {
    id: '4',
    title: 'Childhood Vaccination Schedule',
    imageUrl: 'https://images.pexels.com/photos/5726706/pexels-photo-5726706.jpeg',
    category: categories[3],
    summary: 'Keeping up with your child\'s vaccination schedule is crucial for their health. Learn about the recommended timeline.',
    content: `
      <p>Vaccines help protect infants, children, and teens from serious diseases. Getting your child vaccinated according to the recommended schedule is one of the most important things you can do to ensure their long-term health.</p>
      
      <p>The CDC recommends vaccinations for the following diseases for children from birth to 6 years:</p>
      <ul>
        <li>Hepatitis B</li>
        <li>Rotavirus</li>
        <li>Diphtheria, tetanus, & acellular pertussis (DTaP)</li>
        <li>Haemophilus influenzae type b (Hib)</li>
        <li>Pneumococcal conjugate (PCV13)</li>
        <li>Inactivated poliovirus (IPV)</li>
        <li>Influenza (annual)</li>
        <li>Measles, mumps, rubella (MMR)</li>
        <li>Varicella</li>
        <li>Hepatitis A</li>
      </ul>
      
      <p>Talk to your child's doctor if you have questions about vaccines or if you're concerned about your child's vaccination schedule.</p>
    `,
    authorId: '2',
    authorName: 'Dr. Sarah Johnson',
    createdAt: '2025-05-10T09:00:00Z',
    updatedAt: '2025-05-10T09:00:00Z',
    isDraft: false,
  },
  {
    id: '5',
    title: 'Managing Seasonal Depression',
    imageUrl: 'https://images.pexels.com/photos/4100420/pexels-photo-4100420.jpeg',
    category: categories[0],
    summary: 'Seasonal Affective Disorder affects many people during winter months. Learn effective coping strategies and treatments.',
    content: `
      <p>Seasonal Affective Disorder (SAD) is a type of depression that's related to changes in seasons. If you're like most people with SAD, your symptoms start in the fall and continue into the winter months, sapping your energy and making you feel moody.</p>
      
      <p>Treatments for SAD may include:</p>
      <ul>
        <li>Light therapy (phototherapy)</li>
        <li>Psychotherapy</li>
        <li>Medications</li>
        <li>Vitamin D supplementation</li>
      </ul>
      
      <p>Lifestyle changes that can help manage SAD include getting outside more often, exercising regularly, making your environment sunnier and brighter, and practicing stress management techniques.</p>
      
      <p>If you think you may have SAD, talk to your healthcare provider for a proper diagnosis and treatment plan.</p>
    `,
    authorId: '1',
    authorName: 'Dr. John Smith',
    createdAt: '2025-05-05T16:30:00Z',
    updatedAt: '2025-05-05T16:30:00Z',
    isDraft: true,
  },
];

// Function to get posts for patient view (non-draft posts only)
export const getPublishedPosts = (): BlogPost[] => {
  return blogPosts.filter(post => !post.isDraft);
};

// Function to get posts for a specific doctor
export const getDoctorPosts = (doctorId: string): BlogPost[] => {
  return blogPosts.filter(post => post.authorId === doctorId);
};

// Function to get posts by category
export const getPostsByCategory = (categoryId: string): BlogPost[] => {
  return getPublishedPosts().filter(post => post.category.id === categoryId);
};

// Function to create a new blog post
export const createBlogPost = (blogPost: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): BlogPost => {
  const newPost: BlogPost = {
    ...blogPost,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  blogPosts.push(newPost);
  return newPost;
};

// Function to update a blog post
export const updateBlogPost = (id: string, updates: Partial<BlogPost>): BlogPost | null => {
  const index = blogPosts.findIndex(post => post.id === id);
  if (index === -1) return null;
  
  blogPosts[index] = {
    ...blogPosts[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  return blogPosts[index];
};

// Function to delete a blog post
export const deleteBlogPost = (id: string): boolean => {
  const index = blogPosts.findIndex(post => post.id === id);
  if (index === -1) return false;
  
  blogPosts.splice(index, 1);
  return true;
};