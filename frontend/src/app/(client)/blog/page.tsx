"use client";

import { useMemo, useState, useEffect } from "react";
import { blogArticles } from "@/faker/data";
import { Box, FormControl, InputLabel, MenuItem, Paper, TextField, InputAdornment } from "@mui/material";
import MSelect from "@mui/material/Select";
import { SearchIcon } from "lucide-react";

import PostCard from "@/components/ui/client/blog/cards/PostCard";
import MiniPostCard from "@/components/ui/client/blog/cards/MiniPostCard";
import CategoryFilter from "@/components/ui/client/blog/shared/CategoryFilter";
import TagList from "@/components/ui/client/blog/shared/TagList";
import EmptyState from "@/components/ui/client/blog/shared/EmptyState";

import type { SortKey } from "@/types/blog.type";

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortKey>("newest");
  const [isClient, setIsClient] = useState(false);
  const [locale, setLocale] = useState("en-US");

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      setLocale(navigator.language);
    }
  }, []);

  const categories = useMemo(() => {
    const set = new Set(blogArticles.map((a) => a.category));
    return ["all", ...Array.from(set)];
  }, []);

  const popularTags = useMemo(() => {
    const counts = new Map<string, number>();
    blogArticles.forEach((a) => (a.tags ?? []).forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10).map(([t]) => t);
  }, []);

  const popularPosts = useMemo(() => [...blogArticles].sort((a, b) => (b.views ?? 0) - (a.views ?? 0)).slice(0, 4), []);
  const latestPosts = useMemo(() => [...blogArticles].sort((a, b) => +new Date(b.publishDate) - +new Date(a.publishDate)).slice(0, 5), []);

  const filteredArticles = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return [...blogArticles]
      .filter((a) => {
        const matchesSearch =
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          (a.tags ?? []).some((t) => t.toLowerCase().includes(q));
        const matchesCategory = selectedCategory === "all" || a.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "popular": return (b.views ?? 0) - (a.views ?? 0);
          case "comments": return (b.comments ?? 0) - (a.comments ?? 0);
          case "oldest": return +new Date(a.publishDate) - +new Date(b.publishDate);
          default: return +new Date(b.publishDate) - +new Date(a.publishDate);
        }
      });
  }, [searchTerm, selectedCategory, sortBy]);

  const featuredArticles = filteredArticles.filter((a) => a.featured).slice(0, 3);
  const nonFeatured = filteredArticles.filter((a) => !a.featured);
  const need = Math.max(0, 3 - nonFeatured.length);
  const fillers = filteredArticles.filter((a) => a.featured && !nonFeatured.includes(a)).slice(0, need);
  const latestThree = [...nonFeatured, ...fillers].slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-4xl font-semibold text-gray-900 mb-3">Career Insights & Tips</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Expert advice, industry insights, and practical tips to accelerate your career growth
          </p>
        </div>

        <Paper elevation={0} sx={{ borderRadius: 3, border: 1, borderColor: "divider", p: { xs: 2.5, md: 3 }, mb: 4 }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", mx: -1, "& > *": { px: 1, mb: 2 } }}>
            <Box sx={{ flex: { xs: "100%", md: 1 }, minWidth: 0 }}>
              <TextField
                fullWidth
                placeholder="Search articles, topics, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon size={20} color="#9ca3af" />
                    </InputAdornment>
                  ),
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 }, height: 48 }}
              />
            </Box>
            <Box sx={{ flex: { xs: "100%", md: "0 0 auto" } }}>
              <FormControl sx={{ minWidth: 224 }}>
                <InputLabel id="sort-label">Sort by</InputLabel>
                <MSelect
                  labelId="sort-label"
                  label="Sort by"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortKey)}
                  MenuProps={{ disableScrollLock: true, keepMounted: true, PaperProps: { sx: { minWidth: 224 } } }}
                  sx={{ borderRadius: 2, height: 48 }}
                >
                  <MenuItem value="newest">Mới nhất đầu tiên</MenuItem>
                  <MenuItem value="popular">Phổ biến nhất</MenuItem>
                  <MenuItem value="comments">Bình luận nhiều nhất</MenuItem>
                  <MenuItem value="oldest">Cũ nhất đầu tiên</MenuItem>
                </MSelect>
              </FormControl>
            </Box>
          </Box>
        </Paper>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                {selectedCategory === "all" ? "Tất cả các bài viết" : selectedCategory}
              </h2>
              <p className="text-gray-600">{filteredArticles.length} articles found</p>
            </div>

            {featuredArticles.length > 0 && (
              <div className="mb-8 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Bài viết nổi bật</h3>
                {featuredArticles.map((a) => (
                  <PostCard key={a.id} post={a} variant="featured" locale={locale} isClient={isClient} />
                ))}
              </div>
            )}

            {latestThree.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Bài viết mới nhất</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {latestThree.map((a) => (
                    <PostCard key={a.id} post={a} variant="default" locale={locale} isClient={isClient} />
                  ))}
                </div>
              </div>
            )}

            {filteredArticles.length === 0 && (
              <EmptyState
                title="No articles found"
                description="Try adjusting your search terms or browsing different thể loại."
                onReset={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSortBy("newest");
                }}
              />
            )}
          </div>

          <div className="lg:col-span-1 space-y-6">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            <TagList tags={popularTags} />

            <div className="bg-white rounded-xl border shadow-sm p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Bài viết phổ biến</h4>
              <div className="space-y-3">
                {popularPosts.map((p) => (
                  <MiniPostCard key={p.id} post={p} locale={locale} isClient={isClient} />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border shadow-sm p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Bài viết mới nhất</h4>
              <div className="space-y-3">
                {latestPosts.map((p) => (
                  <MiniPostCard key={p.id} post={p} locale={locale} isClient={isClient} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
