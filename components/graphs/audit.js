import { kb } from "../../profile.js";

export const AuditRatio = (a, b, size = 200) => {
    const total = a + b;
    const aPercent = a / total;
    const bPercent = b / total;
    const radius = size / 2 -10;
    const strokeWidth = 20;
    const center = size / 2;
    const aAngle = aPercent * 360;
    const bAngle = bPercent * 360;
    function  getArcPath(startAngle, sweepAngle) {
        const largeArc = sweepAngle > 180 ? 1 : 0;
        const start = polarToCartesian(center, center, radius, startAngle);
        const end = polarToCartesian(center, center, radius, startAngle + sweepAngle);
        return `M${start.x},${start.y} A${radius},${radius} 0 ${largeArc},1 ${end.x},${end.y}`;
    }
    function polarToCartesian(cx, cy, r, angleDeg) {
        const angleRad = (angleDeg - 90) * Math.PI / 180.0;
        return {
            x: cx + r * Math.cos(angleRad),
            y: cy + r * Math.sin(angleRad),
        };
    }
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    const aPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    aPath.setAttribute('d', getArcPath(0, aAngle));
    aPath.setAttribute('stroke', '#4b7bec');
    aPath.setAttribute('stroke-width', strokeWidth);
    aPath.setAttribute('fill', 'none');
    svg.appendChild(aPath);
    const bPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    bPath.setAttribute('d', getArcPath(aAngle, bAngle));
    bPath.setAttribute('stroke', '#fd9644');
    bPath.setAttribute('stroke-width', strokeWidth);
    bPath.setAttribute('fill', 'none');
    svg.appendChild(bPath);
    const centerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    centerCircle.setAttribute('cx', center);
    centerCircle.setAttribute('cy', center);
    centerCircle.setAttribute('r', radius - strokeWidth);
    svg.appendChild(centerCircle);
    const ratio = (a / b).toFixed(1);
    let ratioColor = 'red';
    if (ratio > 1.2) {
        ratioColor = 'green';
    } else if (ratio > 0.9) {
        ratioColor = 'yellow';
    } else if (ratio > 0.7) {
        ratioColor = 'orange';
    }
    const ratioText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    ratioText.textContent = `${ratio}`;
    ratioText.setAttribute('x', center);
    ratioText.setAttribute('y', center);
    ratioText.setAttribute('fill', ratioColor);
    ratioText.setAttribute('text-anchor', 'middle');
    ratioText.setAttribute('alignment-baseline', 'middle');
    svg.appendChild(ratioText);
    const tooltip = document.createElement('div');
    tooltip.style.position = 'absolute';
    tooltip.style.display = 'none';
    tooltip.style.background = 'rgba(0, 0, 0, 0.75)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '5px';
    tooltip.style.borderRadius = '4px';
    document.body.appendChild(tooltip);
    aPath.addEventListener('mouseenter', () => {
        tooltip.style.display = 'block';
        tooltip.textContent = `Given: ${kb(a)}KB`;
    });
    bPath.addEventListener('mouseenter', () => {
        tooltip.style.display = 'block';
        tooltip.textContent = `Received: ${kb(b)}KB`;
    });
    aPath.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });
    bPath.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });
    svg.addEventListener('mousemove', (event) => {
        const offsetX = event.clientX + 10;
        const offsetY = event.clientY + window.scrollY - 20;
        tooltip.style.left = `${offsetX}px`;
        tooltip.style.top = `${offsetY}px`;
    });
    return svg;
}
