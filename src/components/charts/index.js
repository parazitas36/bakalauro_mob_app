import React from 'react';
import {Card} from 'react-native-paper';
import {scale} from 'react-native-size-matters';
import {FlatList} from 'react-native';
import WeeklyProgress from '../weeklyProgress';
import DailyProgress from '../dailyProgress';
import Animated from 'react-native-reanimated';

const Charts = ({weeks, theme}) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const Average = arr => {
    if (arr === undefined || arr === null || arr.length === 0) {
      return null;
    }
    return arr.reduce((sum, val) => sum + Number(val), 0) / arr.length;
  };

  const Day = ({dayData}) => {
    const sets = JSON.parse(dayData.sets);
    const loggedSets = JSON.parse(dayData.loggedSets);

    return {
      day: String(dayData.day).substring(0, 3),
      sets: {
        weightAvg: Average(sets?.map(x => x.Weights)),
        repsAvg: Average(sets?.map(x => x.Repetitions)),
      },
      loggedSets: {
        weightAvg: Average(loggedSets?.map(x => x.Weights)),
        repsAvg: Average(loggedSets?.map(x => x.Repetitions)),
      },
      hide: false,
    };
  };

  const Week = ({weekData, weekProgress}) => {
    const daysData = weekData.days.map(data => {
      const dayData = Day({dayData: data});
      return dayData;
    });

    const fullWeekData = days.map(x => {
      const found = daysData
        .filter(y => {
          if (y.day === x) {
            return y;
          }
        })
        .at(0);

      if (found === undefined || found === null) {
        return {
          day: x,
          sets: {
            weightAvg: null,
            repsAvg: null,
          },
          loggedSets: {
            weightAvg: null,
            repsAvg: null,
          },
          hide: true,
        };
      }
      return found;
    });

    weekProgress.push({
      week: weekData.week,
      weightAvg: Average(
        fullWeekData
          .filter(x => x.loggedSets.weightAvg !== null)
          .map(x => x.loggedSets.weightAvg),
      ),
      expectedWeightAvg: Average(
        fullWeekData
          .filter(x => x.sets.weightAvg !== null)
          .map(x => x.sets.weightAvg),
      ),
      repsAvg: Average(
        fullWeekData
          .filter(x => x.loggedSets.repsAvg !== null)
          .map(x => x.loggedSets.repsAvg),
      ),
      expectedRepsAvg: Average(
        fullWeekData
          .filter(x => x.sets.repsAvg !== null)
          .map(x => x.sets.repsAvg),
      ),
    });

    return fullWeekData;
  };

  const weekProgress = [];
  const weeksData = [];

  weeks.forEach(x => {
    const data = Week({weekData: x, weekProgress: weekProgress});
    weeksData.push({week: x.week, data: data});
  });

  return (
    <Animated.View style={{flex: 1, backgroundColor: theme.colors.background}}>
        <Card
        containerStyle={{
            width: scale(300),
            alignItems: 'center',
            borderWidth: 0,
            padding: 0,
        }}>
        <FlatList
            data={weeksData}
            renderItem={({item}) => {
            return <DailyProgress data={item} theme={theme} />;
            }}
        />
        {weekProgress.length > 1 && (
            <WeeklyProgress weekProgress={weekProgress} theme={theme} />
        )}
        </Card>
    </Animated.View>
  );
};

export default React.memo(Charts);
