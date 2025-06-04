
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const Development = () => {
  // 模拟需求列表数据
  const requirements = [
    { 
      id: 1, 
      title: "用户管理系统需求", 
      status: "待开发", 
      createDate: "2024-06-01",
      description: "构建完整的用户注册、登录、权限管理系统",
      taskCount: 8,
      completedTasks: 0
    },
    { 
      id: 2, 
      title: "订单处理流程优化", 
      status: "开发中", 
      createDate: "2024-06-02",
      description: "优化订单处理流程，提升处理效率",
      taskCount: 12,
      completedTasks: 5
    },
    { 
      id: 3, 
      title: "数据报表系统", 
      status: "已完成", 
      createDate: "2024-05-28",
      description: "开发业务数据统计与报表展示功能",
      taskCount: 6,
      completedTasks: 6
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case '待开发':
        return 'bg-yellow-100 text-yellow-800';
      case '开发中':
        return 'bg-blue-100 text-blue-800';
      case '已完成':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回首页
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">开发管理</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">需求列表</h2>
          <p className="text-gray-600">点击需求卡片进入对应的开发任务管理</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requirements.map((req) => (
            <Link key={req.id} to={`/development/${req.id}`}>
              <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md cursor-pointer hover:scale-105">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg text-gray-900">{req.title}</CardTitle>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(req.status)}`}>
                      {req.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{req.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">创建时间:</span>
                      <span className="text-gray-900">{req.createDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">任务进度:</span>
                      <span className="text-gray-900">{req.completedTasks}/{req.taskCount}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(req.completedTasks / req.taskCount) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {requirements.length === 0 && (
          <Card className="border-0 shadow-md">
            <CardContent className="p-8 text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">暂无需求</h4>
              <p className="text-gray-600 mb-6">还没有任何需求数据，请先创建需求调研报告</p>
              <Link to="/new-report">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  创建需求调研
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Development;
