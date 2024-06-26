import {Avatar, Button, Card, Text} from 'react-native-paper';
import React from 'react';
import {Dimensions, Pressable, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import coloPalette from '../assets/Theme/coloPalette';


interface Props {
  item:any;
  type?:boolean

}

export default function VideoItem({item, type}:Props) {



  const {width,height }= Dimensions.get('screen')
  return (
    <View style={{padding:type ? 0 : 5, marginVertical:5}}>
      <Card style={{width:type ? width : width/2-10,backgroundColor:coloPalette.light.secondary}}>
        <Pressable  >      
          <Card.Cover source={{uri: item?.image}} />
        </Pressable>
        {/* <Card.Actions style={{backgroundColor:'transparent'}}> */}
          {!type ? (
            <Button mode="contained"  buttonColor="green">
              Save
            </Button>
          ) : (
            <Button mode="contained" style={{width: 150 , alignSelf:'center' }}  buttonColor="green">
              Delete
            </Button>
          )}
        {/* </Card.Actions> */}
      </Card>
    </View>
  );
}
