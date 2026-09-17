// DashboardView.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { ProgressChart, BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function DashboardView({ courses }) {
  const attendanceProgressData = {
    labels: courses.map((c) => c.code),
    data: courses.map((c) => Math.min(c.attended / c.total, 1)),
  };

  const marksBarData = {
    labels: courses.map((c) => c.code),
    datasets: [
      {
        data: courses.map((c) => c.marks),
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#181434',
    backgroundGradientFrom: '#181434',
    backgroundGradientTo: '#181434',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(167, 139, 250, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(148, 163, 184, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForBackgroundLines: {
      stroke: 'rgba(167, 139, 250, 0.1)',
    },
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Chart 1 */}
      <View style={styles.card}>
        <Text style={styles.chartTitle}>Attendance Progress Rings</Text>
        <Text style={styles.chartSubtitle}>
          Real-time threshold status. Outer rings match course registration order.
        </Text>
        <ProgressChart
          data={attendanceProgressData}
          width={screenWidth - 64}
          height={210}
          strokeWidth={10}
          radius={28}
          chartConfig={{
            ...chartConfig,
            color: (opacity = 1) => `rgba(196, 181, 253, ${opacity})`,
          }}
          hideLegend={false}
          style={styles.chartStyle}
        />
      </View>

      {/* Chart 2 */}
      <View style={styles.card}>
        <Text style={styles.chartTitle}>Internal Marks Overview</Text>
        <Text style={styles.chartSubtitle}>
          Aggregated evaluation scores out of 100.
        </Text>
        <BarChart
          data={marksBarData}
          width={screenWidth - 64}
          height={220}
          yAxisSuffix=""
          yAxisLabel=""
          chartConfig={chartConfig}
          verticalLabelRotation={0}
          showValuesOnTopOfBars={true}
          fromZero={true}
          style={styles.chartStyle}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: '#181434',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.12)',
    marginBottom: 16,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#F8FAFC',
    alignSelf: 'flex-start',
  },
  chartSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  chartStyle: {
    marginVertical: 4,
    borderRadius: 16,
  },
});