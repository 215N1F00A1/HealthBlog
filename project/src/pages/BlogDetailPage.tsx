import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { blogPosts, deleteBlogPost } from '../data/blogPosts';
import Layout from '../components/layout/Layout';
import { formatDate, calculateReadingTime } from '../utils/helpers';
import { useAuth } from '../context/AuthContext';
import { BlogPost } from '../types';

const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    
    // Simulate API fetch delay
    setTimeout(() => {
      const foundPost = blogPosts.find((p) => p.id === id);
      setPost(foundPost || null);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleDelete = () => {
    if (confirmDelete && post) {
      deleteBlogPost(post.id);
      navigate('/doctor/dashboard');
    } else {
      setConfirmDelete(true);
    }
  };

  const canEdit = user && post && user.id === post.authorId;

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4" />
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-4 bg-gray-300 rounded w-32" />
              <div className="h-4 bg-gray-300 rounded w-24" />
            </div>
            <div className="h-64 bg-gray-300 rounded mb-8" />
            <div className="space-y-4">
              <div className="h-4 bg-gray-300 rounded w-full" />
              <div className="h-4 bg-gray-300 rounded w-full" />
              <div className="h-4 bg-gray-300 rounded w-3/4" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist or has been removed.</p>
          <Link to="/blogs" className="text-blue-600 hover:text-blue-700">
            Browse all articles
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back button */}
        <Link to="/blogs" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft size={20} className="mr-2" />
          Back to Articles
        </Link>
        
        <header className="mb-8">
          <div className="flex items-center mb-4">
            <span className="text-sm font-semibold inline-block py-1 px-2 rounded-full bg-blue-100 text-blue-600 mr-2">
              {post.category.name}
            </span>
            {post.isDraft && (
              <span className="text-sm font-semibold inline-block py-1 px-2 rounded-full bg-yellow-100 text-yellow-600">
                Draft
              </span>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex items-center text-gray-600 mb-4">
            <span className="mr-4">By {post.authorName}</span>
            <div className="flex items-center mr-4">
              <Calendar size={16} className="mr-1" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              <span>{calculateReadingTime(post.content)}</span>
            </div>
          </div>
        </header>
        
        <div className="mb-8">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-auto rounded-lg object-cover max-h-96"
          />
        </div>
        
        <div className="prose prose-lg max-w-none mb-8">
          <p className="text-xl font-medium text-gray-700 mb-6">{post.summary}</p>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
        
        {canEdit && (
          <div className="border-t border-gray-200 pt-6 mt-8">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Manage Post</h3>
              <div className="flex space-x-4">
                <Link 
                  to={`/doctor/edit-post/${post.id}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700"
                >
                  <Edit size={18} className="mr-1" />
                  Edit
                </Link>
                <button 
                  onClick={handleDelete}
                  className={`inline-flex items-center ${
                    confirmDelete ? 'text-red-600' : 'text-gray-600 hover:text-red-600'
                  }`}
                >
                  <Trash2 size={18} className="mr-1" />
                  {confirmDelete ? 'Confirm Delete' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </article>
    </Layout>
  );
};

export default BlogDetailPage;