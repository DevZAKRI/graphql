import { AuditRatio } from "./components/graphs/audit.js"
import { projectsGraph } from "./components/graphs/project.js"
import { SkillGraph } from "./components/graphs/skills.js"
import { header } from "./components/headder.js"

export const loadMainPage = (data) => {
    document.body.append(header(data.user[0]))
    let skillsSection = document.createElement('div')
    skillsSection.classList.add('skills')
    skillsSection.innerHTML= '<p>Skils<p>'
    let skills_graph = SkillGraph([data.go.aggregate.max.amount, data.js.aggregate.max.amount, data.prog.aggregate.max.amount,data.html.aggregate.max.amount,data.back.aggregate.max.amount,data.front.aggregate.max.amount], ["Go", "Js", "Prog","Html","Back-End","Front-End"])
    skillsSection.append(skills_graph)
    let projectSec = document.createElement('div')
    projectSec.classList.add('projects')
    projectSec.append(projectsGraph(data.xp.filter((v) => v.path.split("/").slice(-2, -1)[0] === "module").slice(0, 5).map(e => { return { value: kb(e.amount), name: e.path.split('/').slice(-1) } })))
    let totalxp = document.createElement('div')
    totalxp.classList.add('xp')
    totalxp.innerHTML = `<p>curent level:${data.lvl.aggregate.max.amount}</p><p> total xp: ` + Math.round(kb(data.xp.reduce((a, c) => a + c.amount, 0))) + " KB</p>"
    let auditHolder = document.createElement('div')
    auditHolder.classList.add('auditRatio')
    auditHolder.innerHTML = '<p>audit ratio<p>'
    let autidratio = AuditRatio(data.user[0].totalUp, data.user[0].totalDown)
    auditHolder.append(autidratio)
    document.body.append(skillsSection, totalxp, projectSec, auditHolder)
}
export const kb = (b) => { // Convert xp to KB
    let k = b / 1000
    return Math.round(k)!==k?k.toFixed(1):k
}