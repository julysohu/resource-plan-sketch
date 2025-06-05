
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, Clock, CheckCircle, Circle, ArrowRight, Sparkles } from "lucide-react";
import TopNavigation from '@/components/TopNavigation';

interface Task {
  id: string;
  title: string;
  description: string;
  initiator: string;
  assignee: string;
  status: '待开始' | '进行中' | '已完成';
  deadline: string;
  parentId?: string;
  children?: Task[];
}

const Department = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: '电商投放图设计优化',
      description: '对现有电商投放图进行设计优化，提升转化率',
      initiator: '张三',
      assignee: '李四',
      status: '进行中',
      deadline: '2024-06-20',
      children: [
        {
          id: '1-1',
          title: '竞品分析',
          description: '分析同类产品的投放图设计',
          initiator: '张三',
          assignee: '王五',
          status: '已完成',
          deadline: '2024-06-15',
          parentId: '1'
        },
        {
          id: '1-2',
          title: '设计稿制作',
          description: '根据分析结果制作新的设计稿',
          initiator: '张三',
          assignee: '李四',
          status: '进行中',
          deadline: '2024-06-18',
          parentId: '1'
        }
      ]
    },
    {
      id: '2',
      title: '用户调研活动策划',
      description: '策划并执行用户调研活动，收集用户反馈',
      initiator: '李四',
      assignee: '赵六',
      status: '待开始',
      deadline: '2024-06-25'
    }
  ]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isAICreateOpen, setIsAICreateOpen] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case '已完成': return 'bg-green-100 text-green-800';
      case '进行中': return 'bg-blue-100 text-blue-800';
      case '待开始': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAIAnalyze = () => {
    // 模拟AI分析
    const suggestions = [
      {
        title: '市场调研',
        description: '分析目标市场和竞品情况',
        estimatedDays: 3
      },
      {
        title: '用户访谈',
        description: '深度访谈目标用户，了解需求痛点',
        estimatedDays: 5
      },
      {
        title: '数据整理分析',
        description: '整理访谈数据，形成调研报告',
        estimatedDays: 2
      }
    ];
    setAiSuggestions(suggestions);
  };

  const TaskCard = ({ task, level = 0 }: { task: Task; level?: number }) => (
    <div className={`${level > 0 ? 'ml-8 border-l-2 border-gray-200 pl-4' : ''}`}>
      <Card className="mb-4 hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              {task.status === '已完成' ? 
                <CheckCircle className="w-5 h-5 text-green-500" /> : 
                <Circle className="w-5 h-5 text-gray-400" />
              }
              <h3 className="font-medium text-gray-900">{task.title}</h3>
              <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{task.deadline}</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-3">{task.description}</p>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span className="text-gray-500">发起人: <span className="font-medium">{task.initiator}</span></span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-500">承接人: <span className="font-medium">{task.assignee}</span></span>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">拆分子任务</Button>
              <Button variant="outline" size="sm">转交</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {task.children && task.children.map(child => (
        <TaskCard key={child.id} task={child} level={level + 1} />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <TopNavigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">部门管理</h1>
            <p className="text-gray-600 mt-2">管理部门日常任务和工作流程</p>
          </div>
          
          <div className="flex space-x-3">
            <Dialog open={isAICreateOpen} onOpenChange={setIsAICreateOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI批量创建
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>AI智能任务创建</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="ai-input">描述您的工作内容</Label>
                    <Textarea
                      id="ai-input"
                      placeholder="例如：我们需要进行用户调研，包括市场分析、用户访谈、数据整理等工作..."
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <Button onClick={handleAIAnalyze} className="w-full">
                    <Sparkles className="w-4 h-4 mr-2" />
                    AI分析并生成任务建议
                  </Button>
                  
                  {aiSuggestions.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-medium">AI建议的任务清单：</h4>
                      {aiSuggestions.map((suggestion, index) => (
                        <div key={index} className="border rounded-lg p-3 bg-purple-50">
                          <div className="flex items-center justify-between">
                            <h5 className="font-medium">{suggestion.title}</h5>
                            <span className="text-sm text-gray-500">预计{suggestion.estimatedDays}天</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{suggestion.description}</p>
                        </div>
                      ))}
                      <Button className="w-full mt-4">确认创建所有任务</Button>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
            
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  新建任务
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>新建任务</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div>
                    <Label htmlFor="task-title">任务名称</Label>
                    <Input id="task-title" placeholder="请输入任务名称" />
                  </div>
                  <div>
                    <Label htmlFor="task-desc">任务描述</Label>
                    <Textarea id="task-desc" placeholder="请输入任务描述" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="assignee">承接人</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="选择承接人" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="zhang">张三</SelectItem>
                          <SelectItem value="li">李四</SelectItem>
                          <SelectItem value="wang">王五</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="deadline">截止时间</Label>
                      <Input id="deadline" type="date" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>取消</Button>
                  <Button onClick={() => setIsCreateOpen(false)}>创建任务</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">24</div>
              <div className="text-sm text-gray-600">总任务数</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">8</div>
              <div className="text-sm text-gray-600">进行中</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">15</div>
              <div className="text-sm text-gray-600">已完成</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Circle className="w-8 h-8 text-gray-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-600">1</div>
              <div className="text-sm text-gray-600">待开始</div>
            </CardContent>
          </Card>
        </div>

        {/* 任务列表 */}
        <Card>
          <CardHeader>
            <CardTitle>任务列表</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Department;
