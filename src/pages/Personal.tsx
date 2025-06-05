
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Clock, CheckCircle, Circle, AlertTriangle, Calendar, Eye, Edit2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import TopNavigation from '@/components/TopNavigation';

interface PersonalTask {
  id: string;
  title: string;
  description: string;
  status: '待开始' | '进行中' | '已完成' | '逾期';
  deadline: string;
  priority: '高' | '中' | '低';
  project: string;
  progress: number;
  assignedBy: string;
  createdDate: string;
}

const Personal = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTask, setSelectedTask] = useState<PersonalTask | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isStatusUpdateOpen, setIsStatusUpdateOpen] = useState(false);
  const [updateStatus, setUpdateStatus] = useState<PersonalTask['status']>('待开始');
  const [tasks, setTasks] = useState<PersonalTask[]>([
    {
      id: '1',
      title: '电商投放图设计稿修改',
      description: '根据客户反馈修改投放图设计稿，优化视觉效果和转化率。需要调整色彩搭配、文字排版和整体布局，确保符合品牌调性。',
      status: '逾期',
      deadline: '2024-06-10',
      priority: '高',
      project: '电商投放图优化项目',
      progress: 65,
      assignedBy: '张经理',
      createdDate: '2024-06-01'
    },
    {
      id: '2',
      title: '用户调研数据分析',
      description: '分析收集到的用户调研数据，形成详细的分析报告。包括用户行为分析、需求痛点梳理和改进建议。',
      status: '进行中',
      deadline: '2024-06-18',
      priority: '高',
      project: '用户调研项目',
      progress: 40,
      assignedBy: '李总监',
      createdDate: '2024-06-05'
    },
    {
      id: '3',
      title: '竞品分析报告撰写',
      description: '完成竞品分析报告的撰写工作，深入分析行业竞争对手的产品特点、市场策略和用户反馈。',
      status: '进行中',
      deadline: '2024-06-20',
      priority: '中',
      project: '市场调研项目',
      progress: 25,
      assignedBy: '王主管',
      createdDate: '2024-06-08'
    },
    {
      id: '4',
      title: '原型设计评审',
      description: '参与原型设计的评审会议，提供专业意见和改进建议，确保设计方案的可行性和用户体验。',
      status: '待开始',
      deadline: '2024-06-22',
      priority: '中',
      project: '产品设计项目',
      progress: 0,
      assignedBy: '陈设计师',
      createdDate: '2024-06-12'
    },
    {
      id: '5',
      title: '项目文档整理',
      description: '整理项目相关文档，包括需求文档、设计文档、技术文档等，建立完整的文档体系。',
      status: '已完成',
      deadline: '2024-06-08',
      priority: '低',
      project: '文档管理',
      progress: 100,
      assignedBy: '刘经理',
      createdDate: '2024-05-28'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case '已完成': return 'bg-green-100 text-green-800';
      case '进行中': return 'bg-blue-100 text-blue-800';
      case '待开始': return 'bg-gray-100 text-gray-800';
      case '逾期': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case '高': return 'bg-red-100 text-red-800';
      case '中': return 'bg-yellow-100 text-yellow-800';
      case '低': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case '已完成': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case '进行中': return <Clock className="w-5 h-5 text-blue-500" />;
      case '待开始': return <Circle className="w-5 h-5 text-gray-400" />;
      case '逾期': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default: return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 按状态排序：逾期 > 进行中 > 待开始 > 已完成
  const sortedTasks = filteredTasks.sort((a, b) => {
    const statusOrder = { '逾期': 0, '进行中': 1, '待开始': 2, '已完成': 3 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  const taskStats = {
    total: tasks.length,
    overdue: tasks.filter(t => t.status === '逾期').length,
    inProgress: tasks.filter(t => t.status === '进行中').length,
    pending: tasks.filter(t => t.status === '待开始').length,
    completed: tasks.filter(t => t.status === '已完成').length,
  };

  const openTaskDetail = (task: PersonalTask) => {
    setSelectedTask(task);
    setIsDetailOpen(true);
  };

  const openStatusUpdate = (task: PersonalTask) => {
    setSelectedTask(task);
    setUpdateStatus(task.status);
    setIsStatusUpdateOpen(true);
  };

  const handleStatusUpdate = () => {
    if (!selectedTask) return;

    setTasks(tasks.map(task => 
      task.id === selectedTask.id 
        ? { ...task, status: updateStatus }
        : task
    ));

    setIsStatusUpdateOpen(false);
    toast({
      title: "成功",
      description: "任务状态已更新",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <TopNavigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">个人管理</h1>
            <p className="text-gray-600 mt-2">管理您的所有任务和工作安排</p>
          </div>
        </div>

        {/* 搜索框 */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="搜索任务名称、描述或项目..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{taskStats.total}</div>
              <div className="text-sm text-gray-600">总任务</div>
            </CardContent>
          </Card>
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4 text-center">
              <AlertTriangle className="w-6 h-6 text-red-500 mx-auto mb-1" />
              <div className="text-2xl font-bold text-red-600">{taskStats.overdue}</div>
              <div className="text-sm text-red-700">逾期</div>
            </CardContent>
          </Card>
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 text-blue-500 mx-auto mb-1" />
              <div className="text-2xl font-bold text-blue-600">{taskStats.inProgress}</div>
              <div className="text-sm text-blue-700">进行中</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Circle className="w-6 h-6 text-gray-500 mx-auto mb-1" />
              <div className="text-2xl font-bold text-gray-600">{taskStats.pending}</div>
              <div className="text-sm text-gray-600">待开始</div>
            </CardContent>
          </Card>
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-1" />
              <div className="text-2xl font-bold text-green-600">{taskStats.completed}</div>
              <div className="text-sm text-green-700">已完成</div>
            </CardContent>
          </Card>
        </div>

        {/* 任务列表 */}
        <Card>
          <CardHeader>
            <CardTitle>我的任务列表</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sortedTasks.map(task => (
                <Card key={task.id} className={`hover:shadow-md transition-shadow ${
                  task.status === '逾期' ? 'border-red-200 bg-red-50' : 
                  task.status === '进行中' ? 'border-blue-200 bg-blue-50' : ''
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        {getStatusIcon(task.status)}
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-medium text-gray-900">{task.title}</h3>
                            <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                            <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                          
                          {/* 进度条 */}
                          {task.status === '进行中' && (
                            <div className="mb-3">
                              <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                                <span>进度</span>
                                <span>{task.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${task.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              截止: {task.deadline}
                            </span>
                            <span>项目: {task.project}</span>
                            <span>分配人: {task.assignedBy}</span>
                          </div>
                        </div>
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
                        {task.status !== '已完成' && (
                          <Button 
                            size="sm"
                            onClick={() => openStatusUpdate(task)}
                          >
                            <Edit2 className="w-4 h-4 mr-1" />
                            更新状态
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 任务详情弹框 */}
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>任务详情</DialogTitle>
            </DialogHeader>
            {selectedTask && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-lg mb-2">{selectedTask.title}</h3>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(selectedTask.status)}>{selectedTask.status}</Badge>
                    <Badge className={getPriorityColor(selectedTask.priority)}>{selectedTask.priority}</Badge>
                  </div>
                </div>
                <div>
                  <Label>任务描述</Label>
                  <p className="text-gray-600 mt-1 leading-relaxed">{selectedTask.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>所属项目</Label>
                    <p className="text-gray-900 mt-1">{selectedTask.project}</p>
                  </div>
                  <div>
                    <Label>分配人</Label>
                    <p className="text-gray-900 mt-1">{selectedTask.assignedBy}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>创建时间</Label>
                    <p className="text-gray-900 mt-1">{selectedTask.createdDate}</p>
                  </div>
                  <div>
                    <Label>截止时间</Label>
                    <p className="text-gray-900 mt-1">{selectedTask.deadline}</p>
                  </div>
                </div>
                {selectedTask.status === '进行中' && (
                  <div>
                    <Label>当前进度</Label>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                        <span>完成度</span>
                        <span>{selectedTask.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${selectedTask.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* 状态更新弹框 */}
        <Dialog open={isStatusUpdateOpen} onOpenChange={setIsStatusUpdateOpen}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>更新任务状态</DialogTitle>
            </DialogHeader>
            {selectedTask && (
              <div className="space-y-4">
                <div>
                  <Label>任务名称</Label>
                  <p className="text-gray-900 mt-1">{selectedTask.title}</p>
                </div>
                <div>
                  <Label>当前状态</Label>
                  <p className="text-gray-600 mt-1">{selectedTask.status}</p>
                </div>
                <div>
                  <Label>更新为</Label>
                  <Select value={updateStatus} onValueChange={(value) => setUpdateStatus(value as PersonalTask['status'])}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="待开始">待开始</SelectItem>
                      <SelectItem value="进行中">进行中</SelectItem>
                      <SelectItem value="已完成">已完成</SelectItem>
                      <SelectItem value="逾期">逾期</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsStatusUpdateOpen(false)}
                  >
                    取消
                  </Button>
                  <Button onClick={handleStatusUpdate}>
                    确认更新
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Personal;
