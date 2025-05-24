import { AuditRatio } from "./components/graphs/audit.js"
import { projectsGraph } from "./components/graphs/project.js"
import { SkillGraph } from "./components/graphs/skills.js"
import { header } from "./components/headder.js"

export const loadMainPage = (data) => {
    // Check if user exists and has required data
    if (!data.user || !data.user[0] || !data.user[0].campus) {
        const container = document.createElement('div');
        container.style.textAlign = 'center';
        container.style.padding = '20px';
        
        const message = document.createElement('div');
        message.style.fontSize = '18px';
        message.style.marginBottom = '20px';
        message.innerHTML = 'No data found. You might not be a student in our school yet.';
        
        const logoutButton = document.createElement('button');
        logoutButton.innerHTML = 'Logout';
        logoutButton.style.padding = '10px 20px';
        logoutButton.style.fontSize = '16px';
        logoutButton.style.cursor = 'pointer';
        logoutButton.style.backgroundColor = '#ff4d4d';
        logoutButton.style.color = 'white';
        logoutButton.style.border = 'none';
        logoutButton.style.borderRadius = '4px';
        
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('jwt');
            window.location.reload();
        });
        
        container.append(message, logoutButton);
        document.body.append(container);
        return;
    }

    document.body.append(header(data.user[0]))
    let skillsSection = document.createElement('div')
    skillsSection.classList.add('skills')
    skillsSection.innerHTML = '<p>Skills</p>'
    
    // Extract skill amounts in the correct order with null checks
    const skillAmounts = [
        data.go?.aggregate?.max?.amount || 0,
        data.js?.aggregate?.max?.amount || 0,
        data.prog?.aggregate?.max?.amount || 0,
        data.html?.aggregate?.max?.amount || 0,
        data.back?.aggregate?.max?.amount || 0,
        data.front?.aggregate?.max?.amount || 0
    ];

    // Check if any skills exist
    if (skillAmounts.some(amount => amount > 0)) {
        let skills_graph = SkillGraph(skillAmounts, ["Go", "Js", "Prog", "Html", "Back-End", "Front-End"])
        skillsSection.append(skills_graph)
    } else {
        skillsSection.innerHTML += '<p>No skills data found</p>'
    }
    
    let projectSec = document.createElement('div')
    projectSec.classList.add('projects')
    
    // Check if XP data exists and has items
    if (data.xp && data.xp.length > 0) {
        const projectData = data.xp
            .filter((v) => v.path && v.path.split("/").slice(-2, -1)[0] === "module")
            .slice(0, 5)
            .map(e => ({ 
                value: kb(e.amount || 0), 
                name: e.path ? e.path.split('/').slice(-1)[0] : 'Unknown'
            }));
            
        if (projectData.length > 0) {
            projectSec.append(projectsGraph(projectData))
        } else {
            projectSec.innerHTML = '<p>No project data found</p>'
        }
    } else {
        projectSec.innerHTML = '<p>No project data found</p>'
    }
    
    let totalxp = document.createElement('div')
    totalxp.classList.add('xp')
    const level = data.lvl?.aggregate?.max?.amount || 0;
    const totalXpAmount = data.xp ? Math.round(kb(data.xp.reduce((a, c) => a + (c.amount || 0), 0))) : 0;
    totalxp.innerHTML = `<p>current level: ${level || 'No data'}</p><p>total xp: ${totalXpAmount} KB</p>`
    
    let auditHolder = document.createElement('div')
    auditHolder.classList.add('auditRatio')
    auditHolder.innerHTML = '<p>audit ratio</p>'
    
    // Check if audit data exists
    if (data.user[0].totalUp != null && data.user[0].totalDown != null) {
        let auditRatio = AuditRatio(data.user[0].totalUp, data.user[0].totalDown)
        auditHolder.append(auditRatio)
    } else {
        auditHolder.innerHTML += '<p>No audit data found</p>'
    }
    
    document.body.append(skillsSection, totalxp, projectSec, auditHolder)
}

export const kb = (b) => { // Convert xp to KB
    let k = b / 1000
    return Math.round(k) !== k ? k.toFixed(1) : k
}