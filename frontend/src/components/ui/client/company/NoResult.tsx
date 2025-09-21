import { Card, Typography } from '@mui/material';

export default function NoResult() {
    return (
        <Card sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
            <Typography 
                variant="h6">
                Không tìm thấy công ty phù hợp
            </Typography>
            <Typography
                color="text.secondary">
                Vui lòng thử lại với các từ khóa hoặc bộ lọc khác.
            </Typography>
        </Card>
    );
}
