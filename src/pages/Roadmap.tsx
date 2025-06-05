
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, DollarSign, Calendar, Target, CheckCircle, Clock, Zap, Users, Code, Rocket } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import TopNavigation from '@/components/TopNavigation';

interface RoadmapItem {
  id: string;
  time: string;
  milestone: string;
  description: string;
  totalCost: number;
  costDetails: { name: string; amount: number }[];
  status: 'completed' | 'current' | 'upcoming';
  icon: any;
  image?: string;
  achievements?: string[];
}

const Roadmap = () => {
  const { id } = useParams();
  const [animateItems, setAnimateItems] = useState(false);
  
  useEffect(() => {
    setTimeout(() => setAnimateItems(true), 300);
  }, []);

  const requirement = {
    id: parseInt(id || '1'),
    title: id === '1' ? '电商投放图生产流程优化' : id === '2' ? '智能设计师工作台开发' : '用户体验分析系统'
  };

  const [roadmapItems] = useState<RoadmapItem[]>([
    {
      id: '1',
      time: '2024-06-01',
      milestone: '需求调研完成',
      description: '深入调研电商投放图生产现状，识别痛点与优化机会',
      totalCost: 28000,
      costDetails: [
        { name: '用户调研与访谈', amount: 15000 },
        { name: '竞品分析报告', amount: 8000 },
        { name: '业务流程梳理', amount: 5000 }
      ],
      status: 'completed',
      icon: Users,
      achievements: ['完成30+设计师深度访谈', '识别5个核心痛点', '建立完整业务流程图']
    },
    {
      id: '2',
      time: '2024-06-15',
      milestone: '方案设计确认',
      description: '完成智能化设计方案设计，包括AI辅助工具与自动化流程',
      totalCost: 45000,
      costDetails: [
        { name: '产品方案设计', amount: 25000 },
        { name: '技术架构设计', amount: 12000 },
        { name: 'UI/UX设计稿', amount: 8000 }
      ],
      status: 'current',
      icon: Zap,
      achievements: ['设计智能化工作流', '完成核心功能原型', 'AI算法方案确认']
    },
    {
      id: '3',
      time: '2024-07-10',
      milestone: '核心功能开发',
      description: '开发AI辅助设计工具、模板库管理、批量处理等核心功能',
      totalCost: 120000,
      costDetails: [
        { name: '前端开发工时', amount: 50000 },
        { name: '后端开发工时', amount: 45000 },
        { name: 'AI模型训练', amount: 25000 }
      ],
      status: 'upcoming',
      icon: Code,
      achievements: ['AI设计助手上线', '智能模板推荐', '批量图片处理']
    },
    {
      id: '4',
      time: '2024-07-25',
      milestone: '系统测试上线',
      description: '完成系统全面测试，正式上线投入使用，培训设计师团队',
      totalCost: 35000,
      costDetails: [
        { name: '系统测试验证', amount: 15000 },
        { name: '用户培训服务', amount: 12000 },
        { name: '上线部署支持', amount: 8000 }
      ],
      status: 'upcoming',
      icon: Rocket,
      achievements: ['100%功能测试通过', '设计师培训完成', '生产效率提升60%']
    }
  ]);

  const totalProjectCost = roadmapItems.reduce((sum, item) => sum + item.totalCost, 0);
  const completedCost = roadmapItems.filter(item => item.status === 'completed').reduce((sum, item) => sum + item.totalCost, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <TopNavigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with enhanced design */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl"></div>
          <div className="relative p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <Link to={`/development/${id}`}>
                  <Button variant="ghost" size="sm" className="hover:bg-white/50">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    返回开发详情
                  </Button>
                </Link>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {requirement.title}
                  </h1>
                  <p className="text-xl text-gray-600 mt-2">项目路线图 · 总投入 ¥{totalProjectCost.toLocaleString()}</p>
                </div>
              </div>
              
              {/* Progress circle */}
              <div className="relative w-24 h-24">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none" className="text-gray-200" />
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none" className="text-blue-500"
                    strokeDasharray={`${(completedCost / totalProjectCost) * 251.2} 251.2`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-600">
                    {Math.round((completedCost / totalProjectCost) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-indigo-500 rounded-full opacity-30"></div>
          
          <div className="space-y-12">
            {roadmapItems.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={item.id} 
                  className={`relative flex items-center ${animateItems ? 'animate-fade-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Timeline dot */}
                  <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 hover:scale-110 ${
                    item.status === 'completed' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                    item.status === 'current' ? 'bg-gradient-to-r from-blue-500 to-indigo-500 animate-pulse' :
                    'bg-gradient-to-r from-gray-400 to-gray-500'
                  }`}>
                    {item.status === 'completed' ? 
                      <CheckCircle className="w-8 h-8 text-white" /> :
                      <Icon className="w-8 h-8 text-white" />
                    }
                  </div>
                  
                  {/* Content card */}
                  <div className={`ml-8 flex-1 ${isEven ? 'mr-0' : 'mr-8'}`}>
                    <Card className={`relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${
                      item.status === 'current' ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                    }`}>
                      {item.status === 'current' && (
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                      )}
                      
                      <CardContent className="p-8">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <h3 className="text-2xl font-bold text-gray-900">{item.milestone}</h3>
                              {item.status === 'current' && (
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                  进行中
                                </span>
                              )}
                            </div>
                            <div className="flex items-center text-gray-600 mb-4">
                              <Calendar className="w-5 h-5 mr-2" />
                              {item.time}
                            </div>
                            <p className="text-gray-700 text-lg leading-relaxed mb-6">{item.description}</p>
                            
                            {/* Achievements */}
                            {item.achievements && (
                              <div className="mb-6">
                                <h4 className="font-semibold text-gray-900 mb-3">关键成果：</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                  {item.achievements.map((achievement, idx) => (
                                    <div key={idx} className="flex items-center space-x-2 bg-green-50 rounded-lg p-3">
                                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                      <span className="text-sm text-gray-700">{achievement}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-4 ml-6">
                            <div className="text-right">
                              <div className="text-sm text-gray-500 mb-1">投入成本</div>
                              <div className="text-2xl font-bold text-gray-400">¥{item.totalCost.toLocaleString()}</div>
                            </div>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="hover:bg-gray-50">
                                  <DollarSign className="w-4 h-4 mr-1" />
                                  明细
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                  <DialogTitle className="text-xl">{item.milestone} - 成本明细</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 mt-6">
                                  {item.costDetails.map((cost, costIndex) => (
                                    <div key={costIndex} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                      <span className="text-gray-700 font-medium">{cost.name}</span>
                                      <span className="font-bold text-gray-900">¥{cost.amount.toLocaleString()}</span>
                                    </div>
                                  ))}
                                  <div className="border-t pt-4 flex justify-between items-center font-bold text-lg">
                                    <span>总计</span>
                                    <span className="text-blue-600">¥{item.totalCost.toLocaleString()}</span>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enhanced Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardContent className="p-8 text-center">
              <Target className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-blue-600 mb-2">{roadmapItems.length}</div>
              <div className="text-gray-600 font-medium">关键里程碑</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-8 text-center">
              <DollarSign className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-green-600 mb-2">¥{totalProjectCost.toLocaleString()}</div>
              <div className="text-gray-600 font-medium">项目总投入</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardContent className="p-8 text-center">
              <Clock className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-purple-600 mb-2">55</div>
              <div className="text-gray-600 font-medium">预计工作日</div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Roadmap;
