import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Animated, {
  BounceInLeft,
  BounceOutRight,
  SequencedTransition,
} from 'react-native-reanimated';

interface CardProps {
  id: number;
  handleDelete: (idx: number) => void;
}

const TimerCard: React.FC<CardProps> = (props: CardProps) => {
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [inputTime, setInputTime] = useState({
    mins: '0',
    sec: '0',
  });

  const deletePressed = () => {
    props.handleDelete(props.id);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isActive && seconds >= 1) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else if (isActive && seconds <= 0) {
      Alert.alert(`Time's Up`);
      clearInterval(interval);
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    if (!isActive) {
      setSeconds(Number(inputTime.mins) * 60 + Number(inputTime.sec));
    }
    setIsActive(prevState => !prevState);
  };

  const handleReset = () => {
    setSeconds(0);
    setIsActive(false);
  };

  return (
    <Animated.View
      entering={BounceInLeft}
      exiting={BounceOutRight}
      layout={SequencedTransition}
      style={styles.card}>
      {!seconds ? (
        <View style={styles.inputTime}>
          <TextInput
            style={styles.inputTimeContainer}
            onChangeText={t => setInputTime(p => ({...p, mins: t}))}
            inputMode="numeric"
            value={String(inputTime.mins)}
          />
          <Text style={styles.label}>Mins</Text>
          <TextInput
            style={styles.inputTimeContainer}
            onChangeText={t => setInputTime(p => ({...p, sec: t}))}
            inputMode="numeric"
            value={String(inputTime.sec)}
            maxLength={2}
          />
          <Text style={styles.label}>Sec</Text>
        </View>
      ) : (
        <Text style={styles.timer}>{formatTime(seconds)}</Text>
      )}
      <View style={styles.buttonContainer}>
        <Button title={isActive ? 'STOP' : 'START'} onPress={handleStartStop} />
        <Button title="RESET" onPress={handleReset} />
        <Button title="DELETE" onPress={deletePressed} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 2,
    alignItems: 'center',
    margin: 10,
  },
  label: {
    fontSize: 20,
  },
  inputTimeContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 18,
    borderRadius: 6,
    paddingHorizontal: 14,
    color: '#000',
  },
  inputTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  timer: {
    fontSize: 24,
    color: '#333',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
});

export default TimerCard;
