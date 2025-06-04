
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Plus, Trash2, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface DevelopmentTask {
  id: string;
  title: string;
  assignee: string;
  deadline: string;
  status: 'pending' | 'in-progress' | 'completed';
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

  const [newTask, setNewTask] = useState({
    title: '',
    assignee: '',
    deadline: '',
    status: 'pending' as const
  });

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
    toast({
      title: "成功",
      description: "任务已删除",
    });
  };

  const updateTaskStatus = (taskId: string, status: DevelopmentTask['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status } : task
    ));
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
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
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
      </main>
    </div>
  );
};

export default DevelopmentDetail;
