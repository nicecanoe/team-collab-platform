// 团队成员数据
const teamMembers = [
  {
      id: 1,
      name: "张三",
      role: "项目经理",
      avatar: "images/avatars/zhangsan.jpg",
      bio: "有5年项目管理经验，擅长敏捷开发和团队协作。",
      skills: ["项目管理", "需求分析", "团队建设"]
  },
  {
      id: 2,
      name: "李四",
      role: "前端开发工程师",
      avatar: "images/avatars/lisi.jpg",
      bio: "3年前端开发经验，热爱新技术，注重用户体验。",
      skills: ["HTML/CSS", "JavaScript", "React", "Vue"]
  },
  {
      id: 3,
      name: "王五",
      role: "后端开发工程师",
      avatar: "images/avatars/wangwu.jpg",
      bio: "专注于高性能、可扩展的后端系统开发。",
      skills: ["Java", "Spring Boot", "MySQL", "Redis"]
  },
  {
      id: 4,
      name: "赵六",
      role: "UI/UX 设计师",
      avatar: "images/avatars/zhaoliu.jpg",
      bio: "注重用户体验和界面美观，擅长创造直观易用的界面。",
      skills: ["Figma", "Adobe XD", "UI设计", "用户研究"]
  }
];

// 导出数据以便其他模块使用
export default teamMembers;
