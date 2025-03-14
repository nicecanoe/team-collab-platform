// 导入团队成员数据
import teamMembers from '../data/team-members.js';

// DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 初始化团队成员展示
    initTeamMembers();
});

// 初始化团队成员展示
function initTeamMembers() {
    const teamContainer = document.querySelector('.team-members');
    
    // 如果找不到容器，则退出
    if (!teamContainer) return;
    
    // 清空容器
    teamContainer.innerHTML = '';
    
    // 遍历团队成员数据并创建 DOM 元素
    teamMembers.forEach(member => {
        const memberCard = createMemberCard(member);
        teamContainer.appendChild(memberCard);
    });
}

// 创建团队成员卡片
function createMemberCard(member) {
    const card = document.createElement('div');
    card.className = 'member-card';
    card.dataset.id = member.id;
    
    // 构建卡片内容
    card.innerHTML = `
        <div class="member-avatar">
            <img src="${member.avatar}" alt="${member.name}" onerror="this.src='images/avatars/default.png'">
        </div>
        <div class="member-info">
            <h3>${member.name}</h3>
            <p class="member-role">${member.role}</p>
            <p class="member-bio">${member.bio}</p>
            <div class="member-skills">
                ${member.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        </div>
    `;
    
    return card;
}
