import { motion } from "motion/react";
import { Job } from "@/types/job.type";
import {
  Card, CardContent, CardActions, Typography, Button, Chip, Avatar,
  Box, IconButton, useTheme, alpha
} from "@mui/material";
import { MapPin, Clock, DollarSign, Eye, BookmarkPlus, Star } from "lucide-react";

interface JobCardProps {
  job: Job;
  index: number;
  onApply: (jobId: string) => void;
  onSave: (jobId: string) => void;
}

export function JobCard({ job, index, onApply, onSave }: JobCardProps) {
  const theme = useTheme();

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("vi-VN", { year: "numeric", month: "short", day: "numeric" });

  const typeStyle = (t: string) => {
    const k = t?.toLowerCase();
    if (k === "full-time") return { backgroundColor: "#dcfce7", color: "#166534" };
    if (k === "part-time") return { backgroundColor: "#dbeafe", color: "#1e40af" };
    if (k === "contract") return { backgroundColor: "#e9d5ff", color: "#7c2d12" };
    return { backgroundColor: theme.palette.secondary.light, color: theme.palette.text.primary };
  };

  const line = (icon: React.ReactNode, text?: React.ReactNode) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {icon}
      <Typography variant="body2" color="text.secondary" noWrap>
        {text}
      </Typography>
    </Box>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      style={{ position: "relative" }}
    >
      <Card
        sx={{
          height: "100%", position: "relative", overflow: "hidden", transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: theme.shadows[8],
            "& .gradient-overlay": { opacity: 1 },
            "& .save-button": { opacity: 1 },
          },
        }}
      >
        {/* Gradient Overlay */}
        <Box
          className="gradient-overlay"
          sx={{
            position: "absolute", inset: 0,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 50%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
            opacity: 0, transition: "opacity 0.3s ease", pointerEvents: "none",
          }}
        />

        <CardContent sx={{ p: 3, pb: 2, position: "relative" }}>
          {/* Header */}
          <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, flex: 1 }}>
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: index * 0.1 + 0.1 }} style={{ position: "relative" }}>
                <Avatar
                  src={job.company?.logo}
                  sx={{ width: 48, height: 48, border: `2px solid ${theme.palette.background.paper}`, boxShadow: theme.shadows[2] }}
                >
                  {job.company?.name?.slice(0, 2) || "CO"}
                </Avatar>
                {job.company?.rating && job.company.rating >= 4.5 && (
                  <Box sx={{
                    position: "absolute", top: -4, right: -4, width: 24, height: 24, bgcolor: "#eab308",
                    borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Star size={12} color="#fff" fill="#fff" />
                  </Box>
                )}
              </motion.div>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.1 + 0.2 }}>
                  <Typography
                    variant="h6" component="h3" noWrap
                    sx={{ mb: 0.5, transition: "color 0.2s", "&:hover": { color: theme.palette.primary.main } }}
                  >
                    {job.title}
                  </Typography>
                </motion.div>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {job.company?.name}
                  </Typography>
                  {job.company?.rating && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <Star size={12} fill="#eab308" color="#eab308" />
                      <Typography variant="caption">{job.company.rating}</Typography>
                      <Typography variant="caption" color="text.secondary">({job.company.reviewCount})</Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <IconButton
                className="save-button" onClick={() => onSave(job.id)}
                sx={{ opacity: 0, transition: "opacity 0.2s", "&:hover": { backgroundColor: alpha(theme.palette.primary.main, 0.1) } }}
              >
                <BookmarkPlus size={20} />
              </IconButton>
            </motion.div>
          </Box>

          {/* Chips */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
            <Chip label={job.jobType} size="small" sx={typeStyle(job.jobType)} />
            <Chip label={job.category.name} size="small" variant="outlined" sx={{ borderColor: alpha(theme.palette.primary.main, 0.3) }} />
            {job.tags.map(t => (
              <Chip key={t.id} label={t.name} size="small" variant="outlined" sx={{ fontSize: "0.75rem" }} />
            ))}
          </Box>

          {/* Description */}
          <Typography
            variant="body2" color="text.secondary"
            sx={{
              mb: 2, lineHeight: 1.6, display: "-webkit-box",
              WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
            }}
          >
            {job.shortDescription}
          </Typography>

          {/* Details */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", mb: 2 }}>
            {line(<MapPin size={16} color={theme.palette.text.secondary} />, job.location)}
            {line(<Clock size={16} color={theme.palette.text.secondary} />, formatDate(job.postedAt))}
          </Box>

          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {line(<DollarSign size={16} color="#059669" />, /* salary text nếu cần */ "")}
            {line(<Eye size={16} color={theme.palette.text.secondary} />, job.viewsCount)}
          </Box>
        </CardContent>

        <CardActions sx={{ p: 3, pt: 0 }}>
          <motion.div style={{ width: "100%" }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="contained" color="warning" fullWidth onClick={() => onApply(job.id)}
              sx={{ boxShadow: theme.shadows[2], "&:hover": { boxShadow: theme.shadows[4] } }}
            >
              Ứng tuyển ngay
            </Button>
          </motion.div>
        </CardActions>
      </Card>
    </motion.div>
  );
}
