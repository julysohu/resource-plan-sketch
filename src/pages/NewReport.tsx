
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Plus, Trash2, FileText, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import TopNavigation from '@/components/TopNavigation';

interface ProcessStep {
  id: string;
  sequence: number;
  step: string;
  description: string;
  aiEfficiency: 'higher' | 'lower' | '';
}

interface ScenarioStep {
  id: string;
  sequence: number;
  step: string;
  description: string;
  beforeProcess: string;
  afterProcess: string;
}

interface Solution {
  id: string;
  title: string;
  content: string;
}

interface ResourcePlan {
  id: string;
  type: string;
  current: string;
  gap: string;
  plan: string;
}

const NewReport = () => {
  const { toast } = useToast();
  
  const [reportData, setReportData] = useState({
    title: '',
    background: '',
    currentAnalysis: {
      completed: '',
      uncompleted: '',
      painPoints: ''
    }
  });

  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([
    { id: '1', sequence: 1, step: '', description: '', aiEfficiency: '' }
  ]);

  const [scenarioSteps, setScenarioSteps] = useState<ScenarioStep[]>([
    { id: '1', sequence: 1, step: '', description: '', beforeProcess: '', afterProcess: '' }
  ]);

  const [solutions, setSolutions] = useState<Solution[]>([
    { id: '1', title: '方案1', content: '' }
  ]);

  const [resourcePlans, setResourcePlans] = useState<ResourcePlan[]>([
    { id: '1', type: '', current: '', gap: '', plan: '' }
  ]);

  // Process Steps handlers
  const addProcessStep = () => {
    const newStep: ProcessStep = {
      id: Date.now().toString(),
      sequence: processSteps.length + 1,
      step: '',
      description: '',
      aiEfficiency: ''
    };
    setProcessSteps([...processSteps, newStep]);
  };

  const removeProcessStep = (id: string) => {
    if (processSteps.length > 1) {
      setProcessSteps(processSteps.filter(step => step.id !== id));
    }
  };

  const updateProcessStep = (id: string, field: keyof ProcessStep, value: string | number) => {
    setProcessSteps(processSteps.map(step => 
      step.id === id ? { ...step, [field]: value } : step
    ));
  };

  // Scenario Steps handlers
  const addScenarioStep = () => {
    const newStep: ScenarioStep = {
      id: Date.now().toString(),
      sequence: scenarioSteps.length + 1,
      step: '',
      description: '',
      beforeProcess: '',
      afterProcess: ''
    };
    setScenarioSteps([...scenarioSteps, newStep]);
  };

  const removeScenarioStep = (id: string) => {
    if (scenarioSteps.length > 1) {
      setScenarioSteps(scenarioSteps.filter(step => step.id !== id));
    }
  };

  const updateScenarioStep = (id: string, field: keyof ScenarioStep, value: string | number) => {
    setScenarioSteps(scenarioSteps.map(step => 
      step.id === id ? { ...step, [field]: value } : step
    ));
  };

  // Solution handlers
  const addSolution = () => {
    const newSolution: Solution = {
      id: Date.now().toString(),
      title: `方案${solutions.length + 1}`,
      content: ''
    };
    setSolutions([...solutions, newSolution]);
  };

  const removeSolution = (id: string) => {
    if (solutions.length > 1) {
      setSolutions(solutions.filter(solution => solution.id !== id));
    }
  };

  const updateSolution = (id: string, field: keyof Solution, value: string) => {
    setSolutions(solutions.map(solution => 
      solution.id === id ? { ...solution, [field]: value } : solution
    ));
  };

  // Resource Plan handlers
  const addResourcePlan = () => {
    const newPlan: ResourcePlan = {
      id: Date.now().toString(),
      type: '',
      current: '',
      gap: '',
      plan: ''
    };
    setResourcePlans([...resourcePlans, newPlan]);
  };

  const removeResourcePlan = (id: string) => {
    if (resourcePlans.length > 1) {
      setResourcePlans(resourcePlans.filter(plan => plan.id !== id));
    }
  };

  const updateResourcePlan = (id: string, field: keyof ResourcePlan, value: string) => {
    setResourcePlans(resourcePlans.map(plan => 
      plan.id === id ? { ...plan, [field]: value } : plan
    ));
  };

  const handleSave = () => {
    toast({
      title: "保存成功",
      description: "需求调研报告已保存并转换为需求",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <TopNavigation />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* 报告标题 */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="text-xl">报告基本信息</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Label htmlFor="title" className="text-sm font-medium text-gray-700">报告标题</Label>
            <Input
              id="title"
              placeholder="请输入需求调研报告标题"
              value={reportData.title}
              onChange={(e) => setReportData({ ...reportData, title: e.target.value })}
              className="mt-2"
            />
          </CardContent>
        </Card>

        {/* 一、背景 */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="text-xl">一、背景</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2">📋 背景描述框架模板</h4>
              <div className="text-sm text-blue-700 space-y-1">
                <p><strong>建议包含：</strong></p>
                <p>• 业务背景：当前业务发展阶段、面临的挑战</p>
                <p>• 技术背景：现有技术架构、系统现状</p>
                <p>• 用户背景：目标用户群体、使用场景</p>
                <p>• 问题背景：亟需解决的核心问题</p>
                <p>• 目标背景：期望达成的业务目标</p>
              </div>
            </div>
            <Label htmlFor="background" className="text-sm font-medium text-gray-700">背景描述</Label>
            <Textarea
              id="background"
              placeholder="请参考上方模板框架填写项目背景描述..."
              value={reportData.background}
              onChange={(e) => setReportData({ ...reportData, background: e.target.value })}
              className="mt-2 min-h-[120px]"
            />
          </CardContent>
        </Card>

        {/* 二、现状分析 */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="text-xl">二、现状分析</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="completed" className="text-sm font-medium text-gray-700">已经做到的部分</Label>
                <Textarea
                  id="completed"
                  placeholder="描述当前已经完成的工作内容..."
                  value={reportData.currentAnalysis.completed}
                  onChange={(e) => setReportData({
                    ...reportData,
                    currentAnalysis: { ...reportData.currentAnalysis, completed: e.target.value }
                  })}
                  className="mt-2 min-h-[120px]"
                />
              </div>
              <div>
                <Label htmlFor="uncompleted" className="text-sm font-medium text-gray-700">尚未做到的部分</Label>
                <Textarea
                  id="uncompleted"
                  placeholder="描述还未完成的工作内容..."
                  value={reportData.currentAnalysis.uncompleted}
                  onChange={(e) => setReportData({
                    ...reportData,
                    currentAnalysis: { ...reportData.currentAnalysis, uncompleted: e.target.value }
                  })}
                  className="mt-2 min-h-[120px]"
                />
              </div>
              <div>
                <Label htmlFor="painPoints" className="text-sm font-medium text-gray-700">尚未做到部分的痛点</Label>
                <Textarea
                  id="painPoints"
                  placeholder="分析存在的问题和痛点..."
                  value={reportData.currentAnalysis.painPoints}
                  onChange={(e) => setReportData({
                    ...reportData,
                    currentAnalysis: { ...reportData.currentAnalysis, painPoints: e.target.value }
                  })}
                  className="mt-2 min-h-[120px]"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 三、现状流程调研建模 */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center justify-between text-xl">
              三、现状流程调研建模
              <Button onClick={addProcessStep} size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                <Plus className="w-4 h-4 mr-1" />
                添加步骤
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4 mb-6">
              {processSteps.map((step, index) => (
                <div key={step.id} className="p-4 border rounded-lg bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">序号</Label>
                      <Input
                        type="number"
                        value={step.sequence}
                        onChange={(e) => updateProcessStep(step.id, 'sequence', parseInt(e.target.value) || 0)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">步骤</Label>
                      <Input
                        value={step.step}
                        onChange={(e) => updateProcessStep(step.id, 'step', e.target.value)}
                        placeholder="步骤名称"
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium text-gray-700">步骤描述</Label>
                      <Input
                        value={step.description}
                        onChange={(e) => updateProcessStep(step.id, 'description', e.target.value)}
                        placeholder="详细描述"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">AI效能评审</Label>
                      <select
                        value={step.aiEfficiency}
                        onChange={(e) => updateProcessStep(step.id, 'aiEfficiency', e.target.value)}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="">请选择</option>
                        <option value="higher">AI效能大于原有方案</option>
                        <option value="lower">AI效能小于原有方案</option>
                      </select>
                    </div>
                    <div>
                      <Button
                        onClick={() => removeProcessStep(step.id)}
                        variant="outline"
                        size="sm"
                        className="w-full text-red-600 border-red-200 hover:bg-red-50"
                        disabled={processSteps.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* AI生成流程图区域 */}
            <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
              <TrendingUp className="w-12 h-12 mx-auto mb-2 text-gray-400" />
              <p className="font-medium">AI生成的现状流程图</p>
              <p className="text-sm">基于上方流程表内容自动生成可视化流程图</p>
            </div>
          </CardContent>
        </Card>

        {/* 四、解决后的应用场景流程建模 */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center justify-between text-xl">
              四、解决后的应用场景流程建模
              <Button onClick={addScenarioStep} size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                <Plus className="w-4 h-4 mr-1" />
                添加场景步骤
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4 mb-6">
              {scenarioSteps.map((step, index) => (
                <div key={step.id} className="p-4 border rounded-lg bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-end">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">序号</Label>
                      <Input
                        type="number"
                        value={step.sequence}
                        onChange={(e) => updateScenarioStep(step.id, 'sequence', parseInt(e.target.value) || 0)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">场景步骤</Label>
                      <Input
                        value={step.step}
                        onChange={(e) => updateScenarioStep(step.id, 'step', e.target.value)}
                        placeholder="场景步骤名称"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">步骤描述</Label>
                      <Input
                        value={step.description}
                        onChange={(e) => updateScenarioStep(step.id, 'description', e.target.value)}
                        placeholder="详细描述"
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium text-gray-700">解决前流程</Label>
                      <Textarea
                        value={step.beforeProcess}
                        onChange={(e) => updateScenarioStep(step.id, 'beforeProcess', e.target.value)}
                        placeholder="解决方案实施前的流程..."
                        className="mt-1 min-h-[60px]"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium text-gray-700">解决后流程</Label>
                      <Textarea
                        value={step.afterProcess}
                        onChange={(e) => updateScenarioStep(step.id, 'afterProcess', e.target.value)}
                        placeholder="解决方案实施后的流程..."
                        className="mt-1 min-h-[60px]"
                      />
                    </div>
                    <div>
                      <Button
                        onClick={() => removeScenarioStep(step.id)}
                        variant="outline"
                        size="sm"
                        className="w-full text-red-600 border-red-200 hover:bg-red-50"
                        disabled={scenarioSteps.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* AI生成场景流程图区域 */}
            <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
              <TrendingUp className="w-12 h-12 mx-auto mb-2 text-gray-400" />
              <p className="font-medium">AI生成的场景流程对比图</p>
              <p className="text-sm">基于上方场景流程表内容自动生成解决前后流程对比图</p>
            </div>
          </CardContent>
        </Card>

        {/* 五、解决方案描述 */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center justify-between text-xl">
              五、解决方案描述
              <Button onClick={addSolution} size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                <Plus className="w-4 h-4 mr-1" />
                添加方案
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {solutions.map((solution, index) => (
                <div key={solution.id} className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Label className="text-lg font-medium text-gray-900">{solution.title}</Label>
                      <Input
                        value={solution.title}
                        onChange={(e) => updateSolution(solution.id, 'title', e.target.value)}
                        className="w-32 h-8 text-sm"
                      />
                    </div>
                    <Button
                      onClick={() => removeSolution(solution.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      disabled={solutions.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <Textarea
                    value={solution.content}
                    onChange={(e) => updateSolution(solution.id, 'content', e.target.value)}
                    placeholder="详细描述解决方案的内容、实施步骤、技术要点等..."
                    className="min-h-[150px]"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 六、资源稀缺以及投入计划阐述 */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center justify-between text-xl">
              六、资源稀缺以及投入计划阐述
              <Button onClick={addResourcePlan} size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                <Plus className="w-4 h-4 mr-1" />
                添加资源
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {resourcePlans.map((plan, index) => (
                <div key={plan.id} className="p-4 border rounded-lg bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">资源类型</Label>
                      <Input
                        value={plan.type}
                        onChange={(e) => updateResourcePlan(plan.id, 'type', e.target.value)}
                        placeholder="人力/技术/资金等"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">现有资源情况</Label>
                      <Input
                        value={plan.current}
                        onChange={(e) => updateResourcePlan(plan.id, 'current', e.target.value)}
                        placeholder="当前状态"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">需求缺口</Label>
                      <Input
                        value={plan.gap}
                        onChange={(e) => updateResourcePlan(plan.id, 'gap', e.target.value)}
                        placeholder="缺口分析"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">投入计划</Label>
                      <Input
                        value={plan.plan}
                        onChange={(e) => updateResourcePlan(plan.id, 'plan', e.target.value)}
                        placeholder="投入安排"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Button
                        onClick={() => removeResourcePlan(plan.id)}
                        variant="outline"
                        size="sm"
                        className="w-full text-red-600 border-red-200 hover:bg-red-50"
                        disabled={resourcePlans.length === 1}
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

        {/* 保存按钮 */}
        <div className="flex justify-center py-8">
          <Button onClick={handleSave} size="lg" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-8">
            <Save className="w-5 h-5 mr-2" />
            保存调研报告
          </Button>
        </div>
      </main>
    </div>
  );
};

export default NewReport;
