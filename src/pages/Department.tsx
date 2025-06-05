
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, Clock, CheckCircle, Circle, ArrowRight, Sparkles, Eye, Edit2 } from "lucide-react";
import TopNavigation from '@/components/TopNavigation';
import { useToast } from "@/hooks/use-toast";

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

interface AISuggestedTask {
  title: string;
  description: string;
  estimatedDays: number;
  assignee: string;
  priority: '高' | '中' | '低';
}

const Department = () => {
  const { toast } = useToast();
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
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [aiInput, setAiInput] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<AISuggestedTask[]>([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case '已完成': return 'bg-green-100 text-green-800';
      case '进行中': return 'bg-blue-100 text-blue-800';
      case '待开始': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAIAnalyze = () => {
    const suggestions: AISuggestedTask[] = [
      {
        title: '市场调研',
        description: '分析目标市场和竞品情况',
        estimatedDays: 3,
        assignee: '张三',
        priority: '高'
      },
      {
        title: '用户访谈',
        description: '深度访谈目标用户，了解需求痛点',
        estimatedDays: 5,
        assignee: '李四',
        priority: '高'
      },
      {
        title: '数据整理分析',
        description: '整理访谈数据，形成调研报告',
        estimatedDays: 2,
        assignee: '王五',
        priority: '中'
      }
    ];
    setAiSuggestions(suggestions);
  };

  const updateAISuggestion = (index: number, field: keyof AISuggestedTask, value: any) => {
    const newSuggestions = [...aiSuggestions];
    newSuggestions[index] = { ...newSuggestions[index], [field]: value };
    setAiSuggestions(newSuggestions);
  };

  const createAITasks = () => {
    const newTasks = aiSuggestions.map((suggestion, index) => ({
      id: Date.now().toString() + index,
      title: suggestion.title,
      description: suggestion.description,
      initiator: '当前用户',
      assignee: suggestion.assignee,
      status: '待开始' as const,
      deadline: new Date(Date.now() + suggestion.estimatedDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }));

    setTasks([...tasks, ...newTasks]);
    setIsAICreateOpen(false);
    setAiSuggestions([]);
    setAiInput('');
    
    toast({
      title: "成功",
      description: `已创建 ${newTasks.length} 个任务`,
    });
  };

  const openTaskDetail = (task: Task) => {
    setSelectedTask(task);
    setIsTaskDetailOpen(true);
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
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => openTaskDetail(task)}
              >
                <Eye className="w-4 h-4 mr-1" />
                查看详情
              </Button>
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
              <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
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
                    <div className="space-y-4">
                      <h4 className="font-medium">AI建议的任务清单（可编辑）：</h4>
                      {aiSuggestions.map((suggestion, index) => (
                        <div key={index} className="border rounded-lg p-4 bg-purple-50 space-y-3">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>任务标题</Label>
                              <Input
                                value={suggestion.title}
                                onChange={(e) => updateAISuggestion(index, 'title', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>承接人</Label>
                              <Select
                                value={suggestion.assignee}
                                onValueChange={(value) => updateAISuggestion(index, 'assignee', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="张三">张三</SelectItem>
                                  <SelectItem value="李四">李四</SelectItem>
                                  <SelectItem value="王五">王五</SelectItem>
                                  <SelectItem value="赵六">赵六</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div>
                            <Label>任务描述</Label>
                            <Textarea
                              value={suggestion.description}
                              onChange={(e) => updateAISuggestion(index, 'description', e.target.value)}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>预计天数</Label>
                              <Input
                                type="number"
                                value={suggestion.estimatedDays}
                                onChange={(e) => updateAISuggestion(index, 'estimatedDays', parseInt(e.target.value))}
                              />
                            </div>
                            <div>
                              <Label>优先级</Label>
                              <Select
                                value={suggestion.priority}
                                onValueChange={(value) => updateAISuggestion(index, 'priority', value as '高' | '中' | '低')}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="高">高</SelectItem>
                                  <SelectItem value="中">中</SelectItem>
                                  <SelectItem value="低">低</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      ))}
                      <Button onClick={createAITasks} className="w-full mt-4">
                        确认创建所有任务
                      </Button>
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

        {/* 任务详情弹框 */}
        <Dialog open={isTaskDetailOpen} onOpenChange={setIsTaskDetailOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>任务详情</DialogTitle>
            </DialogHeader>
            {selectedTask && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-lg">{selectedTask.title}</h3>
                  <Badge className={getStatusColor(selectedTask.status)}>{selectedTask.status}</Badge>
                </div>
                <div>
                  <Label>任务描述</Label>
                  <p className="text-gray-600 mt-1">{selectedTask.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>发起人</Label>
                    <p className="text-gray-900 mt-1">{selectedTask.initiator}</p>
                  </div>
                  <div>
                    <Label>承接人</Label>
                    <p className="text-gray-900 mt-1">{selectedTask.assignee}</p>
                  </div>
                </div>
                <div>
                  <Label>截止时间</Label>
                  <p className="text-gray-900 mt-1">{selectedTask.deadline}</p>
                </div>
                {selectedTask.children && selectedTask.children.length > 0 && (
                  <div>
                    <Label>子任务</Label>
                    <div className="mt-2 space-y-2">
                      {selectedTask.children.map(child => (
                        <div key={child.id} className="p-3 border rounded bg-gray-50">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{child.title}</span>
                            <Badge className={getStatusColor(child.status)}>{child.status}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{child.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Department;
