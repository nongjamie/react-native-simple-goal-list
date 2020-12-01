import React, { useState } from 'react';
import { StyleSheet, View, Button, FlatList } from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {

  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = (goalTitle) => {
    if(goalTitle.length === 0) {
      return;
    }
    setCourseGoals((currentGoals) => {
      return [...currentGoals, { id: Math.random().toString(), value: goalTitle }];
    });
    setIsAddMode(false);
  }

  const removeGoalHandler = (goalId) => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => {
        return goal.id !== goalId;
      });
    });
  }

  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false);
  };

  return (
    <View style={styles.screen}>
      <Button title='Add New Goal' onPress={() => setIsAddMode(true)}></Button>
      <GoalInput 
        visible={isAddMode}
        onAddGoal={addGoalHandler}
        onCancel={cancelGoalAdditionHandler}
      />
      <FlatList 
        keyExtractor={(item, index) => item.id}
        data={courseGoals} 
        renderItem={itemData => (
        <GoalItem 
          id={itemData.item.id}
          title={itemData.item.value}
          onDelete={removeGoalHandler}
        />
        )}
      ></FlatList>
    </View>
  );

}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
});
