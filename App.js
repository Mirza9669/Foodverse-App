import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  Switch,
  Picker,
  Button,
} from 'react-native';

const Stack = createStackNavigator();

function Receipt({ route, navigation }) {
  const { quantity } = route.params;
  const { spicy } = route.params;
  const addOn = route.params.addOn;
  let s = 'NO';
  let add = '';

  if (spicy) {
    s = 'YES';
  }
  if (addOn == 'meat') {
    add = 'Extra Meat';
  } else if (addOn == 'cheese') {
    add = 'Extra Cheese';
  } else if (addOn == 'sauce') {
    add = 'Extra Sauce';
  } else {
    add = 'none';
  }
  let total = 350 * quantity;
  return (
    <View>
      <Text style={styles.orderHeading}>YOUR ORDER</Text>
      <Text>Order Unit Price Total</Text>
      <Text>
        {quantity}X Dishes 350 {total}{' '}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
      </View>
      <Text>
        {'\n'}Spice: {s}
      </Text>
      <Text>Add On: {add}</Text>
    </View>
  );
}

function Order({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [quantity, setQuantity] = useState(null);
  const [addOn, setAddOn] = useState('');
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <View>
      <Text style={styles.order}>PLACE YOUR ORDER</Text>
      <Text>Quantity</Text>
      <TextInput
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
        style={styles.input}
      />
      <Text>Spicy</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={styles.toggle}
      />
      <Text>Extras</Text>
      <Picker onValueChange={setAddOn} style={styles.input}>
        <Picker.Item label="Extra Cheese" value="cheese" />
        <Picker.Item label="Extra Meat" value="meat" />
        <Picker.Item label="Extra Sauce" value="sauce" />
      </Picker>
      <Button
        styles={styles.button}
        onPress={() =>
          navigation.navigate('Receipt', {
            quantity: quantity,
            spicy: isEnabled,
            addOn: addOn,
          })
        }
        title="Place Order">
        Place Order
      </Button>
    </View>
  );
}

const ListItem = ({ item, navigation }) => {
  return (
    <View style={styles.item}>
      <Image
        source={{
          uri: item.uri,
        }}
        style={styles.itemPhoto}
        resizeMode="cover"
      />
      <Text style={styles.itemText}>{item.text}</Text>
    </View>
  );
};

function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <SectionList
          contentContainerStyle={{ paddingHorizontal: 10 }}
          stickySectionHeadersEnabled={false}
          sections={SECTIONS}
          renderSectionHeader={({ section }) => (
            <>
              <Text style={styles.sectionHeader}>{section.title}</Text>
              <FlatList
                horizontal
                data={section.data}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Order', { dishname: item.text });
                      }}>
                      <ListItem item={item} />
                    </TouchableOpacity>
                  );
                }}
                showsHorizontalScrollIndicator={false}
              />
            </>
          )}
          renderItem={({ item, section }) => {
            if (section.horizontal) {
              return null;
            }
            return <ListItem item={item} />;
          }}
        />
      </SafeAreaView>
    </View>
  );
}
export default function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Foodversse"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Order" component={Order} />
        <Stack.Screen name="Receipt" component={Receipt} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const SECTIONS = [
  {
    title: 'Papa John',
    horizontal: true,
    data: [
      {
        key: '1',
        text: 'Pizza',
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0pNzPI6OCrR6M6e3GfL4ebF_1Kgta1wO97Q&usqp=CAU',
      },
      {
        key: '2',
        text: 'Fajita Pizza',
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6vcdd9tHXUAddPH9DRgGnIcY3Cjz39SN3MQ&usqp=CAU',
      },

      {
        key: '3',
        text: "Papa John's Special",
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqd57JVqVITR1O5UInEbqFMHwQyJBtRzzsGw&usqp=CAU',
      },
    ],
  },
  {
    title: 'Subway',
    horizontal: true,
    data: [
      {
        key: '1',
        text: 'Sandwich 1',
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqLRA8D5_3qmaL3YDZxpXeQKP_h6NyhqF25Q&usqp=CAU',
      },
      {
        key: '2',
        text: 'Sandwich 2',
        uri: 'https://pk.top10place.com/img_files/384112931735175',
      },

      {
        key: '3',
        text: 'Sandwich 3',
        uri: 'https://image.freepik.com/free-photo/crunchy-club-sandwiches-top-view_23-2148433284.jpg',
      },
    ],
  },
  {
    title: 'Daily Deli',
    horizontal: true,
    data: [
      {
        key: '3',
        text: 'Burger 1',
        uri: 'https://media-cdn.tripadvisor.com/media/photo-p/1a/e2/91/75/10.jpg',
      },
      {
        key: '2',
        text: 'Burger 2',
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYfOLYs7Y2zx8qCdeGPDGNEvbYpFQPBLNNGg&usqp=CAU',
      },
      {
        key: '3',
        text: 'Burger 3',
        uri: 'https://media-cdn.tripadvisor.com/media/photo-s/14/ac/66/b7/sunrise-burger.jpg',
      },
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  sectionHeader: {
    fontWeight: '800',
    fontSize: 18,
    color: '#f4f4f4',
    marginTop: 20,
    marginBottom: 5,
  },
  item: {
    margin: 10,
  },
  itemPhoto: {
    width: 200,
    height: 200,
  },
  itemText: {
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 5,
  },
  order: {
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  toggle: {
    margin: 12,
  },
  button: {
    height: 40,
    marginTop: 30,
    borderWidth: 1,
    padding: 200,
  },
  orderHeading: {
    textAlign: 'center',
    fontWeight: 50,
  },
});
