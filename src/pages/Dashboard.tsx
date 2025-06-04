
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Users, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import TopNavigation from '@/components/TopNavigation';

const Dashboard = () => {
  // 模拟部门看板数据
  const departmentData = [
    {
      id: 1,
      title: "用户管理系统需求",
      department: "技术部",
      progress: 85,
      status: "开发中",
      totalTasks: 12,
      completedTasks: 10,
      remainingDays: 5,
      team: ["张三", "李四", "王五"]
    },
    {
      id: 2,
      title: "订单处理流程优化",
      department: "产品部",
      progress: 60,
      status: "设计阶段",
      totalTasks: 8,
      completedTasks: 5,
      remainingDays: 12,
      team: ["赵六", "钱七"]
    },
    {
      id: 3,
      title: "数据报表系统",
      department: "运营部",
      progress: 100,
      status: "已完成",
      totalTasks: 6,
      completedTasks: 6,
      remainingDays: 0,
      team: ["孙八", "周九", "吴十"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case '设计阶段':
        return 'bg-yellow-100 text-yellow-800';
      case '开发中':
        return 'bg-blue-100 text-blue-800';
      case '已完成':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    return 'bg-yellow-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <TopNavigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">部门看板</h1>
          <p className="text-gray-600 mt-2">实时监控各部门需求进展情况</p>
        </div>

        {/* 总览统计 */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {departmentData.reduce((sum, item) => sum + item.totalTasks, 0)}
              </p>
              <p className="text-sm text-gray-600">总任务数</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {departmentData.reduce((sum, item) => sum + item.completedTasks, 0)}
              </p>
              <p className="text-sm text-gray-600">已完成任务</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {departmentData.filter(item => item.status !== '已完成').length}
              </p>
              <p className="text-sm text-gray-600">进行中项目</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {new Set(departmentData.flatMap(item => item.team)).size}
              </p>
              <p className="text-sm text-gray-600">参与人员</p>
            </CardContent>
          </Card>
        </div>

        {/* 需求进展详情 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departmentData.map((item) => (
            <Link key={item.id} to={`/development/${item.id}`}>
              <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md cursor-pointer hover:scale-105">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg text-gray-900">{item.title}</CardTitle>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{item.department}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* 进度条 */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">完成进度</span>
                        <span className="font-medium">{item.progress}%</span>
                      </div>
                      <Progress value={item.progress} className="h-2" />
                    </div>

                    {/* 任务统计 */}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">任务进度:</span>
                      <span className="text-gray-900">{item.completedTasks}/{item.totalTasks}</span>
                    </div>

                    {/* 剩余天数 */}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">剩余天数:</span>
                      <span className={`font-medium ${item.remainingDays <= 7 ? 'text-red-600' : 'text-gray-900'}`}>
                        {item.remainingDays > 0 ? `${item.remainingDays}天` : '已完成'}
                      </span>
                    </div>

                    {/* 团队成员 */}
                    <div>
                      <span className="text-sm text-gray-600">团队成员:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.team.map((member, index) => (
                          <span key={index} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            {member}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
