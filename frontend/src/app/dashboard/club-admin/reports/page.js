'use client';
import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Download,
  FileText,
  Award,
  Users,
  Building2,
  Calendar,
  Target,
  Filter,
  Search,
  ChevronDown,
  BookOpen,
  Briefcase,
  Trophy,
  Star,
  Activity,
  PieChart,
  LineChart,
  CheckCircle,
  AlertCircle,
  Clock,
  Globe,
  GraduationCap,
  Medal,
  Lightbulb,
  FileCheck,
  Eye,
  X,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';
import ClubAdminLayout from '../../components-club-admin/ClubAdminLayout';

// Mock data
const institutionStats = {
  totalStudents: 3247,
  withCertifications: 2156,
  withInternships: 892,
  activeInActivities: 1874,
  certificationRate: 66.4,
  internshipRate: 27.5,
  activityRate: 57.7
};

const departmentData = [
  { 
    name: 'Computer Science', 
    code: 'CSE',
    students: 856,
    certifications: 687,
    internships: 312,
    activities: 542,
    participationRate: 80.2,
    trend: 'up'
  },
  { 
    name: 'Electronics', 
    code: 'ECE',
    students: 642,
    certifications: 456,
    internships: 198,
    activities: 387,
    participationRate: 71.1,
    trend: 'up'
  },
  { 
    name: 'Mechanical', 
    code: 'ME',
    students: 578,
    certifications: 312,
    internships: 145,
    activities: 298,
    participationRate: 54.0,
    trend: 'down'
  },
  { 
    name: 'Civil Engineering', 
    code: 'CE',
    students: 489,
    certifications: 267,
    internships: 98,
    activities: 234,
    participationRate: 54.6,
    trend: 'up'
  },
  { 
    name: 'Information Tech', 
    code: 'IT',
    students: 423,
    certifications: 298,
    internships: 87,
    activities: 256,
    participationRate: 60.5,
    trend: 'stable'
  },
  { 
    name: 'Electrical', 
    code: 'EE',
    students: 259,
    certifications: 136,
    internships: 52,
    activities: 157,
    participationRate: 52.9,
    trend: 'up'
  }
];

const activityTrends = [
  { month: 'Jan', workshops: 45, competitions: 23, certifications: 189 },
  { month: 'Feb', workshops: 52, competitions: 28, certifications: 234 },
  { month: 'Mar', workshops: 67, competitions: 35, certifications: 312 },
  { month: 'Apr', workshops: 58, competitions: 31, certifications: 287 },
  { month: 'May', workshops: 43, competitions: 19, certifications: 198 },
  { month: 'Jun', workshops: 71, competitions: 42, certifications: 356 },
  { month: 'Jul', workshops: 64, competitions: 38, certifications: 298 },
  { month: 'Aug', workshops: 78, competitions: 45, certifications: 412 }
];

const topActivities = [
  { name: 'Technical Workshops', count: 892, growth: 23.5 },
  { name: 'Coding Competitions', count: 645, growth: 18.2 },
  { name: 'Hackathons', count: 534, growth: 31.8 },
  { name: 'Industry Visits', count: 423, growth: 12.4 },
  { name: 'Cultural Events', count: 398, growth: 8.9 }
];

const accreditationReports = [
  { 
    id: 1,
    type: 'NAAC',
    name: 'NAAC Accreditation Report 2024',
    period: 'Jan 2023 - Dec 2023',
    status: 'ready',
    criteria: ['Student Performance', 'Infrastructure', 'Learning Resources', 'Student Support'],
    lastGenerated: '2024-01-15'
  },
  { 
    id: 2,
    type: 'AICTE',
    name: 'AICTE Annual Report 2023-24',
    period: 'Academic Year 2023-24',
    status: 'ready',
    criteria: ['Faculty Data', 'Student Outcomes', 'Infrastructure', 'Research Activities'],
    lastGenerated: '2024-01-10'
  },
  { 
    id: 3,
    type: 'NIRF',
    name: 'NIRF Ranking Data 2024',
    period: 'Previous 3 Years',
    status: 'ready',
    criteria: ['Teaching Learning', 'Research', 'Graduate Outcomes', 'Outreach'],
    lastGenerated: '2024-01-12'
  },
  { 
    id: 4,
    type: 'NBA',
    name: 'NBA Program Accreditation',
    period: 'Last 3 Academic Years',
    status: 'pending',
    criteria: ['Curriculum', 'Faculty', 'Students', 'Resources'],
    lastGenerated: null
  }
];

