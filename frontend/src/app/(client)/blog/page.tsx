"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Calendar,
  Clock,
  Eye,
  MessageSquare,
  User,
  SearchIcon,
} from "lucide-react";

import {  Select as MSelect, Box, FormControl, InputLabel,   Paper, TextField, InputAdornment, MenuItem, Button  } from "@mui/material";


// import { blogArticles } from "./data";
import { blogArticles } from "@/faker/data";
type SortKey = "newest" | "popular" | "comments" | "oldest";

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString(undefined, {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

const readMinutes = (text: string) =>
  Math.max(4, Math.min(12, Math.round(text.length / 120)));

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortKey>("newest");

  // Categories (sidebar)
  const categories = useMemo(() => {
    const set = new Set(blogArticles.map((a) => a.category));
    return ["all", ...Array.from(set)];
  }, []);

  // Popular tags (sidebar)
  const popularTags = useMemo(() => {
    const counts = new Map<string, number>();
    blogArticles.forEach((a) =>
      (a.tags ?? []).forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1))
    );
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([t]) => t);
  }, []);

  // Popular & latest posts (sidebar)
  const popularPosts = useMemo(
    () => [...blogArticles].sort((a, b) => (b.views ?? 0) - (a.views ?? 0)).slice(0, 4),
    []
  );
  const latestPosts = useMemo(
    () => [...blogArticles].sort((a, b) => +new Date(b.publishDate) - +new Date(a.publishDate)).slice(0, 5),
    []
  );

  // Lọc & sắp xếp theo search / category / sort
  const filteredArticles = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return [...blogArticles]
      .filter((a) => {
        const matchesSearch =
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          (a.tags ?? []).some((t) => t.toLowerCase().includes(q));
        const matchesCategory =
          selectedCategory === "all" || a.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "popular":
            return (b.views ?? 0) - (a.views ?? 0);
          case "comments":
            return (b.comments ?? 0) - (a.comments ?? 0);
          case "oldest":
            return +new Date(a.publishDate) - +new Date(b.publishDate);
          default:
            return +new Date(b.publishDate) - +new Date(a.publishDate);
        }
      });
  }, [searchTerm, selectedCategory, sortBy]);

  // Featured (3 card gọn chiều cao)
  const featuredArticles = filteredArticles.filter((a) => a.featured).slice(0, 3);

  // 👉 Latest Articles: luôn hiển thị 3 card giống nhau
  const nonFeatured = filteredArticles.filter((a) => !a.featured);
  const need = Math.max(0, 3 - nonFeatured.length);
  const fillers = filteredArticles
    .filter((a) => a.featured && !nonFeatured.includes(a))
    .slice(0, need);

  const latestThree = [...nonFeatured, ...fillers].slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-4xl font-semibold text-gray-900 mb-3">
            Career Insights & Tips
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Expert advice, industry insights, and practical tips to accelerate your career growth
          </p>
        </div>

        {/* Search + Sort */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            border: 1,
            borderColor: "divider",
            p: { xs: 2.5, md: 3 },
            mb: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              mx: -1,
              "& > *": { px: 1, mb: 2 },
            }}
          >
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
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: 2 },
                  height: 48,
                }}
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
                  MenuProps={{
                    disableScrollLock: true,
                    keepMounted: true,
                    PaperProps: { sx: { minWidth: 224 } },
                  }}
                  sx={{ borderRadius: 2, height: 48 }}
                >
                  <MenuItem value="newest">Newest First</MenuItem>
                  <MenuItem value="popular">Most Popular</MenuItem>
                  <MenuItem value="comments">Most Commented</MenuItem>
                  <MenuItem value="oldest">Oldest First</MenuItem>
                </MSelect>
              </FormControl>
            </Box>
          </Box>
        </Paper>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main (bên trái) */}
          <div className="lg:col-span-3">
            {/* Title + count */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                {selectedCategory === "all" ? "All Articles" : selectedCategory}
              </h2>
              <p className="text-gray-600">{filteredArticles.length} articles found</p>
            </div>

            {/* Featured (3 card – chiều cao gọn) */}
            {featuredArticles.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Featured Articles</h3>
                <div className="space-y-4">
                  {featuredArticles.map((a) => (
                    <article key={a.id} className="rounded-xl border bg-white shadow-sm hover:shadow-md transition">
                      {/* cột trái cố định để card gọn chiều cao */}
                      <div className="grid grid-cols-1 md:[grid-template-columns:260px_1fr]">
                        {/* Ảnh trái */}
                        <div className="relative h-44 md:h-[176px]">
                          <Image
                            src={a.image}
                            alt={a.title}
                            fill
                            className="object-cover rounded-t-xl md:rounded-tr-none md:rounded-l-xl"
                            priority
                          />
                          <span className="absolute left-3 top-3 text-[11px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                            {a.tags[0] ?? "Tips"}
                          </span>
                          <span className="absolute right-3 top-3 text-[11px] font-semibold text-white bg-orange-500 px-2 py-0.5 rounded">
                            Featured
                          </span>
                        </div>

                        {/* Nội dung phải */}
                        <div className="p-4 md:p-5">
                          <h3 className="text-lg md:text-xl font-semibold text-gray-900 leading-snug line-clamp-2">
                            {a.title}
                          </h3>
                          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                            {a.excerpt}
                          </p>

                          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {fmtDate(a.publishDate)}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {readMinutes(a.excerpt)} min read
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {a.views ?? 0}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              {a.comments ?? 0}
                            </span>
                          </div>

                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                              <div className="h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center">
                                <User className="h-4 w-4 text-gray-500" />
                              </div>
                              <div className="leading-tight">
                                <div className="font-medium">CVKING Editor</div>
                                <div className="text-xs text-gray-500">Career Coach</div>
                              </div>
                            </div>
                            <Button variant="text" color="warning">
                                Read More →
                              </Button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* Latest Articles — LUÔN 3 CARD */}
            {latestThree.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Latest Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {latestThree.map((a) => (
                    <article key={a.id} className="rounded-xl border bg-white shadow-sm hover:shadow-md transition">
                      <div className="relative h-44 w-full overflow-hidden rounded-t-xl">
                        <Image src={a.image} alt={a.title} fill className="object-cover" />
                        <span className="absolute left-3 top-3 text-xs font-semibold text-white/90 bg-green-600 px-2 py-1 rounded">
                          {a.tags[0] ?? "Guide"}
                        </span>
                      </div>
                      <div className="p-5">
                        <h4 className="text-base font-semibold text-gray-900 leading-snug line-clamp-2">
                          {a.title}
                        </h4>
                        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{a.excerpt}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                          <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4" />{fmtDate(a.publishDate)}</span>
                          <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" />{readMinutes(a.excerpt)} min read</span>
                          <span className="inline-flex items-center gap-1"><Eye className="h-4 w-4" />{a.views ?? 0}</span>
                          <span className="inline-flex items-center gap-1"><MessageSquare className="h-4 w-4" />{a.comments ?? 0}</span>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <div className="h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center">
                              <User className="h-4 w-4 text-gray-500" />
                            </div>
                            <div className="leading-tight">
                              <div className="font-medium">CVKING Editor</div>
                              <div className="text-xs text-gray-500">Career Counselor</div>
                            </div>
                          </div>
                           <Button variant="text" color="warning">
                                Read More →
                              </Button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar (bên phải) */}
          <div className="lg:col-span-1">
            <aside className="space-y-6">
              {/* Categories */}
              <div className="bg-white rounded-xl border shadow-sm p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Categories</h4>
                <div className="flex flex-col gap-2">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCategory(c)}
                      className={[
                        "w-full text-left text-sm px-3 py-2 rounded-md",
                        c === selectedCategory
                          ? "bg-orange-50 text-orange-700"
                          : "hover:bg-gray-50 text-gray-700",
                      ].join(" ")}
                    >
                      {c === "all" ? "All Categories" : c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-white rounded-xl border shadow-sm p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Popular Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((t) => (
                    <span key={t} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Popular Posts (4) */}
              <div className="bg-white rounded-xl border shadow-sm p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Popular Posts</h4>
                <div className="space-y-3">
                  {popularPosts.map((p) => (
                    <div key={p.id} className="flex gap-3">
                      <div className="h-12 w-16 overflow-hidden rounded-md bg-gray-100">
                        <Image
                          src={p.image}
                          alt={p.title}
                          width={96}
                          height={72}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 line-clamp-2">
                          {p.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{fmtDate(p.publishDate)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Latest Posts (5) */}
              <div className="bg-white rounded-xl border shadow-sm p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Latest Posts</h4>
                <div className="space-y-3">
                  {latestPosts.map((p) => (
                    <div key={p.id} className="flex gap-3">
                      <div className="h-12 w-16 overflow-hidden rounded-md bg-gray-100">
                        <Image
                          src={p.image}
                          alt={p.title}
                          width={96}
                          height={72}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 line-clamp-2">
                          {p.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{fmtDate(p.publishDate)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
