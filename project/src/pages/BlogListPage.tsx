import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPublishedPosts, getPostsByCategory } from '../data/blogPosts';
import { categories } from '../data/categories';
import Layout from '../components/layout/Layout';
import BlogCard from '../components/blog/BlogCard';
import CategoryFilter from '../components/blog/CategoryFilter';
import { BlogPost } from '../types';

const BlogListPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryId || null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    // Simulate API fetch delay
    setTimeout(() => {
      if (selectedCategory) {
        setPosts(getPostsByCategory(selectedCategory));
      } else {
        setPosts(getPublishedPosts());
      }
      setLoading(false);
    }, 500);
  }, [selectedCategory]);

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
  };

  const categoryName = selectedCategory 
    ? categories.find(c => c.id === selectedCategory)?.name 
    : 'All Categories';

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <CategoryFilter 
              selectedCategory={selectedCategory} 
              onSelectCategory={handleCategorySelect} 
            />
          </div>
          
          {/* Main Content */}
          <div className="md:w-3/4">
            <h1 className="text-3xl font-bold mb-2">
              {categoryName}
            </h1>
            <p className="text-gray-600 mb-8">
              {selectedCategory 
                ? categories.find(c => c.id === selectedCategory)?.description
                : 'Browse all our articles across various health topics.'
              }
            </p>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                    <div className="w-full h-48 bg-gray-300" />
                    <div className="p-6">
                      <div className="h-4 bg-gray-300 rounded w-1/4 mb-2" />
                      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
                      <div className="h-4 bg-gray-300 rounded w-full mb-2" />
                      <div className="h-4 bg-gray-300 rounded w-2/3 mb-4" />
                      <div className="flex justify-between">
                        <div className="h-4 bg-gray-300 rounded w-1/3" />
                        <div className="h-4 bg-gray-300 rounded w-1/4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No articles found</h3>
                <p className="text-gray-600">
                  There are no articles in this category yet. Please check back later.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogListPage;