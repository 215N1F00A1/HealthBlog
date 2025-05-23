import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { BlogPost } from '../../types';
import { truncateWords, formatDate, calculateReadingTime } from '../../utils/helpers';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/blogs/${post.id}`}>
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-6">
        <div className="flex items-center mb-2">
          <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full bg-blue-100 text-blue-600">
            {post.category.name}
          </span>
          {post.isDraft && (
            <span className="ml-2 text-xs font-semibold inline-block py-1 px-2 rounded-full bg-yellow-100 text-yellow-600">
              Draft
            </span>
          )}
        </div>
        <Link to={`/blogs/${post.id}`}>
          <h3 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors">
            {post.title}
          </h3>
        </Link>
        <p className="text-gray-600 mb-4">
          {truncateWords(post.summary, 15)}
        </p>
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <div className="flex items-center mr-4">
            <Calendar size={14} className="mr-1" />
            <span>{formatDate(post.createdAt)}</span>
          </div>
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{calculateReadingTime(post.content)}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600 text-sm">By {post.authorName}</span>
          <Link 
            to={`/blogs/${post.id}`} 
            className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;