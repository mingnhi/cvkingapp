import { ReactNode } from 'react';
import {
    Card,
    Typography,
    FormControlLabel,
    Checkbox,
    Divider,
    FormControl,
    RadioGroup,
    Radio,
} from '@mui/material';
import { companySizeOptions , benefitOptions, ratingOptions } from '@/faker/company-data';

interface SidebarFiltersProps {
    sidebarFilters: { companySizes: string[]; benefits: string[]; rating: string };
    onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRadioChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function SidebarFilters({ sidebarFilters, onCheckboxChange, onRadioChange }: SidebarFiltersProps) {
    return (
        <Card sx={{
            p: 2,
            borderRadius: 2,
            width: { xs: '100%', 
                md: '20%' }, 
            alignSelf: 'flex-start' }}>
            <Typography 
                variant="h6"
                sx={{ mb: 2 }}>
                Bộ lọc
            </Typography>
            <Typography 
                fontWeight="medium"
                sx={{ mb: 1 }}>
                Quy mô công ty
            </Typography>
            {companySizeOptions.map(size => (
                <FormControlLabel
                    key={size}
                    control={<Checkbox name="companySizes" value={size} onChange={onCheckboxChange} size="small" />}
                    label={`${size} nhân viên`}
                    sx={{ display: 'block' }}
                />
            ))}
            <Divider sx={{ my: 2 }} />
            <Typography fontWeight="medium" sx={{ mb: 1 }}>Lợi ích công ty</Typography>
            {benefitOptions.map(benefit => (
                <FormControlLabel
                    key={benefit}
                    control={<Checkbox name="benefits" value={benefit} onChange={onCheckboxChange} size="small" />}
                    label={benefit}
                    sx={{ display: 'block' }}
                />
            ))}
            <Divider sx={{ my: 2 }} />
            <Typography fontWeight="medium" sx={{ mb: 1 }}>Đánh giá</Typography>
            <FormControl>
                <RadioGroup name="rating" value={sidebarFilters.rating} onChange={onRadioChange}>
                    {ratingOptions.map(option => (
                        <FormControlLabel
                            key={option.value}
                            value={option.value}
                            control={<Radio size="small" />}
                            label={option.label}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
        </Card>
    );}
