import { BarChart } from '@mui/x-charts/BarChart';

function Analytics() {
    return (
        <div>  <BarChart
            xAxis={[
                {
                    id: 'barCategories',
                    data: ['bar A', 'bar B', 'bar C'],
                },
            ]}
            series={[
                {
                    data: [2, 5, 3],
                },
            ]}
            height={300}
        /></div>
    )
}

export default Analytics