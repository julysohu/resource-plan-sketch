import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, History, Save, X, TrendingUp, DollarSign, Target, Clock } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import TopNavigation from '@/components/TopNavigation';
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RequirementDetail = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [assetLoss, setAssetLoss] = useState('');

  // 模拟完整需求数据
  const requirement = {
    id: 1,
    title: "电商投放图生产流程优化系统",
    background: "随着电商业务快速发展，我们需要大量的投放图片内容。目前设计师手动制作投放图，存在效率低下、质量不一致、重复工作多等问题。急需建立智能化的投放图生产流程，提升设计效率和质量标准化。",
    currentAnalysis: {
      completed: "已建立基础的设计素材库，有专门的设计团队负责投放图制作，建立了基本的品牌规范和设计标准",
      uncompleted: "缺乏智能化设计工具，素材管理不够系统化，设计流程标准化程度低，质量控制主要依赖人工审核",
      painPoints: "设计师需要大量时间进行重复性工作，素材查找困难，不同设计师产出质量差异较大，无法快速响应营销活动需求"
    },
    processSteps: [
      { sequence: 1, step: "接收投放需求", description: "市场部门提出电商投放图制作需求，包含产品信息、投放平台、目标人群等" },
      { sequence: 2, step: "素材收集", description: "设计师手动收集产品图片、品牌素材、文案内容等设计元素" },
      { sequence: 3, step: "设计制作", description: "使用Photoshop等工具进行投放图设计，包括构图、配色、文字排版等" },
      { sequence: 4, step: "内容审核", description: "设计总监对设计稿进行审核，检查品牌规范、视觉效果等" },
      { sequence: 5, step: "修改完善", description: "根据审核意见进行设计调整和优化" },
      { sequence: 6, step: "最终交付", description: "输出不同尺寸规格的投放图，交付给市场部门使用" }
    ],
    scenarioSteps: [
      { sequence: 1, step: "智能需求分析", description: "AI系统自动分析投放需求，提取关键信息和设计要求" },
      { sequence: 2, step: "自动素材匹配", description: "从素材库中智能匹配合适的产品图、背景、装饰元素" },
      { sequence: 3, step: "AI辅助设计", description: "基于品牌规范和最佳实践，AI生成多个设计方案供选择" },
      { sequence: 4, step: "快速预览调整", description: "设计师可实时预览效果，通过简单操作进行样式调整" },
      { sequence: 5, step: "一键批量输出", description: "自动生成各平台所需的不同尺寸规格，确保质量一致性" }
    ],
    solutions: [
      {
        title: "方案1：智能化设计工作台",
        content: "构建集成AI能力的设计工作台，包含智能素材推荐、自动排版、样式生成等功能。通过机器学习算法分析历史优秀设计案例，为设计师提供智能化的设计建议和自动化工具。"
      },
      {
        title: "方案2：模板化批量生产系统",
        content: "建立标准化的设计模板库和自动化批量生产流程。通过模板配置和参数化设计，实现快速批量生成不同产品的投放图，大幅提升生产效率。"
      }
    ],
    resourcePlans: [
      {
        type: "人力资源",
        current: "3名UI设计师，1名设计总监",
        gap: "需要1名AI算法工程师，1名前端开发",
        plan: "内部培养结合外部招聘"
      },
      {
        type: "技术资源",
        current: "Adobe设计软件，基础云服务器",
        gap: "AI训练平台，图像处理服务器集群",
        plan: "采购云端AI服务和高性能计算资源"
      },
      {
        type: "数据资源",
        current: "部分历史设计作品，基础素材库",
        gap: "大量标注训练数据，完整素材分类体系",
        plan: "数据收集整理和专业标注服务"
      }
    ],
    // 新增成本概览数据
    costOverview: {
      totalBudget: 450000,
      spentAmount: 180000,
      remainingBudget: 270000,
      costByPhase: [
        { phase: "需求调研", budgetted: 50000, actual: 45000, status: "completed" },
        { phase: "方案设计", budgetted: 80000, actual: 75000, status: "completed" },
        { phase: "开发实施", budgetted: 200000, actual: 60000, status: "in-progress" },
        { phase: "测试上线", budgetted: 70000, actual: 0, status: "pending" },
        { phase: "运维支持", budgetted: 50000, actual: 0, status: "pending" }
      ]
    },
    version: "v1.3",
    createDate: "2024-06-01",
    lastModified: "2024-06-20",
    author: "张三"
  };

  const versions = [
    { version: "v1.3", date: "2024-06-20", author: "张三", changes: "增加成本概览和资源规划细节" },
    { version: "v1.2", date: "2024-06-15", author: "张三", changes: "更新解决方案描述" },
    { version: "v1.1", date: "2024-06-10", author: "张三", changes: "完善资源计划" },
    { version: "v1.0", date: "2024-06-01", author: "张三", changes: "初始版本" }
  ];

  const handleSaveEdit = () => {
    setIsEditing(false);
    setAssetLoss('');
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setAssetLoss('');
  };

  const getPhaseStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'in-progress': return 'text-blue-600 bg-blue-50';
      case 'pending': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
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
              <h1 className="text-2xl font-bold text-gray-900">{requirement.title}</h1>
              <p className="text-gray-600">版本 {requirement.version} · 创建于 {requirement.createDate}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              onClick={() => setShowVersionHistory(!showVersionHistory)}
            >
              <History className="w-4 h-4 mr-2" />
              版本历史
            </Button>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} className="bg-gradient-to-r from-blue-600 to-indigo-600">
                <Edit className="w-4 h-4 mr-2" />
                编辑
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button onClick={handleSaveEdit} className="bg-gradient-to-r from-green-600 to-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  保存
                </Button>
                <Button variant="outline" onClick={handleCancelEdit}>
                  <X className="w-4 h-4 mr-2" />
                  取消
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* 成本概览 */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              任务成本概览
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {/* 总体成本统计 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Target className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">¥{requirement.costOverview.totalBudget.toLocaleString()}</div>
                <div className="text-sm text-gray-600">总预算</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <Clock className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-600">¥{requirement.costOverview.spentAmount.toLocaleString()}</div>
                <div className="text-sm text-gray-600">已花费</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">¥{requirement.costOverview.remainingBudget.toLocaleString()}</div>
                <div className="text-sm text-gray-600">剩余预算</div>
              </div>
            </div>

            {/* 分阶段成本详情 */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4">分阶段成本明细</h4>
              <div className="space-y-3">
                {requirement.costOverview.costByPhase.map((phase, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-gray-900">{phase.phase}</span>
                      <span className={`px-2 py-1 rounded text-xs ${getPhaseStatusColor(phase.status)}`}>
                        {phase.status === 'completed' ? '已完成' : 
                         phase.status === 'in-progress' ? '进行中' : '待开始'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <span className="text-gray-600">预算: ¥{phase.budgetted.toLocaleString()}</span>
                      <span className="text-gray-900 font-medium">实际: ¥{phase.actual.toLocaleString()}</span>
                      <span className={`font-medium ${
                        phase.actual > phase.budgetted ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {phase.actual > phase.budgetted ? '超支' : '正常'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 版本历史侧边栏 */}
        {showVersionHistory && (
          <Card className="mb-6 border-0 shadow-lg">
            <CardHeader>
              <CardTitle>版本历史</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {versions.map((v) => (
                  <div key={v.version} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div>
                      <div className="font-medium">{v.version}</div>
                      <div className="text-sm text-gray-600">{v.date} · {v.author}</div>
                      <div className="text-sm text-gray-500">{v.changes}</div>
                    </div>
                    <Button variant="outline" size="sm">查看</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 编辑时的资产损耗记录 */}
        {isEditing && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="text-orange-800">资产损耗记录</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="assetLoss" className="text-sm font-medium text-gray-700">
                本次修改导致的资产损耗
              </Label>
              <Textarea
                id="assetLoss"
                placeholder="请描述本次修改可能导致的资产损耗，如工时、成本等..."
                value={assetLoss}
                onChange={(e) => setAssetLoss(e.target.value)}
                className="mt-2"
              />
            </CardContent>
          </Card>
        )}

        <div className="space-y-8">
          {/* 一、背景 */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
              <CardTitle>一、背景</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {isEditing ? (
                <Textarea
                  value={requirement.background}
                  className="min-h-[120px]"
                  placeholder="请填写项目背景描述..."
                />
              ) : (
                <p className="text-gray-700">{requirement.background}</p>
              )}
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
                  <h4 className="font-medium text-gray-900 mb-2">已经做到的部分</h4>
                  {isEditing ? (
                    <Textarea value={requirement.currentAnalysis.completed} className="min-h-[100px]" />
                  ) : (
                    <p className="text-gray-700">{requirement.currentAnalysis.completed}</p>
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">尚未做到的部分</h4>
                  {isEditing ? (
                    <Textarea value={requirement.currentAnalysis.uncompleted} className="min-h-[100px]" />
                  ) : (
                    <p className="text-gray-700">{requirement.currentAnalysis.uncompleted}</p>
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">尚未做到部分的痛点</h4>
                  {isEditing ? (
                    <Textarea value={requirement.currentAnalysis.painPoints} className="min-h-[100px]" />
                  ) : (
                    <p className="text-gray-700">{requirement.currentAnalysis.painPoints}</p>
                  )}
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
                <h4 className="font-medium text-gray-900 mb-4">现状业务流程表</h4>
                <div className="space-y-2">
                  {requirement.processSteps.map((step, index) => (
                    <div key={index} className="grid grid-cols-5 gap-4 p-3 border rounded bg-gray-50">
                      <div className="text-sm font-medium">{step.sequence}</div>
                      <div className="text-sm">{step.step}</div>
                      <div className="text-sm col-span-3">{step.description}</div>
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
                <h4 className="font-medium text-gray-900 mb-4">解决后场景流程表</h4>
                <div className="space-y-4">
                  {requirement.scenarioSteps.map((step, index) => (
                    <div key={index} className="p-4 border rounded bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="text-sm"><strong>场景:</strong> {step.step}</div>
                        <div className="text-sm"><strong>描述:</strong> {step.description}</div>
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
              <div className="space-y-6">
                {requirement.solutions.map((solution, index) => (
                  <div key={index}>
                    <h4 className="font-medium text-gray-900 mb-3">{solution.title}</h4>
                    {isEditing ? (
                      <Textarea value={solution.content} className="min-h-[120px]" />
                    ) : (
                      <p className="text-gray-700">{solution.content}</p>
                    )}
                  </div>
                ))}
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
                {requirement.resourcePlans.map((plan, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded bg-gray-50">
                    <div>
                      <h5 className="text-sm font-medium text-gray-700">资源类型</h5>
                      <p className="text-sm text-gray-600">{plan.type}</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-700">现有资源情况</h5>
                      <p className="text-sm text-gray-600">{plan.current}</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-700">需求缺口</h5>
                      <p className="text-sm text-gray-600">{plan.gap}</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-700">投入计划</h5>
                      <p className="text-sm text-gray-600">{plan.plan}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default RequirementDetail;
