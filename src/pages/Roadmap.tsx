
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, DollarSign, Calendar, Target } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import TopNavigation from '@/components/TopNavigation';

interface RoadmapItem {
  id: string;
  time: string;
  milestone: string;
  description: string;
  totalCost: number;
  costDetails: { name: string; amount: number }[];
}

const Roadmap = () => {
  const { id } = useParams();
  
  // 模拟需求信息
  const requirement = {
    id: parseInt(id || '1'),
    title: id === '1' ? '用户管理系统需求' : id === '2' ? '订单处理流程优化' : '数据报表系统'
  };

  // 模拟路线图数据
  const [roadmapItems] = useState<RoadmapItem[]>([
    {
      id: '1',
      time: '2024-06-01',
      milestone: '需求确认',
      description: '完成需求分析和确认，明确项目范围',
      totalCost: 15000,
      costDetails: [
        { name: '需求分析师工时', amount: 10000 },
        { name: '调研费用', amount: 3000 },
        { name: '文档制作', amount: 2000 }
      ]
    },
    {
      id: '2',
      time: '2024-06-15',
      milestone: '原型设计',
      description: '完成系统原型设计和交互设计',
      totalCost: 25000,
      costDetails: [
        { name: 'UI设计师工时', amount: 18000 },
        { name: '原型工具费用', amount: 2000 },
        { name: '设计评审', amount: 5000 }
      ]
    },
    {
      id: '3',
      time: '2024-06-30',
      milestone: '开发完成',
      description: '完成核心功能开发和单元测试',
      totalCost: 80000,
      costDetails: [
        { name: '前端开发工时', amount: 35000 },
        { name: '后端开发工时', amount: 40000 },
        { name: '代码审查', amount: 5000 }
      ]
    },
    {
      id: '4',
      time: '2024-07-15',
      milestone: '测试上线',
      description: '完成系统测试和生产环境部署',
      totalCost: 20000,
      costDetails: [
        { name: '测试工程师工时', amount: 12000 },
        { name: '服务器部署费用', amount: 5000 },
        { name: '上线支持', amount: 3000 }
      ]
    }
  ]);

  const totalProjectCost = roadmapItems.reduce((sum, item) => sum + item.totalCost, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <TopNavigation />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to={`/development/${id}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回开发详情
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{requirement.title} - 项目路线图</h1>
              <p className="text-gray-600">项目总成本: ¥{totalProjectCost.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Roadmap Timeline */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
            <CardTitle className="text-xl">项目路线图</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-8">
              {roadmapItems.map((item, index) => (
                <div key={item.id} className="relative">
                  {/* Timeline line */}
                  {index < roadmapItems.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-300"></div>
                  )}
                  
                  {/* Timeline item */}
                  <div className="flex items-start space-x-4">
                    {/* Timeline dot */}
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 bg-white border rounded-lg p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{item.milestone}</h3>
                          <div className="flex items-center text-gray-600 text-sm mt-1">
                            <Calendar className="w-4 h-4 mr-1" />
                            {item.time}
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="text-right">
                            <div className="text-lg font-bold text-purple-600">¥{item.totalCost.toLocaleString()}</div>
                            <div className="text-sm text-gray-500">里程碑成本</div>
                          </div>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <DollarSign className="w-4 h-4 mr-1" />
                                成本明细
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>{item.milestone} - 成本明细</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 mt-4">
                                {item.costDetails.map((cost, costIndex) => (
                                  <div key={costIndex} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                    <span className="text-sm text-gray-700">{cost.name}</span>
                                    <span className="font-medium text-gray-900">¥{cost.amount.toLocaleString()}</span>
                                  </div>
                                ))}
                                <div className="border-t pt-3 flex justify-between items-center font-semibold">
                                  <span>总计</span>
                                  <span className="text-purple-600">¥{item.totalCost.toLocaleString()}</span>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                      <p className="text-gray-700">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Project Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">{roadmapItems.length}</div>
              <div className="text-sm text-gray-600">里程碑节点</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">¥{totalProjectCost.toLocaleString()}</div>
              <div className="text-sm text-gray-600">项目总成本</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">45</div>
              <div className="text-sm text-gray-600">预计天数</div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Roadmap;
