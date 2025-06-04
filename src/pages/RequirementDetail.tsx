
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, History, Save, X } from "lucide-react";
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

  // 模拟需求数据
  const requirement = {
    id: 1,
    title: "用户管理系统需求",
    background: "随着业务发展，需要构建完整的用户管理体系...",
    currentAnalysis: {
      completed: "已完成基础用户注册功能",
      uncompleted: "权限管理、用户分组等功能尚未实现",
      painPoints: "现有系统权限控制粒度不够细"
    },
    processSteps: [
      { sequence: 1, step: "需求调研", description: "与业务方沟通确认需求", aiEfficiency: "higher" },
      { sequence: 2, step: "系统设计", description: "设计用户管理架构", aiEfficiency: "lower" }
    ],
    scenarios: [
      {
        title: "用户注册场景",
        beforeProcess: "手动审核注册申请",
        afterProcess: "自动化审核流程"
      }
    ],
    solutions: [
      {
        title: "方案1",
        content: "基于RBAC模型构建权限管理系统..."
      }
    ],
    resourcePlans: [
      {
        type: "人力资源",
        current: "2名开发人员",
        gap: "需要1名高级开发",
        plan: "招聘或内部调配"
      }
    ],
    version: "v1.2",
    createDate: "2024-06-01",
    lastModified: "2024-06-15",
    author: "张三"
  };

  const versions = [
    { version: "v1.2", date: "2024-06-15", author: "张三", changes: "更新解决方案描述" },
    { version: "v1.1", date: "2024-06-10", author: "张三", changes: "完善资源计划" },
    { version: "v1.0", date: "2024-06-01", author: "张三", changes: "初始版本" }
  ];

  const handleSaveEdit = () => {
    // 这里处理保存逻辑，包括资产损耗记录
    setIsEditing(false);
    setAssetLoss('');
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setAssetLoss('');
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

          {/* 其他章节按相同模式展示 */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
              <CardTitle>三、调研流程图</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
                <p>基于流程表生成的AI流程图</p>
              </div>
            </CardContent>
          </Card>

          {/* 继续展示其他章节... */}
        </div>
      </main>
    </div>
  );
};

export default RequirementDetail;
