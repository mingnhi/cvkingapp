import { motion } from "motion/react";
import { Job } from "@/types/job.type";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Avatar,
  Box,
  IconButton,
  useTheme,
  alpha,
} from "@mui/material";
import {
  MapPin,
  Clock,
  DollarSign,
  Eye,
  BookmarkPlus,
  Star,
} from "lucide-react";

interface JobCardProps {
  job: Job;
  index: number;
  onApply: (jobId: string) => void;
  onSave: (jobId: string) => void;
}

export function JobCard({ job, index, onApply, onSave }: JobCardProps) {
  const theme = useTheme();

  // const formatSalary = (min: number, max: number, currency: string) => {
  //   return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}`;
  // };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getJobTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "full-time":
        return { backgroundColor: "#dcfce7", color: "#166534" };
      case "part-time":
        return { backgroundColor: "#dbeafe", color: "#1e40af" };
      case "contract":
        return { backgroundColor: "#e9d5ff", color: "#7c2d12" };
      default:
        return {
          backgroundColor: theme.palette.secondary.light,
          color: theme.palette.text.primary,
        };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3 },
      }}
      style={{ position: "relative" }}
    >
      <Card
        sx={{
          height: "100%",
          position: "relative",
          overflow: "hidden",
          "&:hover": {
            boxShadow: theme.shadows[8],
            "& .gradient-overlay": {
              opacity: 1,
            },
            "& .save-button": {
              opacity: 1,
            },
          },
          transition: "all 0.3s ease",
        }}
      >
        {/* Gradient Overlay */}
        <Box
          className="gradient-overlay"
          sx={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(135deg, ${alpha(
              theme.palette.primary.main,
              0.05
            )} 0%, transparent 50%, ${alpha(
              theme.palette.secondary.main,
              0.05
            )} 100%)`,
            opacity: 0,
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
          }}
        />

        <CardContent sx={{ p: 3, pb: 2, position: "relative" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 1.5,
                flex: 1,
              }}
            >
              {/* Company Logo */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.1 }}
                style={{ position: "relative" }}
              >
                <Avatar
                  src={job.company?.logo}
                  sx={{
                    width: 48,
                    height: 48,
                    border: `2px solid ${theme.palette.background.paper}`,
                    boxShadow: theme.shadows[2],
                  }}
                >
                  {job.company?.name?.slice(0, 2) || "CO"}
                </Avatar>
                {job.company?.rating && job.company.rating >= 4.5 && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: -4,
                      right: -4,
                      width: 24,
                      height: 24,
                      backgroundColor: "#eab308",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Star size={12} fill="white" color="white" />
                  </Box>
                )}
              </motion.div>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      mb: 0.5,
                      transition: "color 0.2s",
                      "&:hover": {
                        color: theme.palette.primary.main,
                      },
                    }}
                    noWrap
                  >
                    {job.title}
                  </Typography>
                </motion.div>

                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {job.company?.name}
                  </Typography>
                  {job.company?.rating && (
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <Star size={12} fill="#eab308" color="#eab308" />
                      <Typography variant="caption">
                        {job.company.rating}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ({job.company.reviewCount})
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <IconButton
                className="save-button"
                onClick={() => onSave(job.id)}
                sx={{
                  opacity: 0,
                  transition: "opacity 0.2s",
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  },
                }}
              >
                <BookmarkPlus size={20} />
              </IconButton>
            </motion.div>
          </Box>

          {/* Job Type and Category Chips */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
            <Chip
              label={job.jobType}
              size="small"
              sx={getJobTypeColor(job.jobType)}
            />
            <Chip
              label={job.category.name}
              variant="outlined"
              size="small"
              sx={{ borderColor: alpha(theme.palette.primary.main, 0.3) }}
            />
            {job.tags.map((tag) => (
              <Chip
                key={tag.id}
                label={tag.name}
                size="small"
                variant="outlined"
                sx={{ fontSize: "0.75rem" }}
              />
            ))}
          </Box>

          {/* Job Description */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              lineHeight: 1.6,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {job.shortDescription}
          </Typography>

          {/* Job Details */}
          <Box sx={{ space: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <MapPin size={16} color={theme.palette.text.secondary} />
              <Typography variant="body2" noWrap>
                {job.location}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <DollarSign size={16} color="#059669" />
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  color: "#059669",
                }}
              >
                {/* {formatSalary(job.salaryMin, job.salaryMax, job.currency)} */}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Eye size={16} color={theme.palette.text.secondary} />
                <Typography variant="body2" color="text.secondary">
                  {job.viewsCount}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Clock size={16} color={theme.palette.text.secondary} />
                <Typography variant="body2" color="text.secondary">
                  {formatDate(job.postedAt)}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Skills */}
          {job.skills.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {job.skills.slice(0, 3).map((skill) => (
                  <Chip
                    key={skill.id}
                    label={skill.name}
                    size="small"
                    sx={{
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      border: `1px solid ${alpha(
                        theme.palette.primary.main,
                        0.3
                      )}`,
                      fontSize: "0.75rem",
                    }}
                  />
                ))}
                {job.skills.length > 3 && (
                  <Chip
                    label={`+${job.skills.length - 3} kỹ năng`}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: "0.75rem" }}
                  />
                )}
              </Box>
            </Box>
          )}
        </CardContent>

        <CardActions sx={{ p: 3, pt: 0 }}>
          <motion.div
            style={{ width: "100%" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="contained"
               color="warning"   
              fullWidth
              onClick={() => onApply(job.id)}
              sx={{
                // background: theme.palette.gradient.primary,
                boxShadow: theme.shadows[2],
                "&:hover": {
                  boxShadow: theme.shadows[4],
                },
              }}
            >
              Ứng tuyển ngay
            </Button>
          </motion.div>
        </CardActions>
      </Card>
    </motion.div>
  );
}
