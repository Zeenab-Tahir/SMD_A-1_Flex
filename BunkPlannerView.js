// BunkPlannerView.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function BunkPlannerView() {
  const [totalClasses, setTotalClasses] = useState('');
  const [attendedClasses, setAttendedClasses] = useState('');
  const [targetPercentage, setTargetPercentage] = useState('80');
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCalculate = () => {
    setErrorMessage('');
    setResult(null);

    const total = parseInt(totalClasses, 10);
    const attended = parseInt(attendedClasses, 10);
    const target = parseInt(targetPercentage, 10);

    if (isNaN(total) || isNaN(attended)) {
      setErrorMessage('Enter valid numbers in both lecture fields.');
      return;
    }
    if (total <= 0) {
      setErrorMessage('Total conducted lectures must be greater than 0.');
      return;
    }
    if (attended > total) {
      setErrorMessage('Attended cannot exceed total conducted lectures.');
      return;
    }
    if (target <= 0 || target > 100) {
      setErrorMessage('Target percentage must be between 1 and 100.');
      return;
    }

    const currentPercent = Math.round((attended / total) * 100);
    const targetFraction = target / 100;

    let message = '';
    let statusType = 'safe';

    if (currentPercent >= target) {
      const allowedBunks = Math.floor((attended - targetFraction * total) / targetFraction);
      statusType = 'safe';
      message =
        allowedBunks > 0
          ? `You have a safe margin of ${allowedBunks} lecture(s) before dropping below ${target}%.`
          : `You are exactly at ${target}%. Missing your next lecture will put you at risk!`;
    } else {
      const neededLectures = Math.ceil(
        (targetFraction * total - attended) / (1 - targetFraction)
      );
      statusType = 'warning';
      message = `You must attend the next ${neededLectures} lecture(s) consecutively to recover to ${target}%.`;
    }

    setResult({ currentPercent, message, statusType });
  };

  const handleReset = () => {
    setTotalClasses('');
    setAttendedClasses('');
    setTargetPercentage('80');
    setResult(null);
    setErrorMessage('');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Attendance Simulator</Text>
        <Text style={styles.cardSubtitle}>
          Simulate lecture scenarios to maintain safe threshold compliance.
        </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Conducted Lectures</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 24"
            placeholderTextColor="#64748B"
            keyboardType="numeric"
            value={totalClasses}
            onChangeText={setTotalClasses}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Attended Lectures</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 20"
            placeholderTextColor="#64748B"
            keyboardType="numeric"
            value={attendedClasses}
            onChangeText={setAttendedClasses}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Target Threshold (%)</Text>
          <TextInput
            style={styles.input}
            placeholder="80"
            placeholderTextColor="#64748B"
            keyboardType="numeric"
            value={targetPercentage}
            onChangeText={setTargetPercentage}
          />
        </View>

        {errorMessage !== '' && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>⚠️ {errorMessage}</Text>
          </View>
        )}

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.calcButton} onPress={handleCalculate}>
            <Text style={styles.calcButtonText}>Simulate</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>

      {result && (
        <View
          style={[
            styles.resultCard,
            result.statusType === 'safe' ? styles.resultSafe : styles.resultWarning,
          ]}
        >
          <View style={styles.resultHeader}>
            <Text style={styles.resultLabel}>Calculated Standing</Text>
            <Text
              style={[
                styles.resultPercent,
                result.statusType === 'safe' ? styles.textSafe : styles.textWarning,
              ]}
            >
              {result.currentPercent}%
            </Text>
          </View>
          <Text style={styles.resultMessage}>{result.message}</Text>
        </View>
      )}
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
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.12)',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#CBD5E1',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#130F2A',
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.2)',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#F8FAFC',
  },
  errorBox: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  errorText: {
    color: '#FCA5A5',
    fontSize: 12,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 6,
  },
  calcButton: {
    flex: 2,
    backgroundColor: '#7C3AED',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 8,
  },
  calcButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#1E1B4B',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.15)',
  },
  resetButtonText: {
    color: '#CBD5E1',
    fontSize: 13,
    fontWeight: '600',
  },
  resultCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginBottom: 24,
  },
  resultSafe: {
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  resultWarning: {
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  resultLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#CBD5E1',
  },
  resultPercent: {
    fontSize: 22,
    fontWeight: '800',
  },
  resultMessage: {
    fontSize: 13,
    color: '#E2E8F0',
    lineHeight: 18,
  },
  textSafe: {
    color: '#34D399',
  },
  textWarning: {
    color: '#F87171',
  },
});