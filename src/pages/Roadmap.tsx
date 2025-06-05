
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, Calendar, DollarSign, Target, Milestone, MapPin, Clock, Image } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import TopNavigation from '@/components/TopNavigation';

interface MilestoneData {
  id: string;
  name: string;
  date: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending';
  costs: Array<{
    name: string;
    amount: number;
  }>;
  image?: string;
}

const Roadmap = () => {
  const { id } = useParams();
  const [selectedMilestone, setSelectedMilestone] = useState<MilestoneData | null>(null);
  const [isCostDetailOpen, setIsCostDetailOpen] = useState(false);

  // 模拟项目信息
  const project = {
    id: parseInt(id || '1'),
    title: id === '1' ? '用户管理系统需求' : id === '2' ? '订单处理流程优化' : '数据报表系统',
    description: id === '1' ? '构建完整的用户注册、登录、权限管理系统' : 
                 id === '2' ? '优化订单处理流程，提升处理效率' : 
                 '开发业务数据统计与报表展示功能'
  };

  const milestones: MilestoneData[] = [
    {
      id: '1',
      name: '需求分析完成',
      date: '2024-05-15',
      description: '完成用户需求调研与分析，明确功能范围和技术架构方案。深入了解用户痛点，制定详细的解决方案。',
      status: 'completed',
      costs: [
        { name: '需求分析师工资', amount: 8000 },
        { name: '调研费用', amount: 2000 }
      ],
      image: '/api/placeholder/300/200'
    },
    {
      id: '2',
      name: '系统架构设计',
      date: '2024-06-01',
      description: '设计系统整体架构，包括数据库设计、API接口设计和前端组件规划。确保系统的可扩展性和维护性。',
      status: 'completed',
      costs: [
        { name: '架构师工资', amount: 12000 },
        { name: '设计工具费', amount: 1000 }
      ],
      image: '/api/placeholder/300/200'
    },
    {
      id: '3',
      name: '核心功能开发',
      date: '2024-06-15',
      description: '开发用户注册、登录、权限管理等核心功能模块。采用模块化开发方式，确保代码质量和可测试性。',
      status: 'in-progress',
      costs: [
        { name: '前端开发工资', amount: 15000 },
        { name: '后端开发工资', amount: 18000 },
        { name: '开发环境费用', amount: 3000 }
      ],
      image: '/api/placeholder/300/200'
    },
    {
      id: '4',
      name: '系统测试',
      date: '2024-06-25',
      description: '进行全面的系统测试，包括单元测试、集成测试和用户验收测试。确保系统稳定性和用户体验。',
      status: 'pending',
      costs: [
        { name: '测试工程师工资', amount: 8000 },
        { name: '测试工具费', amount: 2000 }
      ],
      image: '/api/placeholder/300/200'
    },
    {
      id: '5',
      name: '系统部署上线',
      date: '2024-07-05',
      description: '完成系统部署配置，进行生产环境优化，正式上线运营。提供完整的部署文档和运维手册。',
      status: 'pending',
      costs: [
        { name: '运维工程师工资', amount: 6000 },
        { name: '服务器费用', amount: 5000 },
        { name: '域名SSL费用', amount: 500 }
      ],
      image: '/api/placeholder/300/200'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 border-green-600';
      case 'in-progress':
        return 'bg-blue-500 border-blue-600';
      case 'pending':
        return 'bg-gray-400 border-gray-500';
      default:
        return 'bg-gray-400 border-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'in-progress':
        return '进行中';
      case 'pending':
        return '待开始';
      default:
        return '待开始';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return {
      month: month.toString().padStart(2, '0'),
      day: day.toString().padStart(2, '0'),
      year: year.toString(),
      monthName: ['一月', '二月', '三月', '四月', '五月', '六月', 
                  '七月', '八月', '九月', '十月', '十一月', '十二月'][month - 1]
    };
  };

  const openCostDetail = (milestone: MilestoneData) => {
    setSelectedMilestone(milestone);
    setIsCostDetailOpen(true);
  };

  const totalCost = milestones.reduce((sum, milestone) => 
    sum + milestone.costs.reduce((milestoneSum, cost) => milestoneSum + cost.amount, 0), 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <TopNavigation />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to={`/development/${id}`}>
              <Button variant="ghost" size="sm" className="hover:bg-purple-100">
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回开发详情
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {project.title} - 项目路线图
              </h1>
              <p className="text-gray-600 mt-2">{project.description}</p>
            </div>
          </div>
        </div>

        {/* 项目概览卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6 text-center">
              <Target className="w-10 h-10 mx-auto mb-3 text-purple-100" />
              <div className="text-3xl font-bold">{milestones.length}</div>
              <div className="text-purple-100">里程碑总数</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6 text-center">
              <Clock className="w-10 h-10 mx-auto mb-3 text-blue-100" />
              <div className="text-3xl font-bold">{milestones.filter(m => m.status === 'completed').length}</div>
              <div className="text-blue-100">已完成</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6 text-center">
              <DollarSign className="w-10 h-10 mx-auto mb-3 text-green-100" />
              <div className="text-3xl font-bold">¥{(totalCost / 10000).toFixed(1)}万</div>
              <div className="text-green-100">总预算</div>
            </CardContent>
          </Card>
        </div>

        {/* 时间线 */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl flex items-center">
              <MapPin className="w-6 h-6 mr-3" />
              项目时间线
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="relative">
              {/* 时间线主线 */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 to-indigo-400 rounded-full"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => {
                  const dateInfo = formatDate(milestone.date);
                  const totalMilestoneCost = milestone.costs.reduce((sum, cost) => sum + cost.amount, 0);
                  
                  return (
                    <div key={milestone.id} className="relative flex items-start group">
                      {/* 时间标签 */}
                      <div className="flex flex-col items-center mr-8">
                        <div className={`w-16 h-16 rounded-full flex flex-col items-center justify-center text-white shadow-lg transform transition-all duration-300 group-hover:scale-110 ${getStatusColor(milestone.status)}`}>
                          <div className="text-lg font-bold">{dateInfo.day}</div>
                          <div className="text-xs">{dateInfo.month}月</div>
                        </div>
                        <div className="mt-2 text-center">
                          <div className="text-sm text-gray-500">{dateInfo.year}</div>
                          <div className="text-xs text-gray-400">{dateInfo.monthName}</div>
                        </div>
                      </div>

                      {/* 里程碑内容卡片 */}
                      <div className="flex-1 bg-white rounded-xl shadow-lg border border-gray-100 p-6 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-xl font-bold text-gray-900">{milestone.name}</h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                milestone.status === 'completed' ? 'bg-green-100 text-green-800' :
                                milestone.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {getStatusText(milestone.status)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* 里程碑描述和图片 */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          <div className="lg:col-span-2">
                            <p className="text-gray-600 leading-relaxed mb-4">{milestone.description}</p>
                            
                            {/* 成本信息 */}
                            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                              <div className="flex items-center space-x-2">
                                <DollarSign className="w-5 h-5 text-gray-500" />
                                <span className="text-sm text-gray-600">预算成本</span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <span className="text-lg font-bold text-gray-900">
                                  ¥{totalMilestoneCost.toLocaleString()}
                                </span>
                                <Button
                                  onClick={() => openCostDetail(milestone)}
                                  variant="outline"
                                  size="sm"
                                  className="text-xs hover:bg-purple-50 hover:border-purple-200"
                                >
                                  查看明细
                                </Button>
                              </div>
                            </div>
                          </div>
                          
                          {/* 里程碑图片 */}
                          <div className="lg:col-span-1">
                            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                              <Image className="w-12 h-12 text-gray-400" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 成本明细弹框 */}
        <Dialog open={isCostDetailOpen} onOpenChange={setIsCostDetailOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5" />
                <span>成本明细 - {selectedMilestone?.name}</span>
              </DialogTitle>
            </DialogHeader>
            {selectedMilestone && (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">总成本</div>
                  <div className="text-2xl font-bold text-gray-900">
                    ¥{selectedMilestone.costs.reduce((sum, cost) => sum + cost.amount, 0).toLocaleString()}
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">成本明细</h4>
                  {selectedMilestone.costs.map((cost, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-gray-700">{cost.name}</span>
                      <span className="font-medium text-gray-900">¥{cost.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Roadmap;
