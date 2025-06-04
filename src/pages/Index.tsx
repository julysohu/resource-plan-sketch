
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, FileText, Code, BarChart3, Users, Target, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import TopNavigation from '@/components/TopNavigation';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <TopNavigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            需求资产管理系统
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            高效管理需求全生命周期，从调研到开发，从资源到产出，让每个需求都成为宝贵的数字资产
          </p>
        </div>

        {/* Main Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* 需求管理 */}
          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-gray-900">需求管理</CardTitle>
              <CardDescription className="text-gray-600">
                从需求调研到文档管理，完整记录需求全生命周期
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Target className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">需求调研</p>
                  <p className="text-xs text-gray-600">结构化调研流程</p>
                </div>
                <div className="text-center p-4 bg-indigo-50 rounded-lg">
                  <FileText className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">文档管理</p>
                  <p className="text-xs text-gray-600">版本控制与追踪</p>
                </div>
              </div>
              <div className="flex space-x-3 pt-4">
                <Link to="/new-report" className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    <Plus className="w-4 h-4 mr-2" />
                    新建需求调研
                  </Button>
                </Link>
                <Link to="/requirements" className="flex-1">
                  <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50">
                    查看需求列表
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* 开发管理 */}
          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Code className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-gray-900">开发管理</CardTitle>
              <CardDescription className="text-gray-600">
                任务分配、进度跟踪、成本控制一体化管理
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Users className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">任务管理</p>
                  <p className="text-xs text-gray-600">团队协作高效</p>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">进度追踪</p>
                  <p className="text-xs text-gray-600">实时状态更新</p>
                </div>
              </div>
              <div className="pt-4">
                <Link to="/development">
                  <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                    <Code className="w-4 h-4 mr-2" />
                    进入开发管理
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="border-0 shadow-lg text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
              <div className="text-sm text-gray-600">活跃需求</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">8</div>
              <div className="text-sm text-gray-600">开发中项目</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-orange-600 mb-2">24</div>
              <div className="text-sm text-gray-600">团队成员</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-sm text-gray-600">按时完成率</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">快速操作</CardTitle>
            <CardDescription>常用功能快速入口</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/new-report">
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center w-full">
                  <Plus className="w-6 h-6 mb-2" />
                  <span className="text-sm">新建调研</span>
                </Button>
              </Link>
              <Link to="/requirements">
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center w-full">
                  <FileText className="w-6 h-6 mb-2" />
                  <span className="text-sm">需求列表</span>
                </Button>
              </Link>
              <Link to="/development">
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center w-full">
                  <Code className="w-6 h-6 mb-2" />
                  <span className="text-sm">开发任务</span>
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center w-full">
                  <BarChart3 className="w-6 h-6 mb-2" />
                  <span className="text-sm">部门看板</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Index;
