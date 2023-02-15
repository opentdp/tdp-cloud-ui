export const GaugeMonitor = {
    series: {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        axisLabel: {
            show: false
        },
        axisTick: {
            show: false
        },
        splitLine: {
            show: false
        },
        pointer: {
            show: false
        },
        progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: {
                color: "#529b2e"
            }
        },
        detail: {
            fontSize: 14,
            color: 'inherit',
            formatter: '{value}%'
        },
        data: [
            {
                name: '内存',
                value: 20,
                title: {
                    offsetCenter: ['0%', '15%']
                },
                detail: {
                    valueAnimation: true,
                    offsetCenter: ['0%', '-10%']
                }
            }
        ]
    }
}