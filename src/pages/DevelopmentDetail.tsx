
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Plus, Trash2, CheckCircle, Clock, AlertCircle, DollarSign, Target, Trophy, Map } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import TopNavigation from '@/components/TopNavigation';

interface DevelopmentTask {
  id: string;
  title: string;
  assignee: string;
  deadline: string;
  status: 'pending' | 'in-progress' | 'completed';
}

interface CostItem {
  id: string;
  name: string;
  amount: number;
}

interface Milestone {
  id: string;
  name: string;
  time: string;
  description: string;
}

interface Output {
  id: string;
  name: string;
  value: number;
  description: string;
}

const DevelopmentDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  
  // 模拟需求信息
  const requirement = {
    id: parseInt(id || '1'),
    title: id === '1' ? '用户管理系统需求' : id === '2' ? '订单处理流程优化' : '数据报表系统',
    description: id === '1' ? '构建完整的用户注册、登录、权限管理系统' : 
                 id === '2' ? '优化订单处理流程，提升处理效率' : 
                 '开发业务数据统计与报表展示功能'
  };

  const [tasks, setTasks] = useState<DevelopmentTask[]>([
    { id: '1', title: '用户注册功能开发', assignee: '张三', deadline: '2024-06-15', status: 'completed' },
    { id: '2', title: '用户登录功能开发', assignee: '李四', deadline: '2024-06-20', status: 'in-progress' },
    { id: '3', title: '权限管理模块', assignee: '王五', deadline: '2024-06-25', status: 'pending' },
  ]);

  const [costs, setCosts] = useState<CostItem[]>([
    { id: '1', name: '开发人员工资', amount: 50000 },
    { id: '2', name: '服务器费用', amount: 5000 },
  ]);

  const [milestones, setMilestones] = useState<Milestone[]>([
    { id: '1', name: '需求确认', time: '2024-06-01', description: '完成需求分析和确认' },
    { id: '2', name: '原型设计', time: '2024-06-15', description: '完成系统原型设计' },
  ]);

  const [outputs, setOutputs] = useState<Output[]>([
    { id: '1', name: '用户管理系统', value: 100000, description: '完整的用户管理解决方案' },
    { id: '2', name: '技术文档', value: 10000, description: '系统架构和使用文档' },
  ]);

  const [newTask, setNewTask] = useState({
    title: '',
    assignee: '',
    deadline: '',
    status: 'pending' as const
  });

  const [newCost, setNewCost] = useState({
    name: '',
    amount: 0
  });

  const [newMilestone, setNewMilestone] = useState({
    name: '',
    time: '',
    description: ''
  });

  const [newOutput, setNewOutput] = useState({
    name: '',
    value: 0,
    description: ''
  });

  // 计算总成本和总产出
  const totalCost = costs.reduce((sum, cost) => sum + cost.amount, 0);
  const totalOutput = outputs.reduce((sum, output) => sum + output.value, 0);
  const roi = totalCost > 0 ? ((totalOutput - totalCost) / totalCost * 100).toFixed(1) : '0';

  // Task handlers
  const addTask = () => {
    if (!newTask.title || !newTask.assignee || !newTask.deadline) {
      toast({
        title: "错误",
        description: "请填写完整的任务信息",
        variant: "destructive"
      });
      return;
    }

    const task: DevelopmentTask = {
      id: Date.now().toString(),
      ...newTask
    };

    setTasks([...tasks, task]);
    setNewTask({ title: '', assignee: '', deadline: '', status: 'pending' });
    
    toast({
      title: "成功",
      description: "开发任务已添加",
    });
  };

  const removeTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const updateTaskStatus = (taskId: string, status: DevelopmentTask['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status } : task
    ));
  };

  // Cost handlers
  const addCost = () => {
    if (!newCost.name || newCost.amount <= 0) {
      toast({
        title: "错误",
        description: "请填写完整的成本信息",
        variant: "destructive"
      });
      return;
    }

    const cost: CostItem = {
      id: Date.now().toString(),
      ...newCost
    };

    setCosts([...costs, cost]);
    setNewCost({ name: '', amount: 0 });
    
    toast({
      title: "成功",
      description: "成本项已添加",
    });
  };

  const removeCost = (costId: string) => {
    setCosts(costs.filter(cost => cost.id !== costId));
  };

  // Milestone handlers
  const addMilestone = () => {
    if (!newMilestone.name || !newMilestone.time) {
      toast({
        title: "错误",
        description: "请填写完整的里程碑信息",
        variant: "destructive"
      });
      return;
    }

    const milestone: Milestone = {
      id: Date.now().toString(),
      ...newMilestone
    };

    setMilestones([...milestones, milestone]);
    setNewMilestone({ name: '', time: '', description: '' });
    
    toast({
      title: "成功",
      description: "里程碑已添加",
    });
  };

  const removeMilestone = (milestoneId: string) => {
    setMilestones(milestones.filter(milestone => milestone.id !== milestoneId));
  };

  // Output handlers
  const addOutput = () => {
    if (!newOutput.name || newOutput.value <= 0) {
      toast({
        title: "错误",
        description: "请填写完整的产出信息",
        variant: "destructive"
      });
      return;
    }

    const output: Output = {
      id: Date.now().toString(),
      ...newOutput
    };

    setOutputs([...outputs, output]);
    setNewOutput({ name: '', value: 0, description: '' });
    
    toast({
      title: "成功",
      description: "产出项已添加",
    });
  };

  const removeOutput = (outputId: string) => {
    setOutputs(outputs.filter(output => output.id !== outputId));
  };

  const getStatusIcon = (status: DevelopmentTask['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusText = (status: DevelopmentTask['status']) => {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'in-progress':
        return '进行中';
      case 'pending':
        return '待处理';
    }
  };

  const getStatusColor = (status: DevelopmentTask['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <TopNavigation />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/development">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回开发管理
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{requirement.title}</h1>
              <p className="text-sm text-gray-600">{requirement.description}</p>
            </div>
          </div>
          <div>
            <Link to={`/roadmap/${id}`}>
              <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                <Map className="w-4 h-4 mr-2" />
                查看Roadmap
              </Button>
            </Link>
          </div>
        </div>

        {/* 成本产出预览 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <DollarSign className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-600">¥{totalCost.toLocaleString()}</div>
              <div className="text-sm text-gray-600">总成本</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <Trophy className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">¥{totalOutput.toLocaleString()}</div>
              <div className="text-sm text-gray-600">总产出</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">{roi}%</div>
              <div className="text-sm text-gray-600">投资回报率</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">
                {tasks.filter(t => t.status === 'completed').length}/{tasks.length}
              </div>
              <div className="text-sm text-gray-600">任务完成</div>
            </CardContent>
          </Card>
        </div>

        {/* 添加新任务 */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
            <CardTitle className="text-xl">添加开发任务</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <Label htmlFor="title" className="text-sm font-medium text-gray-700">任务标题</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="请输入任务标题"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="assignee" className="text-sm font-medium text-gray-700">负责人</Label>
                <Input
                  id="assignee"
                  value={newTask.assignee}
                  onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                  placeholder="请输入负责人"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="deadline" className="text-sm font-medium text-gray-700">截止时间</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={newTask.deadline}
                  onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Button onClick={addTask} className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                  <Plus className="w-4 h-4 mr-2" />
                  添加任务
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 任务列表 */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="text-xl">开发任务列表</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {tasks.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">暂无开发任务</h4>
                <p className="text-gray-600">请添加第一个开发任务</p>
              </div>
            ) : (
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="p-4 border rounded-lg bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1">
                        {getStatusIcon(task.status)}
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{task.title}</h4>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                            <span>负责人: {task.assignee}</span>
                            <span>截止: {task.deadline}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <select
                          value={task.status}
                          onChange={(e) => updateTaskStatus(task.id, e.target.value as DevelopmentTask['status'])}
                          className="text-sm border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="pending">待处理</option>
                          <option value="in-progress">进行中</option>
                          <option value="completed">已完成</option>
                        </select>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          {getStatusText(task.status)}
                        </span>
                        <Button
                          onClick={() => removeTask(task.id)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* 成本管理 */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-lg">
            <CardTitle className="text-xl">成本管理</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-6">
              <div>
                <Label htmlFor="costName" className="text-sm font-medium text-gray-700">成本名称</Label>
                <Input
                  id="costName"
                  value={newCost.name}
                  onChange={(e) => setNewCost({ ...newCost, name: e.target.value })}
                  placeholder="请输入成本名称"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="costAmount" className="text-sm font-medium text-gray-700">成本金额</Label>
                <Input
                  id="costAmount"
                  type="number"
                  value={newCost.amount || ''}
                  onChange={(e) => setNewCost({ ...newCost, amount: parseFloat(e.target.value) || 0 })}
                  placeholder="请输入金额"
                  className="mt-1"
                />
              </div>
              <div>
                <Button onClick={addCost} className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800">
                  <Plus className="w-4 h-4 mr-2" />
                  添加成本
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              {costs.map((cost) => (
                <div key={cost.id} className="flex items-center justify-between p-3 border rounded bg-gray-50">
                  <div>
                    <span className="font-medium">{cost.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-red-600 font-bold">¥{cost.amount.toLocaleString()}</span>
                    <Button
                      onClick={() => removeCost(cost.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 里程碑管理 */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
            <CardTitle className="text-xl">里程碑管理</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-6">
              <div>
                <Label htmlFor="milestoneName" className="text-sm font-medium text-gray-700">里程碑名称</Label>
                <Input
                  id="milestoneName"
                  value={newMilestone.name}
                  onChange={(e) => setNewMilestone({ ...newMilestone, name: e.target.value })}
                  placeholder="请输入里程碑名称"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="milestoneTime" className="text-sm font-medium text-gray-700">时间</Label>
                <Input
                  id="milestoneTime"
                  type="date"
                  value={newMilestone.time}
                  onChange={(e) => setNewMilestone({ ...newMilestone, time: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="milestoneDesc" className="text-sm font-medium text-gray-700">描述</Label>
                <Input
                  id="milestoneDesc"
                  value={newMilestone.description}
                  onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })}
                  placeholder="请输入描述"
                  className="mt-1"
                />
              </div>
              <div>
                <Button onClick={addMilestone} className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                  <Plus className="w-4 h-4 mr-2" />
                  添加里程碑
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              {milestones.map((milestone) => (
                <div key={milestone.id} className="p-3 border rounded bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{milestone.name}</div>
                      <div className="text-sm text-gray-600">{milestone.time} · {milestone.description}</div>
                    </div>
                    <Button
                      onClick={() => removeMilestone(milestone.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 产出管理 */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
            <CardTitle className="text-xl">产出管理</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-6">
              <div>
                <Label htmlFor="outputName" className="text-sm font-medium text-gray-700">产出名称</Label>
                <Input
                  id="outputName"
                  value={newOutput.name}
                  onChange={(e) => setNewOutput({ ...newOutput, name: e.target.value })}
                  placeholder="请输入产出名称"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="outputValue" className="text-sm font-medium text-gray-700">产出价值</Label>
                <Input
                  id="outputValue"
                  type="number"
                  value={newOutput.value || ''}
                  onChange={(e) => setNewOutput({ ...newOutput, value: parseFloat(e.target.value) || 0 })}
                  placeholder="请输入价值"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="outputDesc" className="text-sm font-medium text-gray-700">产出描述</Label>
                <Input
                  id="outputDesc"
                  value={newOutput.description}
                  onChange={(e) => setNewOutput({ ...newOutput, description: e.target.value })}
                  placeholder="请输入描述"
                  className="mt-1"
                />
              </div>
              <div>
                <Button onClick={addOutput} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  <Plus className="w-4 h-4 mr-2" />
                  添加产出
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              {outputs.map((output) => (
                <div key={output.id} className="p-3 border rounded bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{output.name}</div>
                      <div className="text-sm text-gray-600">{output.description}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600 font-bold">¥{output.value.toLocaleString()}</span>
                      <Button
                        onClick={() => removeOutput(output.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DevelopmentDetail;
