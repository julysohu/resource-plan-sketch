
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Users, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  // 模拟数据
  const requirements = [
    { id: 1, title: "用户管理系统需求", status: "待开发", createDate: "2024-06-01" },
    { id: 2, title: "订单处理流程优化", status: "开发中", createDate: "2024-06-02" },
  ];

  const developmentStats = {
    total: 15,
    inProgress: 6,
    completed: 8,
    pending: 1
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">需求资产管理系统</h1>
                <p className="text-sm text-gray-600">需求调研与开发任务管理平台</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">欢迎使用需求资产管理系统</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            统一管理需求调研到开发实施的全流程，提升项目管理效率和质量
          </p>
        </div>

        {/* 需求管理部分 */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">需求管理</h3>
            <Link to="/new-report">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                新建需求调研
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {requirements.map((req) => (
              <Card key={req.id} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-gray-900">{req.title}</CardTitle>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      req.status === '待开发' ? 'bg-yellow-100 text-yellow-800' :
                      req.status === '开发中' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {req.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-3">创建时间: {req.createDate}</p>
                  <Link to={`/development/${req.id}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      查看开发任务
                    </Button>
                  </Link>
                </CardContent>
              </Card>
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
        </div>

        {/* 开发管理部分 */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">开发管理</h3>
            <Link to="/development">
              <Button variant="outline" className="border-green-200 text-green-600 hover:bg-green-50">
                <Users className="w-4 h-4 mr-2" />
                管理开发任务
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{developmentStats.total}</p>
                <p className="text-sm text-gray-600">总任务数</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{developmentStats.inProgress}</p>
                <p className="text-sm text-gray-600">进行中</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{developmentStats.completed}</p>
                <p className="text-sm text-gray-600">已完成</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{developmentStats.pending}</p>
                <p className="text-sm text-gray-600">待处理</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
