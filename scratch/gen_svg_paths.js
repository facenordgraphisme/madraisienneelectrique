function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, startAngle, endAngle) {
  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);
  var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  var d = [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(" ");
  return d;
}

const center = { x: 200, y: 200 };
const radius = 100;
const segments = [
  { label: "300–500 €", value: 42, color: "#10b981" },
  { label: "Plus de 500 €", value: 26, color: "#3b82f6" },
  { label: "Moins de 300 €", value: 13, color: "#6366f1" },
  { label: "Autres", value: 19, color: "#f59e0b" }
];

let currentAngle = 0;
segments.forEach(s => {
  const startAngle = currentAngle;
  const endAngle = currentAngle + (s.value * 3.6);
  console.log(`${s.label}: ${describeArc(center.x, center.y, radius, startAngle, endAngle)}`);
  currentAngle = endAngle;
});
