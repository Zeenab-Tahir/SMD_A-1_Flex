import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { initialCourses } from './data';
import DashboardView from './DashboardView';
import AttendanceView from './AttendanceView';
import BunkPlannerView from './BunkPlannerView';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [courses, setCourses] = useState(initialCourses);

  // Dynamic state update function
  const handleMarkAttendance = (id) => {
    setCourses((prevCourses) =>
      prevCourses.map((c) => {
        if (c.id === id && c.attended < c.total) {
          return { ...c, attended: c.attended + 1 };
        }
        return c;
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F0C20" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTag}>
          <Text style={styles.headerTagText}>PORTAL 2.0</Text>
        </View>
        <Text style={styles.headerTitle}>FLEX Student Portal</Text>
      </View>

      {/* Tab Switcher */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'dashboard' && styles.activeTabButton]}
          onPress={() => setActiveTab('dashboard')}
        >
          <Text style={[styles.tabText, activeTab === 'dashboard' && styles.activeTabText]}>
            Dashboard
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'courses' && styles.activeTabButton]}
          onPress={() => setActiveTab('courses')}
        >
          <Text style={[styles.tabText, activeTab === 'courses' && styles.activeTabText]}>
            Attendance
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'planner' && styles.activeTabButton]}
          onPress={() => setActiveTab('planner')}
        >
          <Text style={[styles.tabText, activeTab === 'planner' && styles.activeTabText]}>
            Bunk Planner
          </Text>
        </TouchableOpacity>
      </View>

      {/* Dynamic Views */}
      <View style={styles.contentContainer}>
        {activeTab === 'dashboard' && <DashboardView courses={courses} />}
        {activeTab === 'courses' && (
          <AttendanceView
            courses={courses}
            onMarkAttendance={handleMarkAttendance}
          />
        )}
        {activeTab === 'planner' && <BunkPlannerView />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0C20',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
    backgroundColor: '#0F0C20',
  },
  headerTag: {
    backgroundColor: 'rgba(167, 139, 250, 0.15)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 6,
  },
  headerTagText: {
    color: '#C4B5FD',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#F8FAFC',
    letterSpacing: -0.5,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#16122E',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.15)',
    marginBottom: 10,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: '#7C3AED',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 6,
  },
});