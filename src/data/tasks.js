// 任务数据
const tasks = [
  {
      id: 1,
      title: "完成项目需求分析",
      description: "与客户沟通，确定项目范围和主要功能需求。",
      assignee: "张三",
      dueDate: "2025-03-20",
      status: "进行中",
      priority: "高"
  },
  {
      id: 2,
      title: "设计用户界面原型",
      description: "创建主要页面的线框图和交互原型。",
      assignee: "赵六",
      dueDate: "2025-03-25",
      status: "待开始",
      priority: "中"
  },
  {
      id: 3,
      title: "搭建前端项目结构",
      description: "初始化项目，配置开发环境和依赖。",
      assignee: "李四",
      dueDate: "2025-03-18",
      status: "已完成",
      priority: "中"
  },
  {
      id: 4,
      title: "实现用户认证功能",
      description: "开发登录、注册和密码重置功能。",
      assignee: "王五",
      dueDate: "2025-03-30",
      status: "待开始",
      priority: "高"
  }
];

// 导出数据以便其他模块使用
export default tasks;
