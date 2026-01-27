'use client';

import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

interface Post {
  id: number;
  author: string;
  avatar: string;
  craft: string;
  timestamp: string;
  content: string;
  image: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

const communityPosts: Post[] = [
  {
    id: 1,
    author: 'Priya Sharma',
    avatar: '/placeholder.svg?key=avatar1',
    craft: 'Weaving',
    timestamp: '2 hours ago',
    content:
      "Just finished this beautiful saree using natural indigo dye. The blue turned out perfectly this time! Sharing the dye recipe in tomorrow's workshop.",
    image: '/placeholder.svg?key=post1',
    likes: 324,
    comments: 45,
    isLiked: false,
  },
  {
    id: 2,
    author: 'Rajesh Kumar',
    avatar: '/placeholder.svg?key=avatar2',
    craft: 'Pottery',
    timestamp: '4 hours ago',
    content: 'New technique experiment with local clay. The texture turned out amazing. Thoughts?',
    image: '/placeholder.svg?key=post2',
    likes: 567,
    comments: 89,
    isLiked: false,
  },
  {
    id: 3,
    author: 'Meera Patel',
    avatar: '/placeholder.svg?key=avatar3',
    craft: 'Jewelry',
    timestamp: '6 hours ago',
    content:
      'Grateful for the amazing response to my latest Kundan collection. Your support means everything!',
    image: '/placeholder.svg?key=post3',
    likes: 892,
    comments: 156,
    isLiked: false,
  },
];

export default function CommunityPage() {
  const [scrolled, setScrolled] = useState(false);
  const [posts, setPosts] = useState(communityPosts);

  const toggleLike = (id: number) => {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  return (
    <main className="bg-warm-cream min-h-screen">
      <Navigation scrolled={scrolled} />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-warm-charcoal mb-4 font-serif text-5xl font-bold sm:text-6xl">
            Artisan Community
          </h1>
          <p className="text-warm-charcoal/60 text-lg">
            Connect with artisans, share stories, and celebrate the craft
          </p>
        </div>

        {/* Create Post */}
        <div className="card-light mb-8">
          <div className="flex gap-4">
            <img
              src="/placeholder.svg?key=user-avatar"
              alt="Your avatar"
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <input
                type="text"
                placeholder="Share your craft journey..."
                className="border-border focus:ring-primary bg-warm-sand/50 w-full rounded-lg border px-4 py-3 focus:ring-2 focus:outline-none"
              />
              <div className="mt-4 flex gap-2">
                <button className="text-primary hover:bg-warm-sand rounded px-4 py-2 transition">
                  📷 Photo
                </button>
                <button className="text-primary hover:bg-warm-sand rounded px-4 py-2 transition">
                  🎥 Video
                </button>
                <button className="bg-primary hover:bg-warm-rust ml-auto rounded-lg px-6 py-2 font-semibold text-white transition">
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-8">
          {posts.map((post) => (
            <div key={post.id} className="card-light">
              {/* Header */}
              <div className="mb-4 flex items-start justify-between">
                <div className="flex gap-4">
                  <img
                    src={post.avatar || '/placeholder.svg'}
                    alt={post.author}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-warm-charcoal font-bold">{post.author}</h3>
                    <p className="text-warm-charcoal/60 text-sm">
                      {post.craft} · {post.timestamp}
                    </p>
                  </div>
                </div>
                <button className="text-warm-charcoal/60 hover:text-warm-charcoal">⋮</button>
              </div>

              {/* Content */}
              <p className="text-warm-charcoal/70 mb-4">{post.content}</p>

              {/* Image */}
              {post.image && (
                <img
                  src={post.image || '/placeholder.svg'}
                  alt="Post"
                  className="mb-4 max-h-96 w-full rounded-lg object-cover"
                />
              )}

              {/* Stats */}
              <div className="text-warm-charcoal/60 border-border mb-4 flex justify-between border-b pb-4 text-sm">
                <span>{post.likes} likes</span>
                <span>{post.comments} comments</span>
              </div>

              {/* Actions */}
              <div className="flex justify-around">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 transition ${
                    post.isLiked ? 'text-primary' : 'text-warm-charcoal/60 hover:text-warm-charcoal'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`} />
                  <span>Like</span>
                </button>
                <button className="text-warm-charcoal/60 hover:text-warm-charcoal flex items-center gap-2 rounded-lg px-4 py-2 transition">
                  <MessageCircle className="h-5 w-5" />
                  <span>Comment</span>
                </button>
                <button className="text-warm-charcoal/60 hover:text-warm-charcoal flex items-center gap-2 rounded-lg px-4 py-2 transition">
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
