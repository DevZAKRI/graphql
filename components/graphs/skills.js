export const SkillGraph = (values, labels, size = 300) => {
  const max = 100;
  const radius = 127.5;
  const centerX = size / 2;
  const centerY = 197;
  const angleOffset = -Math.PI / 2;
  const angleStep = (Math.PI * 2) / values.length;
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${size} ${size + 100}`);
  svg.setAttribute("width", size+100);
  svg.setAttribute("height", size+100);
  svg.setAttribute("style", "font-family: Roboto, sans-serif; font-size: 12px");
  const group = document.createElementNS(svg.namespaceURI, "g");
  for (let i = 0; i < values.length; i++) {
    const angle = angleOffset + i * angleStep;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    const path = document.createElementNS(svg.namespaceURI, "path");
    path.setAttribute("d", `M ${centerX} ${centerY} L ${x} ${y}`);
    path.setAttribute("stroke", "#eee");
    path.setAttribute("stroke-width", "1");
    group.appendChild(path);
  }

  const points = values.map((val, i) => {
    const angle = angleOffset + i * angleStep;
    const r = (val / max) * radius;
    return {
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle),
      value: val,
    };
  });

  const polygon = document.createElementNS(svg.namespaceURI, "path");
  const pathData = points.map((p, i) =>
    `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`
  ).join(" ") + " Z";

  polygon.setAttribute("d", pathData);
  polygon.setAttribute("fill", "#6f58e933");
  polygon.setAttribute("stroke", "#6f58e9");
  polygon.setAttribute("stroke-width", "3");
  group.appendChild(polygon);

  points.forEach((p, i) => {
    const dot = document.createElementNS(svg.namespaceURI, "circle");
    dot.setAttribute("cx", p.x);
    dot.setAttribute("cy", p.y);
    dot.setAttribute("r", "4");
    dot.setAttribute("fill", "#6f58e9");
    dot.setAttribute("stroke", "white");
    dot.setAttribute("stroke-width", "2");
    const rect = document.createElementNS(svg.namespaceURI, "rect");
    rect.setAttribute("x", p.x);
    
    rect.setAttribute("y", p.y-22);
    rect.setAttribute("fill", "#ffffffcc");
    rect.setAttribute("stroke", "#6f58e9");
    rect.setAttribute("stroke-width", "1");
    rect.setAttribute("visibility", "hidden");
    console.log(((p.value+"").length*10));
    
    rect.setAttribute('width',10+((p.value+"").length*7))
    rect.setAttribute('height',"20px")
    rect.setAttribute("filter", "drop-shadow(0px 1px 2px rgba(252, 3, 3, 0.1))");
    const label = document.createElementNS(svg.namespaceURI, "text");
       console.log(rect.getAttributeNames());
 label.setAttribute("x", p.x + 4);
    label.setAttribute("y", p.y - 8);
    label.setAttribute("fill", "#333");
    label.setAttribute("font-size", "12");
    label.setAttribute("font-weight", "500");
    label.setAttribute("visibility", "hidden");
    
    label.setAttribute("filter", "drop-shadow(0px 1px 2px rgba(252, 3, 3, 0.1))");
    label.textContent = p.value;
    dot.addEventListener("mouseenter", () => {
      label.setAttribute("visibility", "visible");
      rect.setAttribute("visibility", "visible");
    });

    dot.addEventListener("mouseleave", () => {
      label.setAttribute("visibility", "hidden");
      rect.setAttribute("visibility", "hidden");
    });

    group.appendChild(rect);
    group.appendChild(label);
    group.appendChild(dot);
  });
  const labelRadius = radius + 30;
  labels.forEach((label, i) => {
    const angle = angleOffset + i * angleStep;
    const x = centerX + labelRadius * Math.cos(angle);
    const y = centerY + labelRadius * Math.sin(angle);
    const text = document.createElementNS(svg.namespaceURI, "text");
    text.setAttribute("x", x);
    text.setAttribute("y", y);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("alignment-baseline", "middle");
    text.setAttribute("fill", "#444");
    text.setAttribute("font-weight", "500");
    text.textContent = label;
    group.appendChild(text);
  });
  svg.appendChild(group);
  return svg;
};
