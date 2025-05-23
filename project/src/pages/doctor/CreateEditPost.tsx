import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, X } from 'lucide-react';
import { blogPosts, createBlogPost, updateBlogPost } from '../../data/blogPosts';
import { categories } from '../../data/categories';
import Layout from '../../components/layout/Layout';
import { useAuth } from '../../context/AuthContext';
import { BlogPost, Category } from '../../types';

const CreateEditPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEditing = Boolean(id);
  
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    categoryId: '',
    summary: '',
    content: '',
    isDraft: false,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditing && id) {
      setLoading(true);
      
      // Simulate API fetch delay
      setTimeout(() => {
        const post = blogPosts.find(p => p.id === id);
        
        if (post) {
          setFormData({
            title: post.title,
            imageUrl: post.imageUrl,
            categoryId: post.category.id,
            summary: post.summary,
            content: post.content,
            isDraft: post.isDraft,
          });
        }
        
        setLoading(false);
      }, 500);
    }
  }, [id, isEditing]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
    } else if (!formData.imageUrl.match(/^https?:\/\/.*\.(jpeg|jpg|gif|png|webp)$/i)) {
      newErrors.imageUrl = 'Please enter a valid image URL';
    }
    
    if (!formData.categoryId) {
      newErrors.categoryId = 'Category is required';
    }
    
    if (!formData.summary.trim()) {
      newErrors.summary = 'Summary is required';
    } else if (formData.summary.length > 300) {
      newErrors.summary = 'Summary should be less than 300 characters';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setSaving(true);
    
    // Find the selected category
    const category = categories.find(c => c.id === formData.categoryId) as Category;
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (isEditing && id) {
        updateBlogPost(id, {
          title: formData.title,
          imageUrl: formData.imageUrl,
          category,
          summary: formData.summary,
          content: formData.content,
          isDraft: formData.isDraft,
        });
        
        navigate(`/blogs/${id}`);
      } else if (user) {
        const newPost = createBlogPost({
          title: formData.title,
          imageUrl: formData.imageUrl,
          category,
          summary: formData.summary,
          content: formData.content,
          isDraft: formData.isDraft,
          authorId: user.id,
          authorName: user.name,
        });
        
        navigate(`/blogs/${newPost.id}`);
      }
    } catch (error) {
      console.error('Error saving post:', error);
      alert('An error occurred while saving your post. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-8" />
            <div className="space-y-6">
              <div className="h-10 bg-gray-300 rounded w-full" />
              <div className="h-10 bg-gray-300 rounded w-full" />
              <div className="h-10 bg-gray-300 rounded w-full" />
              <div className="h-32 bg-gray-300 rounded w-full" />
              <div className="h-64 bg-gray-300 rounded w-full" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-2xl font-bold mb-8">
          {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter post title"
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>
          
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Image URL *
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md ${errors.imageUrl ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="https://example.com/image.jpg"
            />
            {errors.imageUrl && <p className="mt-1 text-sm text-red-600">{errors.imageUrl}</p>}
            {formData.imageUrl && !errors.imageUrl && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 mb-1">Preview:</p>
                <img 
                  src={formData.imageUrl} 
                  alt="Preview" 
                  className="h-40 object-cover rounded-md" 
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/640x360?text=Image+Preview';
                    setErrors(prev => ({...prev, imageUrl: 'Image failed to load. Please check the URL.'}));
                  }}
                />
              </div>
            )}
          </div>
          
          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md ${errors.categoryId ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && <p className="mt-1 text-sm text-red-600">{errors.categoryId}</p>}
          </div>
          
          <div>
            <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
              Summary * <span className="text-gray-500">(Max 300 characters)</span>
            </label>
            <textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              rows={3}
              className={`w-full px-4 py-2 border rounded-md ${errors.summary ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Write a brief summary of your article"
            />
            <div className="flex justify-between mt-1">
              {errors.summary ? (
                <p className="text-sm text-red-600">{errors.summary}</p>
              ) : (
                <p className="text-sm text-gray-500">
                  {formData.summary.length}/300 characters
                </p>
              )}
            </div>
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={12}
              className={`w-full px-4 py-2 border rounded-md ${errors.content ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Write your article content here. HTML is supported for formatting."
            />
            {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isDraft"
              name="isDraft"
              checked={formData.isDraft}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="isDraft" className="ml-2 text-sm text-gray-700">
              Save as draft (will not be visible to patients)
            </label>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <X size={20} className="mr-2" />
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
            >
              <Save size={20} className="mr-2" />
              {saving ? 'Saving...' : isEditing ? 'Update Post' : 'Publish Post'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateEditPost;