import { Legend, LegendItem } from '@app/components/common/charts/Legend/Legend';
import { PieChart } from '@app/components/common/charts/PieChart';
import { EChartsOption } from 'echarts-for-react';
import { useCallback, useState } from 'react';

interface PieChartCustomLegend {
  name: string;
  // eslint-disable-next-line
  chartData: any[];
  // eslint-disable-next-line
  legendData: LegendItem[];
  height?: string;
  width?: string;
  option?: EChartsOption;
}

export const PieChartCustomLegend: React.FC<PieChartCustomLegend> = ({
  chartData,
  name,
  legendData,
  height,
  width,
  ...rest
}) => {
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  const onMouseOver = useCallback(
    ({ dataIndex }: { dataIndex: number | null }) => setActiveItemIndex(dataIndex),
    [setActiveItemIndex],
  );
  const onMouseOut = useCallback(() => setActiveItemIndex(null), [setActiveItemIndex]);

  const onEvents = {
    mouseover: onMouseOver,
    mouseout: onMouseOut,
  };

  return (
    <>
      <PieChart
        data={chartData}
        name={name}
        showLegend={false}
        height={height}
        width={width}
        onEvents={onEvents}
        {...rest}
      />
      <Legend legendItems={legendData} activeItemIndex={activeItemIndex} />
    </>
  );
};
