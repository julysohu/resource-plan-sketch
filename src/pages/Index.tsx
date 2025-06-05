
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Users, Building, User, PlusCircle, BarChart3, Target, Zap, TrendingUp, Calendar, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import TopNavigation from '@/components/TopNavigation';

const Index = () => {
  const quickStats = [
    { label: '总需求数', value: '12', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: '进行中项目', value: '5', icon: Users, color: 'text-green-600', bg: 'bg-green-100' },
    { label: '部门任务', value: '28', icon: Building, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: '个人任务', value: '8', icon: User, color: 'text-orange-600', bg: 'bg-orange-100' },
  ];

  const recentRequirements = [
    { id: 1, title: '用户管理系统优化', status: '开发中', date: '2024-06-15', priority: '高' },
    { id: 2, title: '订单处理流程改进', status: '需求分析', date: '2024-06-18', priority: '中' },
    { id: 3, title: '数据报表功能扩展', status: '已完成', date: '2024-06-20', priority: '低' },
  ];

  const recentTasks = [
    { title: '电商投放图设计稿修改', project: '电商投放图优化', status: '逾期', priority: '高' },
    { title: '用户调研数据分析', project: '用户调研项目', status: '进行中', priority: '高' },
    { title: '竞品分析报告撰写', project: '市场调研项目', status: '进行中', priority: '中' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case '已完成': return 'bg-green-100 text-green-800';
      case '开发中': case '进行中': return 'bg-blue-100 text-blue-800';
      case '需求分析': return 'bg-yellow-100 text-yellow-800';
      case '逾期': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case '高': return 'bg-red-100 text-red-800';
      case '中': return 'bg-yellow-100 text-yellow-800';
      case '低': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <TopNavigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 欢迎区域 */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">欢迎使用需求资产管理系统</h1>
                <p className="text-blue-100 text-lg">高效管理需求、开发、部门任务，助力团队协作</p>
              </div>
              <div className="hidden md:block">
                <Target className="w-24 h-24 text-blue-200" />
              </div>
            </div>
          </div>
        </div>

        {/* 快速统计 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                      <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bg}`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 快速操作 */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span>快速操作</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/new-report">
                <Button className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                  <PlusCircle className="w-6 h-6" />
                  <span>新建需求</span>
                </Button>
              </Link>
              <Link to="/development">
                <Button className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                  <Users className="w-6 h-6" />
                  <span>开发管理</span>
                </Button>
              </Link>
              <Link to="/department">
                <Button className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
                  <Building className="w-6 h-6" />
                  <span>部门管理</span>
                </Button>
              </Link>
              <Link to="/personal">
                <Button className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                  <User className="w-6 h-6" />
                  <span>个人管理</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 最近需求 */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>最近需求</span>
                </div>
                <Link to="/requirements">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-blue-600">
                    查看全部
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {recentRequirements.map((req) => (
                  <Link key={req.id} to="/requirements" className="block">
                    <div className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{req.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(req.status)}`}>
                          {req.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {req.date}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(req.priority)}`}>
                          {req.priority}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 我的任务 */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>我的任务</span>
                </div>
                <Link to="/personal">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-purple-600">
                    查看全部
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {recentTasks.map((task, index) => (
                  <Link key={index} to="/personal" className="block">
                    <div className="p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{task.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>项目: {task.project}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 数据概览 */}
        <Card className="mt-8 border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>本月数据概览</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">85%</div>
                <div className="text-sm text-gray-600">需求完成率</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">6</div>
                <div className="text-sm text-gray-600">新增需求</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">24</div>
                <div className="text-sm text-gray-600">完成任务</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">92%</div>
                <div className="text-sm text-gray-600">按时完成率</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Index;
