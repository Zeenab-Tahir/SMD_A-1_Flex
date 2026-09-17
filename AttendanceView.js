import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

export default function AttendanceView({ courses, onMarkAttendance }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  const filteredCourses = courses.filter((course) => {
    const percentage = (course.attended / course.total) * 100;
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterType === 'RISK') return percentage < 80;
    if (filterType === 'SAFE') return percentage >= 80;
    return true;
  });

  const renderCourseCard = ({ item }) => {
    const percentage = Math.round((item.attended / item.total) * 100);
    const isAtRisk = percentage < 80;

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.codeContainer}>
            <Text style={styles.courseCode}>{item.code}</Text>
          </View>
          <View
            style={[
              styles.badge,
              isAtRisk ? styles.badgeRisk : styles.badgeSafe,
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                isAtRisk ? styles.textRisk : styles.textSafe,
              ]}
            >
              {isAtRisk ? 'At Risk (<80%)' : ' Safe '}
            </Text>
          </View>
        </View>

        <Text style={styles.courseName}>{item.name}</Text>

        <View style={styles.statsRow}>
          <View>
            <Text style={styles.statLabel}>Attended Lectures</Text>
            <Text style={styles.statValue}>
              {item.attended} <Text style={styles.statTotal}>/ {item.total}</Text>
            </Text>
          </View>
          <View style={styles.percentageBox}>
            <Text
              style={[
                styles.percentageText,
                isAtRisk ? styles.textRisk : styles.textSafe,
              ]}
            >
              {percentage}%
            </Text>
          </View>
        </View>

        {/* Dynamic State Modifier Button */}
        <TouchableOpacity
          style={styles.attendBtn}
          onPress={() => onMarkAttendance && onMarkAttendance(item.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.attendBtnText}>+ Mark Present</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search courses..."
        placeholderTextColor="#64748B"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Filter Row */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.filterChip, filterType === 'ALL' && styles.activeFilterChip]}
          onPress={() => setFilterType('ALL')}
        >
          <Text style={[styles.filterText, filterType === 'ALL' && styles.activeFilterText]}>
            All ({courses.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, filterType === 'RISK' && styles.activeFilterChip]}
          onPress={() => setFilterType('RISK')}
        >
          <Text style={[styles.filterText, filterType === 'RISK' && styles.activeFilterText]}>
            At Risk (&lt;80%)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, filterType === 'SAFE' && styles.activeFilterChip]}
          onPress={() => setFilterType('SAFE')}
        >
          <Text style={[styles.filterText, filterType === 'SAFE' && styles.activeFilterText]}>
            Safe (≥80%)
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item.id}
        renderItem={renderCourseCard}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>No Courses Found</Text>
            <Text style={styles.emptySubtitle}>Adjust your search query or selected filter</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    backgroundColor: '#16122E',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 14,
    color: '#F8FAFC',
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.15)',
    marginBottom: 12,
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#1E1B4B',
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.1)',
  },
  activeFilterChip: {
    backgroundColor: '#7C3AED',
    borderColor: '#8B5CF6',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
  },
  activeFilterText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#181434',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.12)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  codeContainer: {
    backgroundColor: 'rgba(167, 139, 250, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  courseCode: {
    fontSize: 12,
    fontWeight: '700',
    color: '#DDD6FE',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeRisk: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
  },
  badgeSafe: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  textRisk: {
    color: '#F87171',
  },
  textSafe: {
    color: '#34D399',
  },
  courseName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#F1F5F9',
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(167, 139, 250, 0.08)',
    paddingTop: 10,
  },
  statLabel: {
    fontSize: 12,
    color: '#94A3B8',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F8FAFC',
    marginTop: 2,
  },
  statTotal: {
    color: '#64748B',
    fontWeight: '500',
  },
  percentageBox: {
    alignItems: 'flex-end',
  },
  percentageText: {
    fontSize: 18,
    fontWeight: '800',
  },
  attendBtn: {
    marginTop: 12,
    backgroundColor: 'rgba(124, 58, 237, 0.15)',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.3)',
  },
  attendBtnText: {
    color: '#C4B5FD',
    fontSize: 12,
    fontWeight: '700',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  emptyIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#CBD5E1',
  },
  emptySubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
});