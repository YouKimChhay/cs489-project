import {Cell, Legend, Pie, PieChart, Tooltip} from "recharts";
import {Card} from "react-bootstrap";


export default function DisplayPieChart({title, data}) {

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#8884d8',
        '#FF8042', '#FF66CC', '#00727d', '#ffaaa6',
        '#84D9FF', '#4BFF5B', '#FF3E3E', '#E7F122'];

    const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent}) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
        const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

        return (
            <text x={x} y={y + 20} fill="white" textAnchor="middle">
                {`${Math.round(percent * 100)}%`}
            </text>
        );
    };

    return (
        <div>
            <Card bg={"light"} text={'black'} className="mb-2">
                <Card.Header>{title}</Card.Header>
                <Card.Body>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={data}
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                            ))}
                        </Pie>
                        <Tooltip/>
                        <Legend verticalAlign="top"/>
                    </PieChart>
                </Card.Body>
            </Card>
        </div>
    );
}