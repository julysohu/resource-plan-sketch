
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Target, Users, TrendingUp, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import TopNavigation from '@/components/TopNavigation';

const ProjectBoard = () => {
  const [selectedProject, setSelectedProject] = useState("yiWang-tmall");

  const projects = [
    {
      id: "yiWang-tmall",
      name: "壹网壹创&天猫共创项目",
      scenarios: [
        {
          id: "yiWang",
          name: "壹网壹创愿景",
          description: "通过深度整合品牌资源与市场洞察，构建全链路数字化营销体系，实现品牌价值最大化。",
          color: "from-blue-500 to-blue-600",
          icon: "🎯",
          progress: 75,
          tasks: [
            { name: "输出对应场景策略", status: "completed", priority: "high" },
            { name: "场景流程梳理与拆解", status: "in-progress", priority: "medium" },
            { name: "策略说明", status: "pending", priority: "low" },
            { name: "表达培训", status: "pending", priority: "medium" }
          ],
          metrics: {
            totalTasks: 15,
            completedTasks: 8,
            teamMembers: 6,
            daysLeft: 12
          }
        },
        {
          id: "tmall",
          name: "阿里天猫愿景",
          description: "依托天猫平台强大的生态系统，通过精细化运营和创新营销活动，赋能品牌实现高效增长。",
          color: "from-orange-500 to-orange-600",
          icon: "🛒",
          progress: 60,
          tasks: [
            { name: "负责广研落地", status: "completed", priority: "high" },
            { name: "场景梳理", status: "in-progress", priority: "high" },
            { name: "最终双方需要开放认领全增保双方话题工厂一款", status: "in-progress", priority: "medium" },
            { name: "MVP demo搭建", status: "pending", priority: "high" },
            { name: "游戏机制", status: "pending", priority: "medium" }
          ],
          metrics: {
            totalTasks: 12,
            completedTasks: 5,
            teamMembers: 8,
            daysLeft: 18
          }
        }
      ]
    },
    {
      id: "digital-marketing",
      name: "数字营销创新项目",
      scenarios: [
        {
          id: "social",
          name: "社交媒体矩阵",
          description: "构建全平台社交媒体营销矩阵，实现品牌影响力的全方位提升。",
          color: "from-purple-500 to-purple-600",
          icon: "📱",
          progress: 85,
          tasks: [
            { name: "平台策略制定", status: "completed", priority: "high" },
            { name: "内容创作流程", status: "completed", priority: "medium" },
            { name: "数据分析体系", status: "in-progress", priority: "high" }
          ],
          metrics: {
            totalTasks: 10,
            completedTasks: 7,
            teamMembers: 4,
            daysLeft: 5
          }
        },
        {
          id: "ai-powered",
          name: "AI智能营销",
          description: "运用人工智能技术，实现精准营销和个性化用户体验。",
          color: "from-green-500 to-green-600",
          icon: "🤖",
          progress: 40,
          tasks: [
            { name: "算法模型设计", status: "in-progress", priority: "high" },
            { name: "数据收集整理", status: "pending", priority: "medium" },
            { name: "测试环境搭建", status: "pending", priority: "low" }
          ],
          metrics: {
            totalTasks: 8,
            completedTasks: 2,
            teamMembers: 5,
            daysLeft: 25
          }
        }
      ]
    }
  ];

  const currentProject = projects.find(p => p.id === selectedProject);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'pending': return <AlertTriangle className="w-4 h-4 text-gray-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <TopNavigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 页面标题和项目选择器 */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">专项项目看板</h1>
              <p className="text-gray-600 mt-2">实时监控专项项目进展和关键指标</p>
            </div>
            <div className="w-64">
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="选择专项项目" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {currentProject && (
          <>
            {/* 项目概览卡片 */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {currentProject.scenarios.map((scenario) => (
                <Card key={scenario.id} className="border-0 shadow-lg overflow-hidden">
                  <div className={`h-32 bg-gradient-to-r ${scenario.color} text-white p-6 flex items-center`}>
                    <div className="text-4xl mr-4">{scenario.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{scenario.name}</h3>
                      <p className="text-blue-100 text-sm">{scenario.description}</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    {/* 进度条 */}
                    <div className="mb-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">整体进度</span>
                        <span className="font-medium">{scenario.progress}%</span>
                      </div>
                      <Progress value={scenario.progress} className="h-2" />
                    </div>

                    {/* 关键指标 */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-center mb-1">
                          <Target className="w-4 h-4 text-blue-600 mr-1" />
                          <span className="text-xs text-gray-600">任务进度</span>
                        </div>
                        <div className="text-lg font-bold text-gray-900">
                          {scenario.metrics.completedTasks}/{scenario.metrics.totalTasks}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-center mb-1">
                          <Users className="w-4 h-4 text-green-600 mr-1" />
                          <span className="text-xs text-gray-600">团队人数</span>
                        </div>
                        <div className="text-lg font-bold text-gray-900">
                          {scenario.metrics.teamMembers}人
                        </div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-center mb-1">
                          <CalendarDays className="w-4 h-4 text-orange-600 mr-1" />
                          <span className="text-xs text-gray-600">剩余天数</span>
                        </div>
                        <div className="text-lg font-bold text-gray-900">
                          {scenario.metrics.daysLeft}天
                        </div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-center mb-1">
                          <TrendingUp className="w-4 h-4 text-purple-600 mr-1" />
                          <span className="text-xs text-gray-600">完成率</span>
                        </div>
                        <div className="text-lg font-bold text-gray-900">
                          {Math.round((scenario.metrics.completedTasks / scenario.metrics.totalTasks) * 100)}%
                        </div>
                      </div>
                    </div>

                    {/* 主航道与主目标产出 */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Target className="w-4 h-4 mr-2" />
                        主航道与主目标产出
                      </h4>
                      <div className="space-y-3">
                        {scenario.tasks.map((task, index) => (
                          <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center space-x-3">
                              {getStatusIcon(task.status)}
                              <span className="text-sm text-gray-700">{task.name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                                {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
                              </Badge>
                              <Badge className={`text-xs ${getStatusColor(task.status)}`}>
                                {task.status === 'completed' ? '已完成' : task.status === 'in-progress' ? '进行中' : '待开始'}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 项目汇总统计 */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>{currentProject.name} - 项目汇总</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-600 mb-1">
                      {currentProject.scenarios.reduce((sum, s) => sum + s.metrics.totalTasks, 0)}
                    </div>
                    <div className="text-sm text-gray-600">总任务数</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {currentProject.scenarios.reduce((sum, s) => sum + s.metrics.completedTasks, 0)}
                    </div>
                    <div className="text-sm text-gray-600">已完成任务</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {currentProject.scenarios.reduce((sum, s) => sum + s.metrics.teamMembers, 0)}
                    </div>
                    <div className="text-sm text-gray-600">参与人员</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-1">
                      {Math.round(currentProject.scenarios.reduce((sum, s) => sum + s.progress, 0) / currentProject.scenarios.length)}%
                    </div>
                    <div className="text-sm text-gray-600">平均进度</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
};

export default ProjectBoard;
