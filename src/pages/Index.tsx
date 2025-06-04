
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, BarChart3, Target } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">项目资产管理系统</h1>
                <p className="text-sm text-gray-600">需求调研报告管理平台</p>
              </div>
            </div>
            <Link to="/new-report">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                新建调研报告
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">欢迎使用需求调研报告系统</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            专业的项目需求分析与调研管理平台，帮助您构建完整的需求调研报告，优化项目决策流程
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-3">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl text-gray-900">结构化报告</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                八大核心模块，从背景分析到投入产出，全流程覆盖项目需求调研要点
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-3">
                <Target className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl text-gray-900">流程可视化</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                支持流程图展示和场景对比分析，直观呈现调研流程和解决方案效果
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-3">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl text-gray-900">智能分析</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                AI效能评审功能，自动分析方案优劣，辅助决策制定和资源配置
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Start */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">开始您的第一个调研报告</h3>
            <p className="text-blue-100 mb-6 text-lg">
              点击下方按钮，创建您的专业需求调研报告，让项目决策更加科学高效
            </p>
            <Link to="/new-report">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-50">
                <Plus className="w-5 h-5 mr-2" />
                立即创建报告
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Reports Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">最近的报告</h3>
          <div className="bg-white rounded-lg shadow-md p-8 text-center border-0">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">暂无报告</h4>
            <p className="text-gray-600 mb-6">您还没有创建任何调研报告，点击上方按钮开始您的第一个报告</p>
            <Link to="/new-report">
              <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                创建第一个报告
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
