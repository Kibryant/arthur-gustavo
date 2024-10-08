import {
  BarChart as BarChartRecharts,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts'

const data = [
  { name: 'Janeiro', visualizacoes: 4000, posts: 2400 },
  { name: 'Fevereiro', visualizacoes: 3000, posts: 1398 },
  { name: 'Março', visualizacoes: 2000, posts: 9800 },
  { name: 'Abril', visualizacoes: 2780, posts: 3908 },
  { name: 'Maio', visualizacoes: 1890, posts: 4800 },
  { name: 'Junho', visualizacoes: 2390, posts: 3800 },
  { name: 'Julho', visualizacoes: 3490, posts: 4300 },
]

export default function BarChart() {
  return (
    <BarChartRecharts
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="visualizacoes" fill="#2563eb" />
      <Bar dataKey="posts" fill="#2aa79b" />
    </BarChartRecharts>
  )
}
