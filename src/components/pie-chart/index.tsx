import { PieChart as PierChartRecharts, Pie, Cell, Tooltip } from 'recharts'

const data = [
  { name: 'Postagens Publicadas', value: 400 },
  { name: 'Postagens em Rascunho', value: 300 },
  { name: 'Visualizações', value: 300 },
]

const COLORS = ['#2563eb', '#2aa79b', '#e9c54f']

export function PieChart() {
  return (
    <PierChartRecharts width={300} height={300}>
      <Pie
        data={data}
        cx={150}
        cy={150}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index + 1}`}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>
      <Tooltip />
    </PierChartRecharts>
  )
}
