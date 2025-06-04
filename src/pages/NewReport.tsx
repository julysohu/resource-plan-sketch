import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Trash2, Save, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import TopNavigation from '@/components/TopNavigation';

interface ProcessStep {
  sequence: number;
  step: string;
  description: string;
  aiEfficiency: 'higher' | 'lower';
}

interface ScenarioStep {
  sequence: number;
  step: string;
  description: string;
}

interface Solution {
  title: string;
  content: string;
}

interface ResourcePlan {
  type: string;
  current: string;
  gap: string;
  plan: string;
}

const NewReport = () => {
  const { toast } = useToast();

  const [title, setTitle] = useState('');
  const [background, setBackground] = useState('');
  const [completed, setCompleted] = useState('');
  const [uncompleted, setUncompleted] = useState('');
  const [painPoints, setPainPoints] = useState('');
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([
    { sequence: 1, step: '', description: '', aiEfficiency: 'higher' }
  ]);

  const [scenarioSteps, setScenarioSteps] = useState([
    { sequence: 1, step: '', description: '' }
  ]);

  const [solutions, setSolutions] = useState([
    { title: '', content: '' }
  ]);
  const [resourcePlans, setResourcePlans] = useState([
    { type: '', current: '', gap: '', plan: '' }
  ]);

  const addProcessStep = () => {
    setProcessSteps([...processSteps, { 
      sequence: processSteps.length + 1, 
      step: '', 
      description: '', 
      aiEfficiency: 'higher' 
    }]);
  };

  const removeProcessStep = (index: number) => {
    if (processSteps.length > 1) {
      const newSteps = processSteps.filter((_, i) => i !== index);
      const resequencedSteps = newSteps.map((step, i) => ({ ...step, sequence: i + 1 }));
      setProcessSteps(resequencedSteps);
    }
  };

  const updateProcessStep = (index: number, field: string, value: string) => {
    const newSteps = [...processSteps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setProcessSteps(newSteps);
  };

  const updateProcessStepAiEfficiency = (index: number, value: 'higher' | 'lower') => {
    const newSteps = [...processSteps];
    newSteps[index] = { ...newSteps[index], aiEfficiency: value };
    setProcessSteps(newSteps);
  };

  const addScenarioStep = () => {
    setScenarioSteps([...scenarioSteps, { 
      sequence: scenarioSteps.length + 1, 
      step: '', 
      description: '' 
    }]);
  };

  const removeScenarioStep = (index: number) => {
    if (scenarioSteps.length > 1) {
      const newSteps = scenarioSteps.filter((_, i) => i !== index);
      const resequencedSteps = newSteps.map((step, i) => ({ ...step, sequence: i + 1 }));
      setScenarioSteps(resequencedSteps);
    }
  };

  const updateScenarioStep = (index: number, field: string, value: string) => {
    const newSteps = [...scenarioSteps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setScenarioSteps(newSteps);
  };

  const addSolution = () => {
    setSolutions([...solutions, { title: '', content: '' }]);
  };

  const removeSolution = (index: number) => {
    if (solutions.length > 1) {
      const newSolutions = solutions.filter((_, i) => i !== index);
      setSolutions(newSolutions);
    }
  };

  const updateSolution = (index: number, field: string, value: string) => {
    const newSolutions = [...solutions];
    newSolutions[index] = { ...newSolutions[index], [field]: value };
    setSolutions(newSolutions);
  };

  const addResourcePlan = () => {
    setResourcePlans([...resourcePlans, { type: '', current: '', gap: '', plan: '' }]);
  };

  const removeResourcePlan = (index: number) => {
    if (resourcePlans.length > 1) {
      const newPlans = resourcePlans.filter((_, i) => i !== index);
      setResourcePlans(newPlans);
    }
  };

  const updateResourcePlan = (index: number, field: string, value: string) => {
    const newPlans = [...resourcePlans];
    newPlans[index] = { ...newPlans[index], [field]: value };
    setResourcePlans(newPlans);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !background) {
      toast({
        title: "错误",
        description: "请填写需求标题和背景",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically send the data to your backend
    const reportData = {
      title,
      background,
      currentAnalysis: {
        completed,
        uncompleted,
        painPoints
      },
      processSteps,
      scenarioSteps,
      solutions,
      resourcePlans
    };

    console.log(reportData);
    toast({
      title: "成功",
      description: "需求报告已提交",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <TopNavigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/requirements">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回需求列表
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">新建需求报告</h1>
              <p className="text-gray-600">填写需求报告，创建新的需求资产</p>
            </div>
          </div>
          <Button type="submit" form="reportForm" className="bg-gradient-to-r from-blue-600 to-indigo-600">
            <Save className="w-4 h-4 mr-2" />
            提交
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 一、背景 */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
              <CardTitle>一、背景</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                    需求标题
                  </Label>
                  <Input
                    id="title"
                    placeholder="请输入需求标题"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="background" className="text-sm font-medium text-gray-700">
                    项目背景
                  </Label>
                  <Textarea
                    id="background"
                    placeholder="请填写项目背景描述..."
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 二、现状分析 */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
              <CardTitle>二、现状分析</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="completed" className="text-sm font-medium text-gray-700">
                    已经做到的部分
                  </Label>
                  <Textarea
                    id="completed"
                    placeholder="请描述已经完成的部分..."
                    value={completed}
                    onChange={(e) => setCompleted(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="uncompleted" className="text-sm font-medium text-gray-700">
                    尚未做到的部分
                  </Label>
                  <Textarea
                    id="uncompleted"
                    placeholder="请描述尚未完成的部分..."
                    value={uncompleted}
                    onChange={(e) => setUncompleted(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="painPoints" className="text-sm font-medium text-gray-700">
                    尚未做到部分的痛点
                  </Label>
                  <Textarea
                    id="painPoints"
                    placeholder="请描述尚未完成部分的痛点..."
                    value={painPoints}
                    onChange={(e) => setPainPoints(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 三、现状流程调研建模 */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
              <CardTitle>三、现状流程调研建模</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {/* 流程表 */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">调研流程表</h4>
                  <Button 
                    type="button" 
                    onClick={addProcessStep}
                    variant="outline" 
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    添加步骤
                  </Button>
                </div>
                <div className="space-y-4">
                  {processSteps.map((step, index) => (
                    <div key={index} className="grid grid-cols-12 gap-4 p-4 border rounded bg-gray-50">
                      <div className="col-span-1">
                        <Label className="text-sm font-medium text-gray-700">序号</Label>
                        <div className="mt-1 text-sm text-gray-600">{step.sequence}</div>
                      </div>
                      <div className="col-span-3">
                        <Label className="text-sm font-medium text-gray-700">流程步骤</Label>
                        <Input
                          value={step.step}
                          onChange={(e) => updateProcessStep(index, 'step', e.target.value)}
                          placeholder="请输入流程步骤"
                          className="mt-1"
                        />
                      </div>
                      <div className="col-span-5">
                        <Label className="text-sm font-medium text-gray-700">步骤描述</Label>
                        <Input
                          value={step.description}
                          onChange={(e) => updateProcessStep(index, 'description', e.target.value)}
                          placeholder="请输入步骤描述"
                          className="mt-1"
                        />
                      </div>
                      <div className="col-span-2">
                        <Label className="text-sm font-medium text-gray-700">AI效能</Label>
                        <Select onValueChange={(value) => updateProcessStepAiEfficiency(index, value as 'higher' | 'lower')}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="选择效能" defaultValue={step.aiEfficiency} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="higher">更高</SelectItem>
                            <SelectItem value="lower">更低</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-1 flex items-end">
                        <Button
                          type="button"
                          onClick={() => removeProcessStep(index)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-200 hover:bg-red-50"
                          disabled={processSteps.length === 1}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* AI生成流程图 */}
              <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
                <TrendingUp className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p className="font-medium">AI生成的现状流程图</p>
                <p className="text-sm">基于流程表内容生成的可视化流程图</p>
              </div>
            </CardContent>
          </Card>

          {/* 四、解决后的应用场景流程建模 */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
              <CardTitle>四、解决后的应用场景流程建模</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {/* 场景流程表 */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">场景流程表</h4>
                  <Button 
                    type="button" 
                    onClick={addScenarioStep}
                    variant="outline" 
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    添加场景
                  </Button>
                </div>
                <div className="space-y-4">
                  {scenarioSteps.map((step, index) => (
                    <div key={index} className="grid grid-cols-12 gap-4 p-4 border rounded bg-gray-50">
                      <div className="col-span-1">
                        <Label className="text-sm font-medium text-gray-700">序号</Label>
                        <div className="mt-1 text-sm text-gray-600">{step.sequence}</div>
                      </div>
                      <div className="col-span-4">
                        <Label className="text-sm font-medium text-gray-700">场景步骤</Label>
                        <Input
                          value={step.step}
                          onChange={(e) => updateScenarioStep(index, 'step', e.target.value)}
                          placeholder="请输入场景步骤"
                          className="mt-1"
                        />
                      </div>
                      <div className="col-span-6">
                        <Label className="text-sm font-medium text-gray-700">场景描述</Label>
                        <Input
                          value={step.description}
                          onChange={(e) => updateScenarioStep(index, 'description', e.target.value)}
                          placeholder="请输入场景描述"
                          className="mt-1"
                        />
                      </div>
                      <div className="col-span-1 flex items-end">
                        <Button
                          type="button"
                          onClick={() => removeScenarioStep(index)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-200 hover:bg-red-50"
                          disabled={scenarioSteps.length === 1}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* AI生成场景流程图 */}
              <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
                <TrendingUp className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p className="font-medium">AI生成的场景流程图</p>
                <p className="text-sm">基于场景流程表生成的解决后场景流程图</p>
              </div>
            </CardContent>
          </Card>

          {/* 五、解决方案描述 */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
              <CardTitle>五、解决方案描述</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {solutions.map((solution, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`solutionTitle-${index}`} className="text-sm font-medium text-gray-700">
                        解决方案 {index + 1}
                      </Label>
                      <Button
                        type="button"
                        onClick={() => removeSolution(index)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                        disabled={solutions.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <Input
                      id={`solutionTitle-${index}`}
                      placeholder="请输入解决方案标题"
                      value={solution.title}
                      onChange={(e) => updateSolution(index, 'title', e.target.value)}
                      className="mt-1"
                    />
                    <Textarea
                      placeholder="请填写解决方案描述..."
                      value={solution.content}
                      onChange={(e) => updateSolution(index, 'content', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                ))}
                <Button 
                  type="button" 
                  onClick={addSolution}
                  variant="outline" 
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  添加解决方案
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 六、资源稀缺以及投入计划阐述 */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
              <CardTitle>六、资源稀缺以及投入计划阐述</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {resourcePlans.map((plan, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded bg-gray-50">
                    <div>
                      <Label htmlFor={`resourceType-${index}`} className="text-sm font-medium text-gray-700">
                        资源类型
                      </Label>
                      <Input
                        id={`resourceType-${index}`}
                        placeholder="请输入资源类型"
                        value={plan.type}
                        onChange={(e) => updateResourcePlan(index, 'type', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`currentResources-${index}`} className="text-sm font-medium text-gray-700">
                        现有资源情况
                      </Label>
                      <Input
                        id={`currentResources-${index}`}
                        placeholder="请输入现有资源情况"
                        value={plan.current}
                        onChange={(e) => updateResourcePlan(index, 'current', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`resourceGap-${index}`} className="text-sm font-medium text-gray-700">
                        需求缺口
                      </Label>
                      <Input
                        id={`resourceGap-${index}`}
                        placeholder="请输入需求缺口"
                        value={plan.gap}
                        onChange={(e) => updateResourcePlan(index, 'gap', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`investmentPlan-${index}`} className="text-sm font-medium text-gray-700">
                        投入计划
                      </Label>
                      <Input
                        id={`investmentPlan-${index}`}
                        placeholder="请输入投入计划"
                        value={plan.plan}
                        onChange={(e) => updateResourcePlan(index, 'plan', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div className="col-span-4 flex justify-end">
                      <Button
                        type="button"
                        onClick={() => removeResourcePlan(index)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                        disabled={resourcePlans.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button 
                  type="button" 
                  onClick={addResourcePlan}
                  variant="outline" 
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  添加资源计划
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 提交按钮 */}
          <div className="flex justify-center">
            <Button type="submit" className="bg-gradient-to-r from-blue-600 to-indigo-600">
              <Save className="w-4 h-4 mr-2" />
              提交
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default NewReport;