const ReportsAnalytics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('year');
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'departments', label: 'Departments', icon: Building2 },
    { id: 'trends', label: 'Trends', icon: TrendingUp },
    { id: 'accreditation', label: 'Accreditation', icon: FileCheck }
  ];

  const StatCard = ({ icon: Icon, label, value, subValue, trend, color }) => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center`}>
          <Icon className={color.replace('bg-', 'text-').replace('100', '600')} size={18} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-medium ${
            trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
          }`}>
            {trend === 'up' ? <ArrowUpRight size={14} /> : trend === 'down' ? <ArrowDownRight size={14} /> : <Minus size={14} />}
            {trend === 'up' ? '+12.5%' : trend === 'down' ? '-5.2%' : '0%'}
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-[var(--galaxy)] mb-1">{value}</p>
      <p className="text-xs text-[var(--planetary)] mb-1">{label}</p>
      {subValue && <p className="text-xs text-gray-500">{subValue}</p>}
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          label="Total Students"
          value={institutionStats.totalStudents.toLocaleString()}
          subValue="Across all departments"
          color="bg-blue-100"
          trend="up"
        />
        <StatCard
          icon={Award}
          label="With Certifications"
          value={institutionStats.withCertifications.toLocaleString()}
          subValue={`${institutionStats.certificationRate}% of students`}
          color="bg-green-100"
          trend="up"
        />
        <StatCard
          icon={Briefcase}
          label="Internships Secured"
          value={institutionStats.withInternships.toLocaleString()}
          subValue={`${institutionStats.internshipRate}% placement rate`}
          color="bg-purple-100"
          trend="up"
        />
        <StatCard
          icon={Activity}
          label="Active in Activities"
          value={institutionStats.activeInActivities.toLocaleString()}
          subValue={`${institutionStats.activityRate}% participation`}
          color="bg-orange-100"
          trend="stable"
        />
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Activities */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-lg font-semibold text-[var(--galaxy)] mb-4 flex items-center gap-2">
            <Trophy size={18} />
            Top Activities by Participation
          </h3>
          <div className="space-y-3">
            {topActivities.map((activity, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[var(--planetary)] text-white rounded-lg flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-[var(--galaxy)]">{activity.name}</p>
                    <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                      <ArrowUpRight size={12} />
                      {activity.growth}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-[var(--planetary)] to-[var(--sapphire)] h-2 rounded-full"
                        style={{ width: `${(activity.count / topActivities[0].count) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-semibold text-[var(--planetary)]">{activity.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Department Overview */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-lg font-semibold text-[var(--galaxy)] mb-4 flex items-center gap-2">
            <Building2 size={18} />
            Department Participation Rates
          </h3>
          <div className="space-y-3">
            {departmentData.slice(0, 5).map((dept, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-[var(--planetary)] to-[var(--sapphire)] rounded-xl flex items-center justify-center text-white text-xs font-bold">
                  {dept.code}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-[var(--galaxy)]">{dept.name}</p>
                    <span className="text-sm font-bold text-[var(--planetary)]">{dept.participationRate}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        dept.participationRate >= 70 ? 'bg-green-500' :
                        dept.participationRate >= 60 ? 'bg-yellow-500' : 'bg-orange-500'
                      }`}
                      style={{ width: `${dept.participationRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Trend Chart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-[var(--galaxy)] flex items-center gap-2">
            <LineChart size={18} />
            Activity Trends (Last 8 Months)
          </h3>
          <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium">
            <option>All Activities</option>
            <option>Workshops</option>
            <option>Competitions</option>
            <option>Certifications</option>
          </select>
        </div>
        <div className="space-y-4">
          {activityTrends.map((month, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-12 text-xs font-semibold text-[var(--planetary)]">{month.month}</div>
              <div className="flex-1 flex gap-2">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">Workshops</span>
                    <span className="text-xs font-semibold">{month.workshops}</span>
                  </div>
                  <div className="bg-blue-100 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(month.workshops / 80) * 100}%` }}></div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">Competitions</span>
                    <span className="text-xs font-semibold">{month.competitions}</span>
                  </div>
                  <div className="bg-green-100 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(month.competitions / 50) * 100}%` }}></div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">Certifications</span>
                    <span className="text-xs font-semibold">{month.certifications}</span>
                  </div>
                  <div className="bg-purple-100 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${(month.certifications / 450) * 100}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDepartments = () => (
    <div className="space-y-6">
      {/* Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {departmentData.map((dept, index) => (
          <div key={index} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-[var(--planetary)] to-[var(--sapphire)] rounded-xl flex items-center justify-center text-white font-bold">
                  {dept.code}
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--galaxy)]">{dept.name}</h3>
                  <p className="text-xs text-[var(--planetary)]">{dept.students} students</p>
                </div>
              </div>
              {dept.trend === 'up' ? (
                <ArrowUpRight className="text-green-600" size={20} />
              ) : dept.trend === 'down' ? (
                <ArrowDownRight className="text-red-600" size={20} />
              ) : (
                <Minus className="text-gray-600" size={20} />
              )}
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">Certifications</span>
                  <span className="text-xs font-bold text-[var(--galaxy)]">
                    {dept.certifications} ({((dept.certifications / dept.students) * 100).toFixed(1)}%)
                  </span>
                </div>
                <div className="bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-green-500 h-1.5 rounded-full"
                    style={{ width: `${(dept.certifications / dept.students) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">Internships</span>
                  <span className="text-xs font-bold text-[var(--galaxy)]">
                    {dept.internships} ({((dept.internships / dept.students) * 100).toFixed(1)}%)
                  </span>
                </div>
                <div className="bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-purple-500 h-1.5 rounded-full"
                    style={{ width: `${(dept.internships / dept.students) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">Activities</span>
                  <span className="text-xs font-bold text-[var(--galaxy)]">
                    {dept.activities} ({((dept.activities / dept.students) * 100).toFixed(1)}%)
                  </span>
                </div>
                <div className="bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-blue-500 h-1.5 rounded-full"
                    style={{ width: `${(dept.activities / dept.students) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[var(--planetary)]">Overall Participation</span>
                <span className={`text-lg font-bold ${
                  dept.participationRate >= 70 ? 'text-green-600' :
                  dept.participationRate >= 60 ? 'text-yellow-600' : 'text-orange-600'
                }`}>
                  {dept.participationRate}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comparative Analysis */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-lg font-semibold text-[var(--galaxy)] mb-4 flex items-center gap-2">
          <BarChart3 size={18} />
          Comparative Department Analysis
        </h3>
        <div className="space-y-4">
          {departmentData.map((dept, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-28">
                <p className="text-sm font-medium text-[var(--galaxy)]">{dept.code}</p>
              </div>
              <div className="flex-1">
                <div className="flex gap-2 h-10">
                  <div 
                    className="bg-green-500 rounded flex items-center justify-center text-white text-xs font-semibold"
                    style={{ width: `${(dept.certifications / dept.students) * 100}%` }}
                    title="Certifications"
                  >
                    {dept.certifications}
                  </div>
                  <div 
                    className="bg-purple-500 rounded flex items-center justify-center text-white text-xs font-semibold"
                    style={{ width: `${(dept.internships / dept.students) * 100}%` }}
                    title="Internships"
                  >
                    {dept.internships}
                  </div>
                  <div 
                    className="bg-blue-500 rounded flex items-center justify-center text-white text-xs font-semibold"
                    style={{ width: `${(dept.activities / dept.students) * 100}%` }}
                    title="Activities"
                  >
                    {dept.activities}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-xs text-gray-600">Certifications</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-500 rounded"></div>
            <span className="text-xs text-gray-600">Internships</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-xs text-gray-600">Activities</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAccreditation = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {accreditationReports.map((report) => (
          <div 
            key={report.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => {
              setSelectedReport(report);
              setShowReportModal(true);
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  report.type === 'NAAC' ? 'bg-blue-100 text-blue-600' :
                  report.type === 'AICTE' ? 'bg-green-100 text-green-600' :
                  report.type === 'NIRF' ? 'bg-purple-100 text-purple-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  <FileCheck size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--galaxy)]">{report.name}</h3>
                  <p className="text-xs text-[var(--planetary)] mt-1">{report.period}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                report.status === 'ready' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {report.status === 'ready' ? 'Ready' : 'Pending'}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-xs font-semibold text-gray-400 uppercase">Criteria Included</p>
              <div className="flex flex-wrap gap-2">
                {report.criteria.map((criterion, idx) => (
                  <span key={idx} className="px-2 py-1 bg-[var(--sky)] text-[var(--planetary)] rounded-lg text-xs">
                    {criterion}
                  </span>
                ))}
              </div>
            </div>

            {report.lastGenerated && (
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500">
                  Last generated: {new Date(report.lastGenerated).toLocaleDateString()}
                </span>
                <button className="flex items-center gap-1 px-3 py-1.5 bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white rounded-lg text-xs font-medium transition-colors">
                  <Download size={12} />
                  Download
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Generate Section */}
      <div className="bg-gradient-to-r from-[var(--planetary)] to-[var(--sapphire)] rounded-2xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-2">Generate Custom Report</h3>
        <p className="text-sm opacity-90 mb-4">
          Create custom reports for specific timeframes, departments, or criteria
        </p>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-white text-[var(--planetary)] rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
            Custom NAAC Report
          </button>
          <button className="px-4 py-2 bg-white text-[var(--planetary)] rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
            Department Analysis
          </button>
          <button className="px-4 py-2 bg-white text-[var(--planetary)] rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
            Student Outcomes
          </button>
          <button className="px-4 py-2 bg-white text-[var(--planetary)] rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
            Activity Summary
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <ClubAdminLayout>
      <div className="space-y-6">
        {/* Header */}
        {/* <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--galaxy)] flex items-center gap-2">
              <BarChart3 size={28} />
              Reports & Analytics
            </h1>
            <p className="text-[var(--planetary)] mt-1">
              Comprehensive insights for accreditation and institutional excellence
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-[var(--galaxy)] hover:bg-gray-50 transition-colors">
              <Calendar size={16} />
              <span>This Year</span>
              <ChevronDown size={14} />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white rounded-xl text-sm font-medium transition-colors">
              <Download size={16} />
              Export All
            </button>
          </div>
        </div> */}

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-1 p-1">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors flex-1 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-[var(--planetary)] to-[var(--sapphire)] text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div>
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'departments' && renderDepartments()}
          {activeTab === 'trends' && renderOverview()}
          {activeTab === 'accreditation' && renderAccreditation()}
        </div>
      </div>

      {/* Report Detail Modal */}
      {showReportModal && selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    selectedReport.type === 'NAAC' ? 'bg-blue-100 text-blue-600' :
                    selectedReport.type === 'AICTE' ? 'bg-green-100 text-green-600' :
                    selectedReport.type === 'NIRF' ? 'bg-purple-100 text-purple-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    <FileCheck size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[var(--galaxy)]">{selectedReport.name}</h2>
                    <p className="text-[var(--planetary)] text-sm mt-1">{selectedReport.period}</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setShowReportModal(false);
                    setSelectedReport(null);
                  }}
                  className="p-2 text-[var(--planetary)] hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="space-y-6">
                {/* Report Summary */}
                <div className="bg-gray-50 rounded-2xl p-5">
                  <h3 className="text-lg font-semibold text-[var(--galaxy)] mb-4">Report Summary</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Users size={14} className="text-blue-600" />
                        </div>
                        <p className="text-xs text-gray-600">Students</p>
                      </div>
                      <p className="text-2xl font-bold text-[var(--galaxy)]">3,247</p>
                    </div>
                    <div className="bg-white rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <Award size={14} className="text-green-600" />
                        </div>
                        <p className="text-xs text-gray-600">Certifications</p>
                      </div>
                      <p className="text-2xl font-bold text-[var(--galaxy)]">2,156</p>
                    </div>
                    <div className="bg-white rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Briefcase size={14} className="text-purple-600" />
                        </div>
                        <p className="text-xs text-gray-600">Internships</p>
                      </div>
                      <p className="text-2xl font-bold text-[var(--galaxy)]">892</p>
                    </div>
                    <div className="bg-white rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Activity size={14} className="text-orange-600" />
                        </div>
                        <p className="text-xs text-gray-600">Activities</p>
                      </div>
                      <p className="text-2xl font-bold text-[var(--galaxy)]">1,874</p>
                    </div>
                  </div>
                </div>

                {/* Criteria Details */}
                <div className="bg-gray-50 rounded-2xl p-5">
                  <h3 className="text-lg font-semibold text-[var(--galaxy)] mb-4">Criteria Coverage</h3>
                  <div className="space-y-3">
                    {selectedReport.criteria.map((criterion, idx) => (
                      <div key={idx} className="bg-white rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-[var(--galaxy)]">{criterion}</span>
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                            <CheckCircle size={12} />
                            Complete
                          </span>
                        </div>
                        <div className="bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Export Options */}
                <div className="bg-gray-50 rounded-2xl p-5">
                  <h3 className="text-lg font-semibold text-[var(--galaxy)] mb-4">Export Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <button className="flex items-center gap-3 p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors border border-gray-200">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <FileText size={18} className="text-red-600" />
                      </div>
                      <div className="text-left flex-1">
                        <p className="text-sm font-semibold text-[var(--galaxy)]">PDF Report</p>
                        <p className="text-xs text-gray-500">Formatted for printing</p>
                      </div>
                      <Download size={16} className="text-gray-400" />
                    </button>
                    <button className="flex items-center gap-3 p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors border border-gray-200">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <FileText size={18} className="text-green-600" />
                      </div>
                      <div className="text-left flex-1">
                        <p className="text-sm font-semibold text-[var(--galaxy)]">Excel Data</p>
                        <p className="text-xs text-gray-500">Raw data for analysis</p>
                      </div>
                      <Download size={16} className="text-gray-400" />
                    </button>
                    <button className="flex items-center gap-3 p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors border border-gray-200">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText size={18} className="text-blue-600" />
                      </div>
                      <div className="text-left flex-1">
                        <p className="text-sm font-semibold text-[var(--galaxy)]">Word Document</p>
                        <p className="text-xs text-gray-500">Editable format</p>
                      </div>
                      <Download size={16} className="text-gray-400" />
                    </button>
                    <button className="flex items-center gap-3 p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors border border-gray-200">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <BarChart3 size={18} className="text-purple-600" />
                      </div>
                      <div className="text-left flex-1">
                        <p className="text-sm font-semibold text-[var(--galaxy)]">PowerPoint</p>
                        <p className="text-xs text-gray-500">Presentation slides</p>
                      </div>
                      <Download size={16} className="text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[var(--planetary)] to-[var(--sapphire)] text-white rounded-xl font-medium hover:shadow-lg transition-shadow">
                    <Download size={18} />
                    Download Complete Report
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                    <Eye size={18} />
                    Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
  
    </ClubAdminLayout>
  );
};

export default ReportsAnalytics;