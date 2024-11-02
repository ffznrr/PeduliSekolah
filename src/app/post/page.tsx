"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Post } from "@/utils/types";
import { useRouter } from "next/navigation";

export default function Component() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [loading, setLoading] = useState(true);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        const fetchedCategories = data.map(
          (category: { name: string }) => category.name,
        );
        setCategories(["All", ...fetchedCategories]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchFeaturedPosts() {
      setLoadingFeatured(true);
      try {
        const response = await fetch("/api/post-featured");
        const data = await response.json();
        setFeaturedPosts(data.data);
      } catch (error) {
        console.error("Error fetching featured posts:", error);
      } finally {
        setLoadingFeatured(false);
      }
    }
    fetchFeaturedPosts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeaturedIndex((prevIndex) =>
        prevIndex === featuredPosts.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [featuredPosts]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/posts?page=1&category=${selectedCategory}&search=${debouncedSearchTerm}`,
        );
        const data = await response.json();
        setPosts(data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [selectedCategory, debouncedSearchTerm]);

  return (
    <div className="min-h-screen w-full bg-[#F5F7FA]">
      <main className="container mx-auto px-4 py-8">
        {/* Featured Posts Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[#D35400] mb-6">
            Featured Donations
          </h2>
          {loadingFeatured ? (
            <p className="text-center text-[#2C3E50]">
              Loading featured Donations...
            </p>
          ) : (
            <div className="relative h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFeaturedIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <PostCard
                    post={featuredPosts[currentFeaturedIndex]}
                    router={router}
                    featured={true}
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {featuredPosts.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index === currentFeaturedIndex
                        ? "bg-[#D35400]"
                        : "bg-[#BDC3C7]"
                    }`}
                    onClick={() => setCurrentFeaturedIndex(index)}
                  />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Search and Category Section */}
        <section className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative w-full md:w-1/2 lg:w-1/3">
              <Input
                type="text"
                placeholder="Search projects..."
                className="pl-10 pr-4 py-2 rounded-full border-2 border-[#D35400] focus:border-[#D35400] focus:ring-2 focus:ring-[#D35400] bg-white w-full text-[#2C3E50]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#D35400]"
                size={20}
              />
            </div>

            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* Posts Grid */}
        <section>
          <h2 className="text-3xl font-bold text-[#2C3E50] mb-6">
            All Donations
          </h2>
          {loading ? (
            <p className="text-center text-[#2C3E50]">Loading Donations...</p>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {posts?.map((post: Post) => (
                <PostCard key={post.slug} post={post} router={router} />
              ))}
            </motion.div>
          )}
        </section>
      </main>
    </div>
  );
}

function PostCard({
  post,
  router,
  featured = false,
}: {
  post: Post;
  router: any;
  featured?: boolean;
}) {
  if (!post) {
    // Return a placeholder or message when the post is undefined or null
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-lg p-4 border-2 border-[#D35400]">
        <p className="text-center text-[#2C3E50]">Donation not available</p>
      </div>
    );
  }
  return (
    <motion.div
      className={`bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${
        featured ? "border-4 h-full" : "border-2"
      } border-[#D35400] cursor-pointer`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => router.push(`/post/${post.slug}`)}
    >
      <img
        src={post.imageUrl[0]}
        alt={post.title}
        className={`w-full ${featured ? "h-64" : "h-48"} object-cover`}
      />
      <div className="p-4">
        <h2
          className={`${
            featured ? "text-2xl" : "text-xl"
          } font-semibold mb-2 text-[#2C3E50]`}
        >
          {post.title}
        </h2>
        <span
          className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getCategoryColor(
            post.content,
          )}`}
        >
          {post.content}
        </span>
        {featured && (
          <p className="mt-4 text-[#2C3E50]">{post.content.slice(0, 150)}...</p>
        )}
      </div>
    </motion.div>
  );
}

function getCategoryColor(category: string) {
  switch (category) {
    case "Health":
      return "bg-[#D35400] text-white";
    case "Education":
      return "bg-[#2980B9] text-white";
    case "Environment":
      return "bg-[#27AE60] text-white";
    case "Technology":
      return "bg-[#8E44AD] text-white";
    case "Arts":
      return "bg-[#F39C12] text-white";
    default:
      return "bg-[#BDC3C7] text-[#2C3E50]";
  }
}
