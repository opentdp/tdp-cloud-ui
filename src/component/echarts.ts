/**
 * 图表组件
 * https://github.com/ecomfe/vue-echarts
 * https://echarts.apache.org/examples/zh/index.html
 */

import { App } from "vue"
import VChart from "vue-echarts"

import { use } from "echarts/core"
import {
    DataZoomComponent,
    GridComponent,
    LegendComponent,
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
} from "echarts/components"
import { BarChart, LineChart, GaugeChart, PieChart } from "echarts/charts"
import { LabelLayout } from "echarts/features"
import { CanvasRenderer } from "echarts/renderers"

use([
    // Component
    DataZoomComponent,
    GridComponent,
    LegendComponent,
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    // Chart
    BarChart,
    LineChart,
    GaugeChart,
    PieChart,
    // Feature
    LabelLayout,
    // Renderer
    CanvasRenderer,
])

// export default

export default (app: App) => {
    app.component("VChart", VChart)
}
