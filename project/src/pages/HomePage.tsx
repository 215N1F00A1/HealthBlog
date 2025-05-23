import React from 'react';
import { Link } from 'react-router-dom';
import { getPublishedPosts } from '../data/blogPosts';
import { categories } from '../data/categories';
import Layout from '../components/layout/Layout';
import BlogCard from '../components/blog/BlogCard';

const HomePage: React.FC = () => {
  const recentPosts = getPublishedPosts().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              Expert Health Information Written by Doctors
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              Stay informed with the latest medical research, health tips, and expert advice from trusted healthcare professionals.
            </p>
            <Link 
              to="/blogs" 
              className="inline-block bg-white text-blue-700 font-medium px-6 py-3 rounded-md hover:bg-blue-50 transition-colors"
            >
              Browse Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Explore Health Topics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link 
                key={category.id}
                to={`/blogs/category/${category.id}`}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2 text-blue-600">{category.name}</h3>
                <p className="text-gray-600">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Articles Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Recent Articles</h2>
            <Link 
              to="/blogs" 
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Are You a Healthcare Professional?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-blue-100">
            Join our platform to share your knowledge and expertise with patients seeking reliable health information.
          </p>
          <Link 
            to="/doctor/create-post" 
            className="inline-block bg-white text-blue-700 font-medium px-6 py-3 rounded-md hover:bg-blue-50 transition-colors"
          >
            Start Writing
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;