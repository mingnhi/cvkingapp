"use client";
import { Card, CardContent, CardHeader, CardTitle } from '../../common/card/card';
import {
    Edit,
    Eye,
    Calendar,
    MapPin,
    DollarSign,
   Search,
   AlertCircle,
   CheckCircle,
} from 'lucide-react';
import { Avatar , AvatarImage , AvatarFallback} from '../../common/avatar/avatar';
import { Button } from '../../common/button/button';
import { useApp } from '@/components/AppContext';
import { XCircle } from 'lucide-react';
import { Badge } from '@mui/material';
const MyApplycation = ()=> {

    const { navigateTo } = useApp();
const mockApplications = [
    {
      id: 1,
      jobTitle: 'Senior Frontend Developer',
      company: 'TechCorp Vietnam',
      location: 'Ho Chi Minh City',
      salary: '$2000 - $3000',
      appliedDate: '2024-01-15',
      status: 'interview',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=face',
      description: 'Exciting opportunity to work with cutting-edge technologies...',
      interviewDate: '2024-01-25 14:00',
      notes: 'Technical interview scheduled with the development team'
    },
    {
      id: 2,
      jobTitle: 'React Developer',
      company: 'StartupXYZ',
      location: 'Hanoi',
      salary: '$1500 - $2500',
      appliedDate: '2024-01-10',
      status: 'pending',
      logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=64&h=64&fit=crop&crop=face',
      description: 'Join our fast-growing startup and make an impact...',
      notes: 'Application under review by HR team'
    },
    {
      id: 3,
      jobTitle: 'Full Stack Developer',
      company: 'DevStudio',
      location: 'Da Nang',
      salary: '$1800 - $2800',
      appliedDate: '2024-01-05',
      status: 'rejected',
      logo: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=64&h=64&fit=crop&crop=face',
      description: 'Work on exciting projects with modern technology stack...',
      notes: 'Thank you for your interest. Unfortunately, we have moved forward with other candidates.'
    }
  ];
 const handleViewJob = (application: any) => {
        const jobDetail = {
            id: application.id,
            title: application.jobTitle,
            company: application.company,
            location: application.location,
            salary: application.salary,
            description: application.description,
            posted: application.appliedDate,
            type: 'Full-time',
            experience: '2-5 years'
        };
        navigateTo('job-detail', { job: jobDetail });
    };
 const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending':
                return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><AlertCircle className="w-3 h-3 mr-1" />Pending</Badge>;
            case 'interview':
                return <Badge variant="secondary" className="bg-blue-100 text-blue-800"><Calendar className="w-3 h-3 mr-1" />Interview</Badge>;
            case 'rejected':
                return <Badge variant="secondary" className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
            case 'accepted':
                return <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Accepted</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    return  (
                    <div className="space-y-6 w-full">

                        <div className="flex items-center justify-between">
                            <h1>My Applications ({mockApplications.length})</h1>
                            <Button variant="outline" onClick={() => navigateTo('jobs')}>
                                <Search className="w-4 h-4 mr-2" />
                                Find More Jobs
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            <Card className="cursor-pointer hover:shadow-md transition-shadow">
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl font-bold text-primary mt-8">12</div>
                                    <div className="text-sm text-gray-600">Total Applications</div>
                                </CardContent>
                            </Card>
                            <Card className="cursor-pointer hover:shadow-md transition-shadow">
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl font-bold text-yellow-600 mt-8">5</div>
                                    <div className="text-sm text-gray-600">Pending</div>
                                </CardContent>
                            </Card>
                            <Card className="cursor-pointer hover:shadow-md transition-shadow">
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl font-bold text-blue-600 mt-8">3</div>
                                    <div className="text-sm text-gray-600">Interview</div>
                                </CardContent>
                            </Card>
                            <Card className="cursor-pointer hover:shadow-md transition-shadow">
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl font-bold text-green-600 mt-8">2</div>
                                    <div className="text-sm text-gray-600">Accepted</div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-4">
                            {mockApplications.map((application) => (
                                <Card key={application.id} className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-6 mt-8">
                                        <div className="flex items-start space-x-4">
                                            <Avatar className="w-12 h-12">
                                                <AvatarImage src={application.logo} />
                                                <AvatarFallback>{application.company.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <h3 className="mb-1 cursor-pointer hover:text-primary" onClick={() => handleViewJob(application)}>
                                                            {application.jobTitle}
                                                        </h3>
                                                        <p className="text-gray-600">{application.company}</p>
                                                    </div>
                                                    {getStatusBadge(application.status)}
                                                </div>
                                                <div className="flex items-center text-sm text-gray-500 space-x-4 mb-3">
                                                    <div className="flex items-center">
                                                        <MapPin className="w-4 h-4 mr-1" />
                                                        {application.location}
                                                    </div>
                                                    <div className="flex items-center">
                                                        <DollarSign className="w-4 h-4 mr-1" />
                                                        {application.salary}
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Calendar className="w-4 h-4 mr-1" />
                                                        Applied: {application.appliedDate}
                                                    </div>
                                                </div>
                                                {application.notes && (
                                                    <div className="bg-gray-50 p-3 rounded-lg mb-3">
                                                        <p className="text-sm text-gray-600">{application.notes}</p>
                                                        {application.interviewDate && (
                                                            <p className="text-sm font-medium text-blue-600 mt-1">
                                                                Interview: {application.interviewDate}
                                                            </p>
                                                        )}
                                                    </div>
                                                )}
                                                <div className="flex flex-wrap gap-2">
                                                    <Button variant="outline" size="sm" onClick={() => handleViewJob(application)}>
                                                        <Eye className="w-4 h-4 mr-2" />
                                                        View Details
                                                    </Button>
                                                    {application.status === 'interview' && (
                                                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                                            <Calendar className="w-4 h-4 mr-2" />
                                                            View Interview Info
                                                        </Button>
                                                    )}
                                                    {application.status === 'pending' && (
                                                        <Button variant="outline" size="sm">
                                                            <Edit className="w-4 h-4 mr-2" />
                                                            Update Application
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                ) ;
}

export default MyApplycation;

