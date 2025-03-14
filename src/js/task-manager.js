// 导入任务数据
import tasks from "../data/tasks.js";

// 任务管理类
class TaskManager {
  constructor() {
    this.tasks = [...tasks]; // 复制任务数据
    this.nextId = this.calculateNextId();
    this.taskContainer = null;
    this.taskForm = null;
    this.filterStatus = "all";
  }

  // 计算下一个任务ID
  calculateNextId() {
    return this.tasks.length > 0
      ? Math.max(...this.tasks.map((task) => task.id)) + 1
      : 1;
  }

  // 初始化任务管理器
  init() {
    this.taskContainer = document.querySelector(".task-list");
    this.taskForm = document.querySelector("#task-form");

    if (!this.taskContainer || !this.taskForm) return;

    // 渲染任务列表
    this.renderTasks();

    // 设置事件监听
    this.setupEventListeners();
  }

  // 设置事件监听
  setupEventListeners() {
    // 表单提交事件
    this.taskForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.addOrUpdateTask();
    });

    // 状态过滤器事件
    const statusFilters = document.querySelectorAll(".status-filter");
    statusFilters.forEach((filter) => {
      filter.addEventListener("click", () => {
        statusFilters.forEach((f) => f.classList.remove("active"));
        filter.classList.add("active");
        this.filterStatus = filter.dataset.status;
        this.renderTasks();
      });
    });

    // 任务操作事件（使用事件委托）
    this.taskContainer.addEventListener("click", (e) => {
      const taskId = parseInt(e.target.closest(".task-item")?.dataset.id);
      if (!taskId) return;

      // 编辑任务
      if (e.target.classList.contains("edit-task")) {
        this.editTask(taskId);
      }

      // 删除任务
      if (e.target.classList.contains("delete-task")) {
        this.deleteTask(taskId);
      }

      // 更改任务状态
      if (e.target.classList.contains("task-status")) {
        this.toggleTaskStatus(taskId);
      }
    });
  }

  // 渲染任务列表
  renderTasks() {
    if (!this.taskContainer) return;

    // 清空容器
    this.taskContainer.innerHTML = "";

    // 过滤任务
    let filteredTasks = this.tasks;
    if (this.filterStatus !== "all") {
      filteredTasks = this.tasks.filter(
        (task) => task.status === this.filterStatus
      );
    }

    // 如果没有任务，显示提示信息
    if (filteredTasks.length === 0) {
      this.taskContainer.innerHTML = '<div class="no-tasks">暂无任务</div>';
      return;
    }

    // 遍历任务并创建DOM元素
    filteredTasks.forEach((task) => {
      const taskElement = this.createTaskElement(task);
      this.taskContainer.appendChild(taskElement);
    });
  }

  // 创建任务元素
  createTaskElement(task) {
    const taskElement = document.createElement("div");
    taskElement.className = `task-item priority-${task.priority.toLowerCase()}`;
    taskElement.dataset.id = task.id;

    // 构建任务HTML
    taskElement.innerHTML = `
            <div class="task-header">
                <h3 class="task-title">${task.title}</h3>
                <div class="task-actions">
                    <button class="edit-task" title="编辑任务"><i class="fas fa-edit"></i></button>
                    <button class="delete-task" title="删除任务"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            <div class="task-description">${task.description}</div>
            <div class="task-meta">
                <div class="task-assignee">
                    <span class="meta-label">负责人:</span> ${task.assignee}
                </div>
                <div class="task-due-date">
                    <span class="meta-label">截止日期:</span> ${task.dueDate}
                </div>
            </div>
            <div class="task-footer">
                <div class="task-status ${
                  task.status === "已完成" ? "completed" : ""
                }" title="点击更改状态">
                    ${task.status}
                </div>
                <div class="task-priority">
                    <span class="priority-badge">${task.priority}</span>
                </div>
            </div>
        `;

    return taskElement;
  }

  // 添加或更新任务
  addOrUpdateTask() {
    const taskId = document.getElementById("task-id").value;
    const title = document.getElementById("task-title").value.trim();
    const description = document
      .getElementById("task-description")
      .value.trim();
    const assignee = document.getElementById("task-assignee").value.trim();
    const dueDate = document.getElementById("task-due-date").value;
    const status = document.getElementById("task-status").value;
    const priority = document.getElementById("task-priority").value;

    if (!title || !assignee || !dueDate) {
      alert("请填写必填字段！");
      return;
    }

    // 创建任务对象
    const task = {
      title,
      description,
      assignee,
      dueDate,
      status,
      priority,
    };

    // 更新现有任务或添加新任务
    if (taskId) {
      task.id = parseInt(taskId);
      const index = this.tasks.findIndex((t) => t.id === task.id);
      if (index !== -1) {
        this.tasks[index] = task;
      }
    } else {
      task.id = this.nextId++;
      this.tasks.push(task);
    }

    // 重置表单
    this.taskForm.reset();
    document.getElementById("task-id").value = "";
    document.getElementById("form-title").textContent = "添加新任务";
    document.getElementById("submit-task").textContent = "添加任务";

    // 重新渲染任务列表
    this.renderTasks();
  }

  // 编辑任务
  editTask(taskId) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (!task) return;

    // 填充表单
    document.getElementById("task-id").value = task.id;
    document.getElementById("task-title").value = task.title;
    document.getElementById("task-description").value = task.description;
    document.getElementById("task-assignee").value = task.assignee;
    document.getElementById("task-due-date").value = task.dueDate;
    document.getElementById("task-status").value = task.status;
    document.getElementById("task-priority").value = task.priority;

    // 更新表单标题和按钮文本
    document.getElementById("form-title").textContent = "编辑任务";
    document.getElementById("submit-task").textContent = "更新任务";

    // 滚动到表单
    this.taskForm.scrollIntoView({ behavior: "smooth" });
  }

  // 删除任务
  deleteTask(taskId) {
    if (confirm("确定要删除此任务吗？")) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
      this.renderTasks();
    }
  }

  // 切换任务状态
  toggleTaskStatus(taskId) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (!task) return;

    // 循环切换状态：待开始 -> 进行中 -> 已完成 -> 待开始
    switch (task.status) {
      case "待开始":
        task.status = "进行中";
        break;
      case "进行中":
        task.status = "已完成";
        break;
      case "已完成":
        task.status = "待开始";
        break;
      default:
        task.status = "待开始";
    }

    this.renderTasks();
  }
}

export default TaskManager;
