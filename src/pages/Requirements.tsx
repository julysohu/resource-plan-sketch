
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";
import TopNavigation from '@/components/TopNavigation';

const Requirements = () => {
  // 模拟需求数据
  const requirements = [
    {
      id: 1,
      title: "用户管理系统需求",
      status: "已完成",
      createDate: "2024-06-01",
      author: "张三",
      description: "构建完整的用户注册、登录、权限管理系统",
      version: "v1.2",
      lastModified: "2024-06-15"
    },
    {
      id: 2,
      title: "订单处理流程优化",
      status: "开发中",
      createDate: "2024-06-02",
      author: "李四",
      description: "优化订单处理流程，提升处理效率",
      version: "v1.0",
      lastModified: "2024-06-10"
    },
    {
      id: 3,
      title: "数据报表系统",
      status: "已完成",
      createDate: "2024-05-28",
      author: "王五",
      description: "开发业务数据统计与报表展示功能",
      version: "v2.1",
      lastModified: "2024-06-12"
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
      <TopNavigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">需求管理</h1>
            <p className="text-gray-600 mt-2">管理所有需求调研报告和需求文档</p>
          </div>
          <Link to="/new-report">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Plus className="w-4 h-4 mr-2" />
              新建需求调研
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requirements.map((req) => (
            <Link key={req.id} to={`/requirements/${req.id}`}>
              <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md cursor-pointer hover:scale-105">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg text-gray-900">{req.title}</CardTitle>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(req.status)}`}>
                      {req.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{req.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="w-4 h-4 mr-2" />
                      <span>创建人: {req.author}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>创建时间: {req.createDate}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">版本: {req.version}</span>
                      <span className="text-gray-600">更新: {req.lastModified}</span>
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
              <p className="text-gray-600 mb-6">还没有创建任何需求调研，点击上方按钮开始创建</p>
              <Link to="/new-report">
                <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                  创建第一个需求
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Requirements;
