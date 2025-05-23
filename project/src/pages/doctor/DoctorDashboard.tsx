import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Eye, Trash } from 'lucide-react';
import { getDoctorPosts, deleteBlogPost } from '../../data/blogPosts';
import Layout from '../../components/layout/Layout';
import { useAuth } from '../../context/AuthContext';
import { formatDate } from '../../utils/helpers';
import { BlogPost } from '../../types';

const DoctorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setLoading(true);
      
      // Simulate API fetch delay
      setTimeout(() => {
        const doctorPosts = getDoctorPosts(user.id);
        setPosts(doctorPosts);
        setLoading(false);
      }, 500);
    }
  }, [user]);

  const handleDelete = (id: string) => {
    if (deleteId === id) {
      deleteBlogPost(id);
      setPosts(posts.filter(post => post.id !== id));
      setDeleteId(null);
    } else {
      setDeleteId(id);
    }
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  const getStatusBadge = (isDraft: boolean) => {
    return isDraft ? (
      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
        Draft
      </span>
    ) : (
      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
        Published
      </span>
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">My Blog Posts</h1>
          <Link 
            to="/doctor/create-post" 
            className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} className="mr-2" />
            New Post
          </Link>
        </div>
        
        {loading ? (
          <div className="bg-white rounded-lg shadow-md">
            <div className="animate-pulse p-4">
              <div className="h-6 bg-gray-300 rounded w-1/4 mb-4" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="h-12 bg-gray-300 rounded w-12" />
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
                      <div className="h-3 bg-gray-300 rounded w-1/2" />
                    </div>
                    <div className="h-8 bg-gray-300 rounded w-20" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {posts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {posts.map((post) => (
                      <tr key={post.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {post.title}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{post.category.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{formatDate(post.createdAt)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(post.isDraft)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-3">
                            <Link 
                              to={`/blogs/${post.id}`} 
                              className="text-blue-600 hover:text-blue-900"
                              title="View"
                            >
                              <Eye size={18} />
                            </Link>
                            <Link 
                              to={`/doctor/edit-post/${post.id}`} 
                              className="text-green-600 hover:text-green-900"
                              title="Edit"
                            >
                              <Edit2 size={18} />
                            </Link>
                            <button 
                              onClick={() => handleDelete(post.id)}
                              onBlur={cancelDelete}
                              className={`${
                                deleteId === post.id 
                                  ? 'text-red-600 font-bold' 
                                  : 'text-gray-500 hover:text-red-600'
                              }`}
                              title={deleteId === post.id ? 'Confirm Delete' : 'Delete'}
                            >
                              <Trash size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
                <p className="text-gray-500 mb-4">Start writing your first blog post now!</p>
                <Link 
                  to="/doctor/create-post" 
                  className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Plus size={20} className="mr-2" />
                  Create Your First Post
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DoctorDashboard;