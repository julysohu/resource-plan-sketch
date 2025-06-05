
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, TrendingUp, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import TopNavigation from '@/components/TopNavigation';

const NewReport = () => {
  const [processSteps, setProcessSteps] = useState([
    { sequence: 1, step: '接收投放需求', description: '市场部门提出电商投放图制作需求，包含产品信息、投放平台、目标人群等' },
    { sequence: 2, step: '素材收集', description: '设计师手动收集产品图片、品牌素材、文案内容等设计元素' },
    { sequence: 3, step: '设计制作', description: '使用Photoshop等工具进行投放图设计，包括构图、配色、文字排版等' },
    { sequence: 4, step: '内容审核', description: '设计总监对设计稿进行审核，检查品牌规范、视觉效果等' },
    { sequence: 5, step: '修改完善', description: '根据审核意见进行设计调整和优化' },
    { sequence: 6, step: '最终交付', description: '输出不同尺寸规格的投放图，交付给市场部门使用' }
  ]);

  const [scenarioSteps, setScenarioSteps] = useState([
    { sequence: 1, step: '智能需求分析', description: 'AI系统自动分析投放需求，提取关键信息和设计要求' },
    { sequence: 2, step: '自动素材匹配', description: '从素材库中智能匹配合适的产品图、背景、装饰元素' },
    { sequence: 3, step: 'AI辅助设计', description: '基于品牌规范和最佳实践，AI生成多个设计方案供选择' },
    { sequence: 4, step: '快速预览调整', description: '设计师可实时预览效果，通过简单操作进行样式调整' },
    { sequence: 5, step: '一键批量输出', description: '自动生成各平台所需的不同尺寸规格，确保质量一致性' }
  ]);

  const addProcessStep = () => {
    setProcessSteps([...processSteps, { 
      sequence: processSteps.length + 1, 
      step: '', 
      description: '' 
    }]);
  };

  const removeProcessStep = (index: number) => {
    const newSteps = processSteps.filter((_, i) => i !== index);
    // 重新排序
    const reorderedSteps = newSteps.map((step, i) => ({ ...step, sequence: i + 1 }));
    setProcessSteps(reorderedSteps);
  };

  const addScenarioStep = () => {
    setScenarioSteps([...scenarioSteps, { 
      sequence: scenarioSteps.length + 1, 
      step: '', 
      description: '' 
    }]);
  };

  const removeScenarioStep = (index: number) => {
    const newSteps = scenarioSteps.filter((_, i) => i !== index);
    // 重新排序
    const reorderedSteps = newSteps.map((step, i) => ({ ...step, sequence: i + 1 }));
    setScenarioSteps(reorderedSteps);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <TopNavigation />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              <h1 className="text-2xl font-bold text-gray-900">新建需求调研</h1>
              <p className="text-gray-600">创建新的需求调研文档</p>
            </div>
          </div>
          
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
            <Save className="w-4 h-4 mr-2" />
            保存需求
          </Button>
        </div>

        <div className="space-y-8">
          {/* 一、背景 */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
              <CardTitle>一、背景</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-medium text-blue-900 mb-2">背景描述框架建议：</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• <strong>业务现状：</strong>描述当前业务场景和工作方式</li>
                  <li>• <strong>遇到的问题：</strong>明确具体的痛点和挑战</li>
                  <li>• <strong>业务影响：</strong>说明问题对业务效率和结果的影响</li>
                  <li>• <strong>解决必要性：</strong>阐述为什么需要解决这个问题</li>
                </ul>
              </div>
              <Textarea
                placeholder="请按照上述框架描述项目背景，例如：随着电商业务快速发展，我们需要大量的投放图片内容..."
                className="min-h-[120px]"
              />
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
                  <Label className="text-base font-medium text-gray-900 mb-3 block">已经做到的部分</Label>
                  <Textarea placeholder="描述当前已经实现的功能和流程..." className="min-h-[120px]" />
                </div>
                <div>
                  <Label className="text-base font-medium text-gray-900 mb-3 block">尚未做到的部分</Label>
                  <Textarea placeholder="描述还未实现的功能和需求..." className="min-h-[120px]" />
                </div>
                <div>
                  <Label className="text-base font-medium text-gray-900 mb-3 block">尚未做到部分的痛点</Label>
                  <Textarea placeholder="详细说明痛点和影响..." className="min-h-[120px]" />
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
                  <h4 className="font-medium text-gray-900">现状业务流程表</h4>
                  <Button onClick={addProcessStep} variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    添加步骤
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-12 gap-4 p-3 bg-gray-100 rounded font-medium text-sm">
                    <div className="col-span-1">序号</div>
                    <div className="col-span-3">流程步骤</div>
                    <div className="col-span-7">步骤描述</div>
                    <div className="col-span-1">操作</div>
                  </div>
                  {processSteps.map((step, index) => (
                    <div key={index} className="grid grid-cols-12 gap-4 p-3 border rounded">
                      <div className="col-span-1 flex items-center">
                        <span className="text-sm font-medium">{step.sequence}</span>
                      </div>
                      <div className="col-span-3">
                        <Input 
                          value={step.step}
                          onChange={(e) => {
                            const newSteps = [...processSteps];
                            newSteps[index].step = e.target.value;
                            setProcessSteps(newSteps);
                          }}
                          placeholder="步骤名称"
                          className="text-sm"
                        />
                      </div>
                      <div className="col-span-7">
                        <Textarea 
                          value={step.description}
                          onChange={(e) => {
                            const newSteps = [...processSteps];
                            newSteps[index].description = e.target.value;
                            setProcessSteps(newSteps);
                          }}
                          placeholder="详细描述该步骤的具体内容和操作"
                          className="text-sm min-h-[60px]"
                        />
                      </div>
                      <div className="col-span-1 flex items-center">
                        <Button 
                          onClick={() => removeProcessStep(index)}
                          variant="ghost" 
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* AI生成流程图 */}
              <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500 bg-gray-50">
                <TrendingUp className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="font-medium text-lg mb-2">AI生成的现状流程图</p>
                <p className="text-sm">基于上述流程表内容，AI将自动生成可视化的业务流程图</p>
                <Button className="mt-4" variant="outline">
                  生成流程图
                </Button>
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
                  <h4 className="font-medium text-gray-900">解决后场景流程表</h4>
                  <Button onClick={addScenarioStep} variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    添加步骤
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-12 gap-4 p-3 bg-gray-100 rounded font-medium text-sm">
                    <div className="col-span-1">序号</div>
                    <div className="col-span-3">场景步骤</div>
                    <div className="col-span-7">步骤描述</div>
                    <div className="col-span-1">操作</div>
                  </div>
                  {scenarioSteps.map((step, index) => (
                    <div key={index} className="grid grid-cols-12 gap-4 p-3 border rounded">
                      <div className="col-span-1 flex items-center">
                        <span className="text-sm font-medium">{step.sequence}</span>
                      </div>
                      <div className="col-span-3">
                        <Input 
                          value={step.step}
                          onChange={(e) => {
                            const newSteps = [...scenarioSteps];
                            newSteps[index].step = e.target.value;
                            setScenarioSteps(newSteps);
                          }}
                          placeholder="场景名称"
                          className="text-sm"
                        />
                      </div>
                      <div className="col-span-7">
                        <Textarea 
                          value={step.description}
                          onChange={(e) => {
                            const newSteps = [...scenarioSteps];
                            newSteps[index].description = e.target.value;
                            setScenarioSteps(newSteps);
                          }}
                          placeholder="详细描述解决后的场景流程"
                          className="text-sm min-h-[60px]"
                        />
                      </div>
                      <div className="col-span-1 flex items-center">
                        <Button 
                          onClick={() => removeScenarioStep(index)}
                          variant="ghost" 
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* AI生成场景流程图 */}
              <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500 bg-gray-50">
                <TrendingUp className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="font-medium text-lg mb-2">AI生成的场景流程图</p>
                <p className="text-sm">基于场景流程表生成的解决后场景流程图</p>
                <Button className="mt-4" variant="outline">
                  生成流程图
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 五、解决方案描述 */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
              <CardTitle>五、解决方案描述</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium text-gray-900 mb-3 block">方案1：智能化设计工作台</Label>
                  <Textarea placeholder="详细描述第一个解决方案..." className="min-h-[120px]" />
                </div>
                <div>
                  <Label className="text-base font-medium text-gray-900 mb-3 block">方案2：AI辅助设计系统</Label>
                  <Textarea placeholder="详细描述第二个解决方案..." className="min-h-[120px]" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 六、资源稀缺以及投入计划阐述 */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
              <CardTitle>六、资源稀缺以及投入计划阐述</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-base font-medium text-gray-900 mb-3 block">人力资源计划</Label>
                  <Textarea placeholder="描述所需的人力资源，包括角色、技能要求、工时等..." className="min-h-[120px]" />
                </div>
                <div>
                  <Label className="text-base font-medium text-gray-900 mb-3 block">技术资源计划</Label>
                  <Textarea placeholder="描述所需的技术资源，包括开发环境、工具、平台等..." className="min-h-[120px]" />
                </div>
                <div>
                  <Label className="text-base font-medium text-gray-900 mb-3 block">预算投入计划</Label>
                  <Textarea placeholder="描述项目预算分配和投入计划..." className="min-h-[120px]" />
                </div>
                <div>
                  <Label className="text-base font-medium text-gray-900 mb-3 block">时间资源计划</Label>
                  <Textarea placeholder="描述项目时间安排和里程碑计划..." className="min-h-[120px]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default NewReport;
