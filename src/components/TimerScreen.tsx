import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import TimerCard from './TimerCard';
import {ScrollView} from 'react-native-gesture-handler';

const TimerScreen = () => {
  const [timers, setTimers] = useState<number[]>([]);

  const handleDelete = (idx: number): void => {
    setTimers(prevItems => prevItems.filter(i => i !== idx));
  };

  const addTimer = () => {
    if (timers.length === 5) {
      Alert.alert('Invalid Operation', 'Maximum Limit Reached');
      return;
    }
    if (timers.length) setTimers(p => [...p, p[p.length - 1] + 1]);
    else setTimers([0]);
  };
  return (
    <SafeAreaView style={{}}>
      <ScrollView
        style={{
          backgroundColor: '#eee',
          height: Dimensions.get('window').height,
        }}>
        <View style={{margin: 16}}>
          <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                padding: 8,
                paddingHorizontal: 12,
                borderRadius: 8,
                backgroundColor: '#6a1e55',
              }}
              onPress={addTimer}>
              <Icon name="add" size={28} color={'#fff'} />
              <Text style={{color: '#fff', fontWeight: '700'}}>Add Timer</Text>
            </TouchableOpacity>
          </View>

          {timers.map(timerNumber => (
            <TimerCard
              key={timerNumber}
              id={timerNumber}
              handleDelete={handleDelete}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TimerScreen;

const styles = StyleSheet.create({});
